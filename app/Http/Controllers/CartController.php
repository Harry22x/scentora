<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Perfume;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function add(Request $request, $id)
    {
        // 1. Get the current cart from session (or make it  empty array if it doesn't exist)
        $cart = $request->session()->get('cart', []);

        // 2. If the perfume is already in the cart, increment quantity
        if (isset($cart[$id])) {
            $cart[$id]++;
        } else {
            // 3. Otherwise, add it with a quantity of 1
            $cart[$id] = 1;
        }

        // 4. Put the updated cart back into the session
        $request->session()->put('cart', $cart);

        return redirect()->back()->with('message', 'Added to cart!');
    }

    public function show()
    {
        $cart = session()->get('cart', []);
        
        // Transform the session IDs into actual Perfume objects
        $cartItems = [];
        foreach ($cart as $id => $quantity) {
            $perfume = Perfume::find($id);
            if ($perfume) {
                $cartItems[] = [
                    'id' => $perfume->id,
                    'name' => $perfume->name,
                    'price' => $perfume->price,
                    'imageUrl' => $perfume->imageUrl,
                    'quantity' => $quantity
                ];
            }
        }

        return Inertia::render('Cart/Show', ['items' => $cartItems]);
    }

    public function update(Request $request, $id, $action)
{
    $cart = $request->session()->get('cart', []);

    if (isset($cart[$id])) {
        if ($action === 'increase') {
            $cart[$id]++;
        } elseif ($action === 'decrease' && $cart[$id] > 1) {
            $cart[$id]--;
        } elseif ($action === 'remove') {
            unset($cart[$id]);
        }
    }

    $request->session()->put('cart', $cart);
    return redirect()->back();
}

public function checkout(Request $request)
{
    $cart = $request->session()->get('cart', []);
    
    if (empty($cart)) return redirect()->back();

    // Use a DB Transaction so if one part fails, NOTHING is saved
    DB::transaction(function () use ($request, $cart) {
        // 1. Create the Main Order
        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => 0, // it will update this in a second
            'status' => 'pending',
        ]);

        $total = 0;

        // 2. Loop through cart and create OrderItems
        foreach ($cart as $id => $quantity) {
            $perfume = \App\Models\Perfume::find($id);
            
            if ($perfume && $perfume->stock >= $quantity) {
                $subtotal = $perfume->price * $quantity;
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'perfume_id' => $perfume->id,
                    'quantity' => $quantity,
                    'price' => $perfume->price, // Snapshot of current price
                ]);

                $perfume->decrement('stock', $quantity);
            }
        }

        // 3. Update the final total on the order
        $order->update(['total_amount' => $total]);
    });

    $request->session()->forget('cart');
    return redirect()->route('home')->with('message', 'Order placed successfully!');
}
}