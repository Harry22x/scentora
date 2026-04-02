<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Perfume;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function add(Request $request, $id)
    {
        // 1. Get the current cart from session (or empty array if it doesn't exist)
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
    
    if (empty($cart)) {
        return redirect()->back()->with('error', 'Cart is empty');
    }

    $cartItems = [];
    $total = 0;

    foreach ($cart as $id => $quantity) {
        $perfume = \App\Models\Perfume::find($id);
        
        if ($perfume) {
          
            if ($perfume->stock < $quantity) {
                return redirect()->back()->with('error', "Sorry, only {$perfume->stock} units of {$perfume->name} left.");
            }
            
            $perfume->decrement('stock', $quantity); 
            // Laravel helper that does: $perfume->stock = $perfume->stock - $quantity;
            // --- NEW STOCK LOGIC END ---

            $subtotal = $perfume->price * $quantity;
            $total += $subtotal;
            $cartItems[] = [
                'name' => $perfume->name,
                'quantity' => $quantity,
                'price' => $perfume->price
            ];
        }
    }

    // Create the Transaction record
    \App\Models\Transaction::create([
        'user_id' => auth()->id(),
        'total_amount' => $total,
        'items_json' => json_encode($cartItems), 
        'status' => 'pending' 
    ]);

    $request->session()->forget('cart');

    return redirect()->route('home')->with('message', 'Purchase successful!');
}
}