export interface Platform {
  id: string;
  name: string;
  shortName: string;
  color: string;
  brand: 'Nintendo' | 'Sony' | 'Sega' | 'Other';
  image: string;
}

export interface Rom {
  id: string;
  platformId: string;
  title: string;
  description: string;
  size: string;
  coverImage: string;
  bannerImage?: string;
  gridSize: '1x1' | '2x2';
  downloadLink?: string;
}

export interface Contributor {
  id: string;
  name: string;
  avatarUrl: string;
  description?: string;
}

export const contributors: Contributor[] = [
  {
    id: '1',
    name: 'Alice Developer',
    avatarUrl: 'https://placehold.co/100x100/3b82f6/ffffff?text=AD',
    description: 'Lead developer and architect of the new layout system.'
  },
  {
    id: '2',
    name: 'Bob Designer',
    avatarUrl: 'https://placehold.co/100x100/ef4444/ffffff?text=BD',
    description: 'Created the gorgeous new cover art placeholder system and mockups.'
  },
  {
    id: '3',
    name: 'Charlie Content',
    avatarUrl: 'https://placehold.co/100x100/10b981/ffffff?text=CC',
  },
  {
    id: '4',
    name: 'Diana Tester',
    avatarUrl: 'https://placehold.co/100x100/f59e0b/ffffff?text=DT',
    description: 'Ensured all ROMs load correctly and download links function properly.'
  }
];

export const platforms: Platform[] = [
  { id: 'switch', name: 'Nintendo Switch', shortName: 'NS', color: 'from-red-500 to-red-400', brand: 'Nintendo', image: 'https://placehold.co/400x200/ef4444/ffffff?text=Switch' },
  { id: 'wiiu', name: 'Wii U', shortName: 'U', color: 'from-cyan-400 to-cyan-200', brand: 'Nintendo', image: 'https://placehold.co/400x200/22d3ee/ffffff?text=Wii+U' },
  { id: '3ds', name: 'Nintendo 3DS', shortName: '3DS', color: 'from-red-500 to-red-400', brand: 'Nintendo', image: 'https://placehold.co/400x200/ef4444/ffffff?text=3DS' },
  { id: 'ds', name: 'Nintendo DS', shortName: 'DS', color: 'from-gray-300 to-gray-100', brand: 'Nintendo', image: 'https://placehold.co/400x200/d1d5db/333333?text=DS' },
  { id: 'wii', name: 'Wii', shortName: 'Wii', color: 'from-slate-200 to-slate-50', brand: 'Nintendo', image: 'https://placehold.co/400x200/e2e8f0/333333?text=Wii' },
  { id: 'gamecube', name: 'Nintendo GameCube', shortName: 'GC', color: 'from-indigo-600 to-indigo-400', brand: 'Nintendo', image: 'https://placehold.co/400x200/4f46e5/ffffff?text=GameCube' },
  { id: 'n64', name: 'Nintendo 64', shortName: 'N64', color: 'from-blue-500 to-blue-300', brand: 'Nintendo', image: 'https://placehold.co/400x200/3b82f6/ffffff?text=N64' },
  { id: 'gba', name: 'Game Boy Advance', shortName: 'GBA', color: 'from-purple-600 to-purple-400', brand: 'Nintendo', image: 'https://placehold.co/400x200/9333ea/ffffff?text=GBA' },
  { id: 'snes', name: 'Super Nintendo', shortName: 'SNES', color: 'from-purple-500 to-purple-300', brand: 'Nintendo', image: 'https://placehold.co/400x200/a855f7/ffffff?text=SNES' },
  { id: 'nes', name: 'Nintendo Entertainment System', shortName: 'NES', color: 'from-red-600 to-red-400', brand: 'Nintendo', image: 'https://placehold.co/400x200/dc2626/ffffff?text=NES' },
  { id: 'gameboy', name: 'Game Boy', shortName: 'GB', color: 'from-green-500 to-green-300', brand: 'Nintendo', image: 'https://placehold.co/400x200/22c55e/ffffff?text=Game+Boy' },

  { id: 'ps2', name: 'PlayStation 2', shortName: 'PS2', color: 'from-blue-700 to-indigo-500', brand: 'Sony', image: 'https://placehold.co/400x200/1d4ed8/ffffff?text=PS2' },
  { id: 'ps3', name: 'PlayStation 3', shortName: 'PS3', color: 'from-gray-700 to-gray-500', brand: 'Sony', image: 'https://placehold.co/400x200/374151/ffffff?text=PS3' },
  { id: 'ps1', name: 'PlayStation', shortName: 'PS1', color: 'from-blue-600 to-blue-400', brand: 'Sony', image: 'https://placehold.co/400x200/2563eb/ffffff?text=PS1' },
  { id: 'psp', name: 'PlayStation Portable', shortName: 'PSP', color: 'from-gray-600 to-gray-400', brand: 'Sony', image: 'https://placehold.co/400x200/4b5563/ffffff?text=PSP' },
  { id: 'vita', name: 'PlayStation Vita', shortName: 'V', color: 'from-indigo-500 to-indigo-300', brand: 'Sony', image: 'https://placehold.co/400x200/6366f1/ffffff?text=PS+Vita' },

  { id: 'dreamcast', name: 'Sega Dreamcast', shortName: 'DC', color: 'from-orange-500 to-orange-300', brand: 'Sega', image: 'https://placehold.co/400x200/f97316/ffffff?text=Dreamcast' },
  { id: 'saturn', name: 'Sega Saturn', shortName: 'SAT', color: 'from-gray-500 to-gray-300', brand: 'Sega', image: 'https://placehold.co/400x200/6b7280/ffffff?text=Saturn' },
  { id: 'genesis', name: 'Sega Genesis', shortName: 'GEN', color: 'from-black to-gray-700', brand: 'Sega', image: 'https://placehold.co/400x200/111827/ffffff?text=Genesis' },

  { id: 'arcade', name: 'Arcade', shortName: 'ARC', color: 'from-pink-500 to-purple-400', brand: 'Other', image: 'https://placehold.co/400x200/ec4899/ffffff?text=Arcade' },
  { id: 'neogeo', name: 'Neo Geo', shortName: 'NG', color: 'from-red-600 to-orange-400', brand: 'Other', image: 'https://placehold.co/400x200/ea580c/ffffff?text=Neo+Geo' },
];

