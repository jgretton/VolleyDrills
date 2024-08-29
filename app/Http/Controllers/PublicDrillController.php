<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Drill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicDrillController extends Controller
{
    public function index(Request $request):Response
    {
        $categories = Category::with(['drills' => function ($query) use ($request) {
            // Apply search filter if provided
            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }
            // Limit the number of drills per category if needed
            $query->limit(5); // Adjust this number as needed
        }])->get();


        return Inertia::render('Welcome', [
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }
}
