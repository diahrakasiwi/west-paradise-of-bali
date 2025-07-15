<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['reviewable.sector'])
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'name' => $review->name ?? '-',
                    'review' => $review->review,
                    'rating' => $review->rating,
                    'created_at' => $review->created_at,
                    'relative_time' => $review->created_at->diffForHumans(),
                    'destination_name' => optional($review->reviewable)->name ?? '-', // ← untuk kolom destinasi
                    'sector_name' => optional($review->reviewable?->sector)->name ?? '-', // ← untuk kolom sektor
                    'review_type' => $review->reviewable_type,
                ];
            });

        return Inertia::render('dashboard/reviews/Page', [
            'review' => $reviews,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->delete();

            return redirect()
                ->to('/dashboard/reviews')
                ->with('success', 'Data berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}