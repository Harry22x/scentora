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
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    public function add(Request $request, $id)
    {
        $cart = $request->session()->get('cart', []);
        $perfume = Perfume::find($id);

        if (! $perfume) {
            return redirect()->back()->withErrors(['cart' => 'Perfume not found.']);
        }

        $currentQuantity = $cart[$id] ?? 0;
        if ($currentQuantity + 1 > $perfume->stock) {
            return redirect()->back()->withErrors(['cart' => "Only {$perfume->stock} units are available for {$perfume->name}."]);
        }

        if (isset($cart[$id])) {
            $cart[$id]++;
        } else {
            $cart[$id] = 1;
        }

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
                    'description' => $perfume->description,
                    'price' => $perfume->price,
                    'imageUrl' => $perfume->imageUrl,
                    'stock' => $perfume->stock,
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
                $perfume = Perfume::find($id);
                if (! $perfume) {
                    return redirect()->back()->withErrors(['cart' => 'Perfume not found.']);
                }

                if ($cart[$id] + 1 > $perfume->stock) {
                    return redirect()->back()->withErrors(['cart' => "Only {$perfume->stock} units are available for {$perfume->name}."]);
                }

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
        
        if (empty($cart)) {
            return redirect()->back();
        }

        $items = [];
        foreach ($cart as $id => $quantity) {
            $perfume = Perfume::find($id);
            if (! $perfume) {
                throw ValidationException::withMessages(['cart' => 'One of the cart items was not found.']);
            }

            if ($perfume->stock < $quantity) {
                throw ValidationException::withMessages(['cart' => "Only {$perfume->stock} units are available for {$perfume->name}. Please update your cart."]);
            }

            $items[] = compact('perfume', 'quantity');
        }

        DB::transaction(function () use ($request, $items) {
            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => 0,
                'status' => 'pending',
            ]);

            $total = 0;

            foreach ($items as $item) {
                $perfume = $item['perfume'];
                $quantity = $item['quantity'];

                $subtotal = $perfume->price * $quantity;
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'perfume_id' => $perfume->id,
                    'quantity' => $quantity,
                    'price' => $perfume->price,
                ]);

                $perfume->decrement('stock', $quantity);
            }

            $order->update(['total_amount' => $total]);
        });

        $request->session()->forget('cart');
        return redirect()->route('orders.index')->with('message', 'Order placed successfully!');
    }
}