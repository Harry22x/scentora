<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        // Fetch orders for the authenticated user only
        // with('items.perfume') grabs the order items AND the linked perfume data
        $orders = Order::where('user_id', Auth::id())
            ->with('items.perfume') 
            ->latest()
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }
}