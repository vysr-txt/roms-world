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
    id: '1',
    platformId: '3ds',
    title: 'Mario & Luigi Dream Team',
    description: 'A hilarious RPG adventure inside Luigi\'s dreams.',
    size: '850 MB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/91476/icon/WipQLMjs.png',
    gridSize: '1x1',
    downloadLink: '#download-dream-team',
  },
  {
    id: '2',
    platformId: 'ds',
    title: 'Pokémon HeartGold',
    description: 'Return to the Johto region in this classic remake.',
    size: '128 MB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/99350/boxart/YUeO5YIq.png',
    gridSize: '1x1',
    downloadLink: '#download-heartgold',
  },
  {
    id: '3',
    platformId: 'wiiu',
    title: 'Super Smash Bros.',
    description: 'The ultimate fighting game gathering all your favorite characters.',
    size: '15 GB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/195023/boxart/KBWYnac8.png',
    gridSize: '1x1',
    downloadLink: '#download-smash-bros',
  },
  {
    id: '4',
    platformId: 'vita',
    title: 'Persona 4 Golden',
    description: 'A coming of age story that sets the protagonist and his friends on a journey.',
    size: '3.1 GB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/143053/icon/C9WoSVBB.png',
    gridSize: '1x1',
    downloadLink: '#download-persona-4',
  },
  {
    id: '5',
    platformId: '3ds',
    title: 'Animal Crossing',
    description: 'Move into a new town and become the mayor!',
    size: '1.2 GB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/90938/icon/0Y8aQEwB.png',
    gridSize: '1x1',
    downloadLink: '#download-animal-crossing',
  },
  {
    id: '6',
    platformId: 'wii',
    title: 'Super Mario Galaxy',
    description: 'Travel across the universe to save Princess Peach.',
    size: '3.4 GB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/34686/icon/3teILp0a.png',
    gridSize: '1x1',
    downloadLink: '#download-mario-galaxy',
  },
  {
    id: '7',
    platformId: '3ds',
    title: 'The Legend of Zelda',
    description: 'Two worlds collide in an all-new adventure.',
    size: '700 MB',
    coverImage: 'https://assets.iisu.network/cdn-cgi/image/width=320,quality=76,format=auto/games/91414/icon/l16OnAMJ.png',
    gridSize: '1x1',
    downloadLink: '#download-zelda',
  }
];
