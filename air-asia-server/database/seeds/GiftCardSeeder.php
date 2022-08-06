<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class GiftCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = Faker::create();
        for ($x = 0; $x <= 20; $x++) {
            DB::table('gift_cards')->insert([
                'cardName' => $faker->company,
                'cardType' => 'gift-0',
                'cardImageUrl' => 'https://gawdamedia.com/wp-content/uploads/2019/07/generic-gift-card.jpeg',
                'cardValue' => $faker->numberBetween(10,50),
                'points' => $faker->numberBetween(100,500)
            ]);            
        } 
    }
}
