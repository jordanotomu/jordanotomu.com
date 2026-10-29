// music lists shared by /random/music and the lab variants.

export const onRepeat = [
    {
        name: "Cherry Wine",
        artist: "Nas, Amy Winehouse",
        album: "Life Is Good · 2012",
        url: "https://open.spotify.com/track/4csyu5nwd3JPbQdrrubiNn",
        art: "https://i.scdn.co/image/ab67616d00001e023d97322947731343a40fc089",
    },
    {
        name: "The Moon and the Sky",
        artist: "Sade",
        album: "Soldier of Love · 2010",
        url: "https://open.spotify.com/track/2ZEwMwHaUECDWKkDh8rL0O",
        art: "https://i.scdn.co/image/ab67616d00001e0298da02db8bb9253c3367e41a",
    },
    {
        name: "Lovesong",
        artist: "Adele",
        album: "21 · 2011",
        url: "https://open.spotify.com/track/7nm6DlSzzJTH1rk2e6EgJz",
        art: "https://i.scdn.co/image/ab67616d00001e027e7e5dd9d1ab19fcded8a17f",
    },
    {
        name: "ROS",
        artist: "Mac Miller",
        album: "GO:OD AM · 2015",
        url: "https://open.spotify.com/track/388jD8ko9cvFM9cd9TYDrl",
        art: "https://i.scdn.co/image/ab67616d00001e02ee0f38410382a255e4fb15f4",
    },
    {
        name: "In This Darkness",
        artist: "Clara La San",
        album: "In This Darkness · 2023",
        url: "https://open.spotify.com/track/0bmVH05tjN9jVh3kB1TfpR",
        art: "https://i.scdn.co/image/ab67616d00001e02787a0dbfa43cdc88d0c484dc",
    },
];

// album wall — 24 covers ordered top-left → bottom-right by overall
// brightness / tone so the grid reads as a soft gradient instead of a
// random shuffle: light pastels → b&w → warm earth → vivid bursts → deep
// dark. art urls pulled from itunes / deezer; resized to 300px square.
export const albumWall = [
    // row 1 — lightest / pastel / airy
    { artist: "The Beatles", album: "Abbey Road", art: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/df/db/61/dfdb615d-47f8-06e9-9533-b96daccc029f/18UMGIM31076.rgb.jpg/300x300bb.jpg" },
    { artist: "TV Girl", album: "French Exit", art: "https://i.scdn.co/image/ab67616d00001e02e1bc1af856b42dd7fdba9f84" },
    { artist: "Frank Ocean", album: "Blonde", art: "https://cdn-images.dzcdn.net/images/cover/aa7e6de00b0810f5051aa60b489f58d8/300x300-000000-80-0-0.jpg" },
    { artist: "Adele", album: "21", art: "https://i.scdn.co/image/ab67616d00001e027e7e5dd9d1ab19fcded8a17f" },
    { artist: "Drake", album: "If You're Reading This It's Too Late", art: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/7d/bb/f77dbbb4-e8a2-855d-cc5c-79804a297599/00602547261908.rgb.jpg/300x300bb.jpg" },
    { artist: "The Beatles", album: "A Hard Day's Night", art: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/a2/7a/dba27a46-3685-508d-d32e-a0e73cc82251/00602567713296.rgb.jpg/300x300bb.jpg" },
    // row 2 — b&w / sepia / warm light
    { artist: "George Harrison", album: "Let It Roll", art: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/3e/bf/55/3ebf5520-d2f8-7915-1470-8c0c74f749dc/0602435008790.jpg/300x300bb.jpg" },
    { artist: "Michael Jackson", album: "Off the Wall", art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/0c/fe/a3/0cfea324-57c1-d530-5248-9bb591bbd7bf/074643574525.jpg/300x300bb.jpg" },
    { artist: "Sade", album: "Lovers Rock", art: "https://i.scdn.co/image/ab67616d00001e0220fc6951e4d293707de2434c" },
    { artist: "Faye Webster", album: "Atlanta Millionaires Club", art: "https://cdn-images.dzcdn.net/images/cover/98db0535916ea67e347848b1a4345489/300x300-000000-80-0-0.jpg" },
    { artist: "Mary J. Blige", album: "What's the 411?", art: "https://cdn-images.dzcdn.net/images/cover/f8a928b589473ce7f0d08b0cb572cd74/300x300-000000-80-0-0.jpg" },
    { artist: "Sade", album: "Soldier of Love", art: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e7/b0/58/e7b05801-a9f4-e469-12b2-cdaeb6ff6628/884977446371.jpg/300x300bb.jpg" },
    // row 3 — warm earth + vivid mid
    { artist: "The Beach Boys", album: "Pet Sounds", art: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/35/bb/c4/35bbc4eb-9387-97b0-b138-64b7a949ea43/13UABIM03512.rgb.jpg/300x300bb.jpg" },
    { artist: "Bob Marley & The Wailers", album: "Kaya", art: "https://i.scdn.co/image/ab67616d00001e02387799441ba867649dfbb702" },
    { artist: "The Smiths", album: "The Queen Is Dead", art: "https://i.scdn.co/image/ab67616d00001e026236778a208a15eb71079601" },
    { artist: "Dean Blunt", album: "ZUSHI", art: "https://cdn-images.dzcdn.net/images/cover/bcb830349913504515e20afc240cae83/300x300-000000-80-0-0.jpg" },
    { artist: "A$AP Rocky", album: "LIVE.LOVE.A$AP", art: "https://cdn-images.dzcdn.net/images/cover/53431264c289f50774a41dbf444ac6a6/300x300-000000-80-0-0.jpg" },
    { artist: "Baby Smoove", album: "Im Still Serious", art: "https://i.scdn.co/image/ab67616d00001e021d5d26f7c2163cd2d1dec13f" },
    // row 4 — darkest / dramatic / deep saturation
    { artist: "Deftones", album: "Around the Fur", art: "https://cdn-images.dzcdn.net/images/cover/b0edd62e4e62455aef58a3e60474e2bb/300x300-000000-80-0-0.jpg" },
    { artist: "The Smiths", album: "Meat Is Murder", art: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/74/1f/ff/741fff7e-e99e-757d-e600-e19d9df0d078/745099189563.jpg/300x300bb.jpg" },
    { artist: "Radiohead", album: "In Rainbows", art: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/300x300bb.jpg" },
    { artist: "Drake", album: "Take Care (Deluxe)", art: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d2/53/62/d2536245-b94c-b3fd-7168-9512f655f6d4/00602527899091.rgb.jpg/300x300bb.jpg" },
    { artist: "Daniel Caesar", album: "NEVER ENOUGH", art: "https://cdn-images.dzcdn.net/images/cover/0d571082af7c78114321031d7f84d331/300x300-000000-80-0-0.jpg" },
    { artist: "Amy Winehouse", album: "Lioness: Hidden Treasures", art: "https://i.scdn.co/image/ab67616d00001e024c896e873306c17847c254e9" },
];
