<?php

namespace App\Http\Controllers;

use App\Models\Drill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DrillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        return Inertia::render('Dashboard/Drills/Index', [
            'drills' => Drill::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Drills/Create', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'=>'required|string',
            'small_description'=> 'required|string',
            'description'=> 'required|string',
            'duration'=> 'required|integer',
            'difficulty'=> 'required|string',
            'equipment'=> [
                'array',
                function ($attribute, $value, $fail) {
                    foreach ($value as $equipment) {
                        if (trim($equipment) === '') {
                            $fail('The Equipment cannot have empty fields');
                        }
                    }
                }
            ],
            'objectives'=> [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    foreach ($value as $objective) {
                        if (trim($objective) === '') {
                            $fail('The objective field is required');
                        }
                    }
                }
            ],
            'category_id'=> 'required|',
        ]);

        $request->user()->drills()->create($validated);

        return redirect(route('dashboard.drills'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Drill $drill): Response
    {
        return Inertia::render('Dashboard/Drills/Show', [
            'drill' => $drill,
            'id'=>$drill->id
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Drill $drill)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Drill $drill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Drill $drill)
    {
        //
    }
}
