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

        // Some placeholder images that match bloxd.io vibes or generic modes
        const mockImageMap = {
            survival: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80',
            peaceful: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
            creative: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&q=80',
            bedwars: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
            greenville: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
            oneblock: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
            zombies: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80'
        };

        const newFavorite = {
            id: `${selectedMode}-${worldName.trim().toLowerCase()}`,
            name: worldName.trim(),
            type: LOBBY_MODES.find(m => m.id === selectedMode)?.name || selectedMode,
            url: formattedUrl,
            imageUrl: mockImageMap[selectedMode] || mockImageMap.survival
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
