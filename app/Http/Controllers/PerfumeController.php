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

    // Render the React page and pass the perfumes as a 'prop'
    return Inertia::render('Perfumes/Index', [
        'perfumes' => $perfumes
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
        // 1. Validate the incoming data
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'description' => 'nullable|string',
        'imageUrl' => 'required|image|mimes:jpg,jpeg,png|max:2048'


    ]);
    if ($request->hasFile('imageUrl')) {
        // This saves the file to storage/app/public/perfumes
        // and returns the path (e.g., perfumes/filename.jpg)
        $path = $request->file('imageUrl')->store('perfumes', 'public');
        $validated['imageUrl'] = $path;
    }

    // 2. Create the perfume in the database
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
        'imageUrl' => 'nullable|image|max:2048', // Nullable because they might not change the image
    ]);

  if ($request->hasFile('imageUrl')) {
        // Delete the old file from physical storage
        if ($perfume->imageUrl) {
            \Storage::disk('public')->delete($perfume->imageUrl);
        }

        // Store the new file and update the path in our validated data
        $path = $request->file('imageUrl')->store('perfumes', 'public');
        $validated['imageUrl'] = $path;
    } else {
        // IMPORTANT: If no new file, remove imageUrl from the validated array 
        // so Laravel doesn't try to overwrite the existing DB value with null.
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
