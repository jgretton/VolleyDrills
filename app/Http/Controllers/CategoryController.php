<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Drill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard/Categories/Index', [
            'categories' => Category::withCount('drills')->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {

        $validated = $request->validate([
             'name'=> 'required|string|unique:categories',
        ], [
            'name.unique' => 'This category already exists'
        ]);

        Category::create($validated);
        return redirect(route('dashboard.categories'));

    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        // dd($request);
        $validated = $request->validate([
            'name'=> 'required|string|unique:categories',
       ], [
           'name.unique' => 'This category already exists'
       ]);

        $category->update($validated);
       return redirect(route('dashboard.categories'))
       ->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
//Check to see if the category has drills
        if($category->drills()->count()) {
            return redirect(route('dashboard.categories'))->with('error', 'Cannot delete categories that have drills.');
        };

        $category->delete();

        return redirect(route('dashboard.categories'))->with('success', 'Category deleted successfully');
    }
}