export const roms: Rom[] = [
{
  id: '8',
  platformId: '3ds',
  title: 'Mario Kart 7',
  description: 'Race through exciting tracks with classic Mario characters.',
  size: '800 MB',
  coverImage: '/config/cover_art/mario_kart_7.avif',
  bannerImage: '/config/banner-art/mario_kart_7.png',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-7',
},
{
  id: '9',
  platformId: '3ds',
  title: 'Super Mario 3D Land',
  description: 'A classic 3D Mario adventure built for the Nintendo 3DS.',
  size: '400 MB',
  coverImage: '/config/cover_art/super_mario_3d_land.jpg',
  bannerImage: '/config/banner-art/super_mario_3d_land.jpg',
  gridSize: '1x1',
  downloadLink: '#download-super-mario-3d-land',
},
{
  id: '10',
  platformId: '3ds',
  title: 'Pokémon Omega Ruby',
  description: 'Return to the Hoenn region in this enhanced Pokémon adventure.',
  size: '1.8 GB',
  coverImage: '/config/cover_art/pokemon_o_r.png',
  bannerImage: '/config/banner-art/pokemon_o_r.png',
  gridSize: '1x1',
  downloadLink: '#download-pokemon-omega-ruby',
},
{
  id: '11',
  platformId: '3ds',
  title: 'Pokémon Sun',
  description: 'Explore the tropical Alola region and become its next Pokémon Champion.',
  size: '1.6 GB',
  coverImage: '/config/cover_art/pokemon_s.png',
  bannerImage: '/config/banner-art/pokemon_s.png',
  gridSize: '1x1',
  downloadLink: '#download-pokemon-sun',
},
{
  id: '12',
  platformId: '3ds',
  title: 'The Legend of Zelda: Ocarina of Time 3D',
  description: 'Experience one of Zelda\'s greatest adventures in remastered 3D.',
  size: '550 MB',
  coverImage: '/config/cover_art/zelda_oot_3d.png',
  bannerImage: '/config/banner-art/zelda_oot_3d.jpg',
  gridSize: '1x1',
  downloadLink: '#download-zelda-oot-3d',
},
{
  id: '13',
  platformId: '3ds',
  title: 'The Legend of Zelda: A Link Between Worlds',
  description: 'Travel between two versions of Hyrule in this unique Zelda adventure.',
  size: '700 MB',
  coverImage: '/config/cover_art/zelda_albw.png',
  bannerImage: '/config/banner-art/zelda_albw.png',
  gridSize: '1x1',
  downloadLink: '#download-zelda-link-between-worlds',
},



{
  id: '14',
  platformId: 'ds',
  title: 'Mario Kart DS',
  description: 'Classic Mario Kart racing with iconic tracks and characters.',
  size: '64 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-ds',
},
{
  id: '15',
  platformId: 'ds',
  title: 'New Super Mario Bros.',
  description: 'A classic side-scrolling Mario adventure with modern gameplay.',
  size: '64 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-new-super-mario-bros',
},
{
  id: '16',
  platformId: 'ds',
  title: 'Mario & Luigi: Bowser\'s Inside Story',
  description: 'Join Mario, Luigi and Bowser in one of the funniest Mario RPGs.',
  size: '128 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-bowsers-inside-story',
},
{
  id: '17',
  platformId: 'ds',
  title: 'Pokémon Platinum',
  description: 'Explore the Sinnoh region and uncover the mystery of Giratina.',
  size: '128 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-pokemon-platinum',
},
{
  id: '18',
  platformId: 'ds',
  title: 'The Legend of Zelda: Phantom Hourglass',
  description: 'Set sail on a touch-controlled Zelda adventure.',
  size: '128 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-zelda-phantom-hourglass',
},



{
  id: '19',
  platformId: 'wii',
  title: 'Mario Kart Wii',
  description: 'Race with Mario and friends across classic and new tracks.',
  size: '4.4 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-wii',
},
{
  id: '20',
  platformId: 'wii',
  title: 'New Super Mario Bros. Wii',
  description: 'Team up with friends for classic four-player Mario platforming.',
  size: '4.3 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-new-super-mario-bros-wii',
},
{
  id: '21',
  platformId: 'wii',
  title: 'Mario Party 9',
  description: 'Compete in chaotic minigames across colorful Mario Party boards.',
  size: '3.2 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-party-9',
},
{
  id: '22',
  platformId: 'wii',
  title: 'The Legend of Zelda: Twilight Princess',
  description: 'Enter a darker version of Hyrule in this legendary Zelda adventure.',
  size: '4.5 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-zelda-twilight-princess',
},



{
  id: '23',
  platformId: 'wiiu',
  title: 'Mario Kart 8',
  description: 'Race through spectacular anti-gravity tracks in Mario Kart 8.',
  size: '4.8 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-8',
},
{
  id: '24',
  platformId: 'wiiu',
  title: 'Super Mario 3D World',
  description: 'A colorful 3D Mario adventure designed for cooperative play.',
  size: '1.7 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-super-mario-3d-world',
},
{
  id: '25',
  platformId: 'wiiu',
  title: 'The Legend of Zelda: The Wind Waker HD',
  description: 'Sail across the Great Sea in a beautiful HD remake.',
  size: '2.6 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-wind-waker-hd',
},



{
  id: '26',
  platformId: 'switch',
  title: 'Super Mario Odyssey',
  description: 'Join Mario and Cappy on a globe-trotting 3D adventure.',
  size: '5.6 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-super-mario-odyssey',
},
{
  id: '27',
  platformId: 'switch',
  title: 'Mario Kart 8 Deluxe',
  description: 'The definitive Mario Kart experience with an expanded roster.',
  size: '6.9 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-8-deluxe',
},
{
  id: '28',
  platformId: 'switch',
  title: 'The Legend of Zelda: Breath of the Wild',
  description: 'Explore a massive open world and rediscover Hyrule.',
  size: '14.4 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-zelda-botw',
},
{
  id: '29',
  platformId: 'switch',
  title: 'Super Smash Bros. Ultimate',
  description: 'Battle with the largest roster in Super Smash Bros. history.',
  size: '16.6 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-smash-ultimate',
},
{
  id: '30',
  platformId: 'switch',
  title: 'Animal Crossing: New Horizons',
  description: 'Build your own island paradise and create your perfect community.',
  size: '6.2 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-animal-crossing-new-horizons',
},



{
  id: '31',
  platformId: 'gamecube',
  title: 'Super Mario Sunshine',
  description: 'Clean up Isle Delfino and uncover the mystery behind Shadow Mario.',
  size: '1.4 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-super-mario-sunshine',
},
{
  id: '32',
  platformId: 'gamecube',
  title: 'Mario Kart: Double Dash!!',
  description: 'Team up with another character and race in this unique Mario Kart.',
  size: '1.4 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-double-dash',
},
{
  id: '33',
  platformId: 'gamecube',
  title: 'The Legend of Zelda: The Wind Waker',
  description: 'Set sail across a vast ocean in this colorful Zelda adventure.',
  size: '1.4 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-wind-waker',
},



{
  id: '34',
  platformId: 'n64',
  title: 'Super Mario 64',
  description: 'Jump into paintings and explore Princess Peach\'s castle.',
  size: '8 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-super-mario-64',
},
{
  id: '35',
  platformId: 'n64',
  title: 'Mario Kart 64',
  description: 'Classic four-player Mario Kart racing on Nintendo 64.',
  size: '16 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-mario-kart-64',
},
{
  id: '36',
  platformId: 'n64',
  title: 'The Legend of Zelda: Ocarina of Time',
  description: 'Embark on an epic journey through Hyrule across time.',
  size: '32 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-ocarina-of-time',
},



{
  id: '37',
  platformId: 'gba',
  title: 'Pokémon Emerald',
  description: 'Explore Hoenn and uncover the conflict between Groudon and Kyogre.',
  size: '16 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-pokemon-emerald',
},
{
  id: '38',
  platformId: 'gba',
  title: 'Mario & Luigi: Superstar Saga',
  description: 'Join the Mario Bros. on a hilarious RPG adventure.',
  size: '16 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-superstar-saga',
},



{
  id: '39',
  platformId: 'ps2',
  title: 'Kingdom Hearts II',
  description: 'Join Sora and friends in an action-packed Disney and Square Enix adventure.',
  size: '4.2 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-kingdom-hearts-2',
},
{
  id: '40',
  platformId: 'ps2',
  title: 'Persona 4',
  description: 'Uncover a mysterious series of murders with a group of high school friends.',
  size: '3.0 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-persona-4',
},
{
  id: '41',
  platformId: 'ps2',
  title: 'Shadow of the Colossus',
  description: 'Defeat gigantic creatures across a mysterious forbidden land.',
  size: '1.7 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-shadow-of-the-colossus',
},



{
  id: '42',
  platformId: 'psp',
  title: 'God of War: Ghost of Sparta',
  description: 'Kratos battles his way through a brutal mythological adventure.',
  size: '1.2 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-god-of-war-ghost-of-sparta',
},
{
  id: '43',
  platformId: 'psp',
  title: 'Monster Hunter Freedom Unite',
  description: 'Hunt massive monsters and craft powerful new equipment.',
  size: '750 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-monster-hunter-freedom-unite',
},



{
  id: '44',
  platformId: 'vita',
  title: 'Gravity Rush',
  description: 'Manipulate gravity and explore a mysterious floating city.',
  size: '1.4 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-gravity-rush',
},
{
  id: '45',
  platformId: 'vita',
  title: 'Persona 4 Golden',
  description: 'A coming-of-age mystery filled with friendship, adventure and supernatural battles.',
  size: '3.1 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-persona-4-golden',
},



{
  id: '46',
  platformId: 'ps1',
  title: 'Crash Bandicoot',
  description: 'Jump, spin and crash your way through classic platforming levels.',
  size: '650 MB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-crash-bandicoot',
},
{
  id: '47',
  platformId: 'ps1',
  title: 'Final Fantasy VII',
  description: 'Join Cloud and his allies in one of the most famous RPG adventures.',
  size: '1.3 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-final-fantasy-vii',
},



{
  id: '48',
  platformId: 'dreamcast',
  title: 'Sonic Adventure 2',
  description: 'Race, fight and explore as Sonic, Shadow and their friends.',
  size: '1.1 GB',
  coverImage: '',
  gridSize: '1x1',
  downloadLink: '#download-sonic-adventure-2',
},
];
