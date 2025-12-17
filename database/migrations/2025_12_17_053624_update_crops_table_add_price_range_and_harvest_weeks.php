<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, add new columns as nullable
        Schema::table('crops', function (Blueprint $table) {
            $table->decimal('low_price', 10, 2)->nullable()->after('name');
            $table->decimal('high_price', 10, 2)->nullable()->after('low_price');
            $table->unsignedInteger('harvest_weeks')->nullable()->after('high_price')->comment('Average weeks until harvest');
        });

        // Update existing records: set low_price = high_price = old price, harvest_weeks = 10 (default)
        DB::statement('UPDATE crops SET low_price = price, high_price = price, harvest_weeks = 10 WHERE low_price IS NULL');

        // Drop the old price column
        Schema::table('crops', function (Blueprint $table) {
            $table->dropColumn('price');
        });

        // Make the new columns NOT NULL
        Schema::table('crops', function (Blueprint $table) {
            $table->decimal('low_price', 10, 2)->nullable(false)->change();
            $table->decimal('high_price', 10, 2)->nullable(false)->change();
            $table->unsignedInteger('harvest_weeks')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crops', function (Blueprint $table) {
            // Remove new columns
            $table->dropColumn(['low_price', 'high_price', 'harvest_weeks']);
            
            // Restore old price column
            $table->decimal('price', 10, 2)->after('name');
        });
    }
};
