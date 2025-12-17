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
        Schema::table('farmer_crop', function (Blueprint $table) {
            // Add planted_at timestamp (nullable first for existing records)
            $table->timestamp('planted_at')->nullable()->after('crop_id')->comment('When the crop was planted');
            
            // Add status field with enum values
            $table->enum('status', ['active', 'harvested', 'expired'])
                  ->default('active')
                  ->after('harvesting_date')
                  ->comment('Current status of the crop planting');
        });

        // Update existing records to set planted_at to their planting_date or now
        DB::statement('UPDATE farmer_crop SET planted_at = COALESCE(planting_date, CURRENT_TIMESTAMP) WHERE planted_at IS NULL');

        // Make planted_at NOT NULL after setting values
        Schema::table('farmer_crop', function (Blueprint $table) {
            $table->timestamp('planted_at')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('farmer_crop', function (Blueprint $table) {
            $table->dropColumn(['planted_at', 'status']);
        });
    }
};
