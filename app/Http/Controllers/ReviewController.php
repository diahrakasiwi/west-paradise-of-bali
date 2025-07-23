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
        $request->validate([
            'name' => 'required|string|max:255',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'type' => 'required|string',
            'destination_id' => 'required|integer',
        ]);

        Review::create([
            'name' => $request->name,
            'review' => $request->review,
            'rating' => $request->rating,
            'type' => $request->type,
            'destination_id' => $request->destination_id,
        ]);

        return redirect()->back()->with('success', 'Review berhasil dikirim!');
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

    public function getReviewsByDestination($id, $type)
    {
        $reviews = Review::where('destination_id', $id)
            ->where('type', $type) // bisa juga review_type tergantung nama kolommu
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'name' => $review->name ?? '-',
                    'review' => $review->review,
                    'rating' => $review->rating,
                    'created_at' => $review->created_at,
                    'relative_time' => $review->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('destination/Detail/Page', [
            'id' => $id,
            'model' => $type,
            'access' => 'public',
            'reviews' => $reviews,
        ]);
    }
}