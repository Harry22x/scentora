<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Perfume;
use Inertia\Inertia;

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
}