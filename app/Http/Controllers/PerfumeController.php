<?php

namespace App\Http\Controllers;

use App\Models\Perfume;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerfumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perfumes = Perfume::all();

   
    return Inertia::render('Perfumes/Index', [
        'perfumes' => $perfumes
    ]);
    }


public function dashboard()
{
    return Inertia::render('Dashboard', [
        'perfumes' => \App\Models\Perfume::all(),
        
        'orders' => \App\Models\Order::with(['user', 'items.perfume'])->latest()->get()
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Perfumes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'description' => 'nullable|string',
        'imageUrl' => 'required|image|mimes:jpg,jpeg,png|max:2048'


    ]);
    if ($request->hasFile('imageUrl')) {
       
        $path = $request->file('imageUrl')->store('perfumes', 'public');
        $validated['imageUrl'] = $path;
    }

    // 2. add the perfume to the database
    \App\Models\Perfume::create($validated);

    // 3. Redirect back to the dashboard with a success message
    return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Perfume $perfume)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Perfume $perfume)
    {
        return Inertia::render('Perfumes/Edit', [
        'perfume' => $perfume
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Perfume $perfume)
    {
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'category' => 'required|string',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'imageUrl' => 'nullable|image|max:2048', 
    ]);

  if ($request->hasFile('imageUrl')) {
      
        if ($perfume->imageUrl) {
            \Storage::disk('public')->delete($perfume->imageUrl);
        }

        $path = $request->file('imageUrl')->store('perfumes', 'public');
        $validated['imageUrl'] = $path;
    } else {

        unset($validated['imageUrl']);
    }

    $perfume->update($validated);

    return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perfume $perfume)
    {
        $perfume->delete();
    return redirect()->route('dashboard')->with('message', 'Perfume deleted successfully.');

    }
}
