import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const LOBBY_MODES = [
    { id: 'survival', name: 'Survival' },
    { id: 'peaceful', name: 'Peaceful' },
    { id: 'creative', name: 'Creative' },
    { id: 'bedwars', name: 'BedWars' },
    { id: 'greenville', name: 'Greenville' },
    { id: 'oneblock', name: 'OneBlock' },
    { id: 'zombies', name: 'Zombies' },
];

export function SearchBar({ onAddFavorite }) {
    const [worldName, setWorldName] = useState('');
    const [selectedMode, setSelectedMode] = useState(LOBBY_MODES[0].id);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!worldName.trim()) return;

        // e.g. https://bloxd.io/play/classic/zaplaninci_io3.?lobby=survival&room=zaplaninci_io3.
        const encodedName = encodeURIComponent(worldName.trim());
        const basePath = ['survival', 'peaceful', 'creative'].includes(selectedMode) ? 'classic' : selectedMode;
        const formattedUrl = `https://bloxd.io/play/${basePath}/${encodedName}?lobby=${selectedMode}&room=${encodedName}`;

        // Array of random bloxd.io/voxel style thumbnails from the internet
        const randomThumbnails = [
            'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/b7bb7aa4f66a7bfaec0ed556bac2baef.png',
            'https://images.crazygames.com/bloxdhop-io/20220811090326/bloxdhop-io-cover',
            'https://play-lh.googleusercontent.com/IWeNq3p4M7Y3ZqU239G9V4QO00H02Bf0h0XhB5I5Nl8c_8r9p3hH515W06201b1Q2g',
            'https://images.crazygames.com/bloxd-io/20230621151608/bloxd-io-cover',
            'https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/2d9b689028fb34d0bfe053ff3da9f381.png',
            'https://images.crazygames.com/games/bloxd-io/cover-1678465546252.png?auto=format,compress&q=75&cs=strip',
            'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80',
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
            'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&q=80',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
            'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
            'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
            'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80'
        ];
        const randomImgUrl = randomThumbnails[Math.floor(Math.random() * randomThumbnails.length)];

        const newFavorite = {
            id: `${selectedMode}-${worldName.trim().toLowerCase()}-${Date.now()}`,
            name: worldName.trim(),
            type: LOBBY_MODES.find(m => m.id === selectedMode)?.name || selectedMode,
            url: formattedUrl,
            imageUrl: randomImgUrl
        };

        onAddFavorite(newFavorite);
        setWorldName('');
    };

    return (
        <div className="panel" style={{ marginBottom: '2rem' }}>
            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter world name (e.g. Lobby 1)"
                    value={worldName}
                    onChange={(e) => setWorldName(e.target.value)}
                />
                <select
                    className="input-field"
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    style={{ flex: 0, minWidth: '200px' }}
                >
                    {LOBBY_MODES.map(mode => (
                        <option key={mode.id} value={mode.id}>{mode.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn">
                    <Plus size={20} />
                    Add to Favorites
                </button>
            </form>
        </div>
    );
}
