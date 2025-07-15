<?php

namespace App\Providers;

use App\Models\Accomodation;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Relations\Relation;
// use App\Models\TouristDestination;
use App\Models\Event;
use App\Models\TouristDestinationTranslation;
use App\Models\Transportation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Inertia::share([
            'locale' => fn() => app()->getLocale(),
        ]);

        Relation::morphMap([
            'destination' => TouristDestinationTranslation::class,
            'event' => Event::class,
            'transportation' => Transportation::class,
            'accomodation' => Accomodation::class,
            // tambahkan jenis lain kalau pakai
        ]);
    }
}
