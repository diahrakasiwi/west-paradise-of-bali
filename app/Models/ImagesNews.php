<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagesNews extends Model
{
    use HasFactory;
    protected $table = 'images_news';

    protected $fillable = [
        'id',
        'image_url',
        'news_id',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function news()
    {
        return $this->belongsTo(News::class);
    }
}
