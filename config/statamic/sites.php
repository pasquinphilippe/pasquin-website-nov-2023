<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Sites
    |--------------------------------------------------------------------------
    |
    | Each site should have root URL that is either relative or absolute. Sites
    | are typically used for localization (eg. English/French) but may also
    | be used for related content (eg. different franchise locations).
    |
    */

    'sites' => [
        'french' => [
            'name' => 'Français',
            'locale' => 'fr_CA',
            'url' => '/',
        ],
        'English CA' => [
            'name' => 'English CA',
            'locale' => 'en_CA',
            'url' => '/en/',
        ],
        'English US' => [
            'name' => 'English US',
            'locale' => 'en_US',
            'url' => '/en_us/',
        ],
    ],
];
