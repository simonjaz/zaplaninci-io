import React from 'react';
import { Play, Trash2 } from 'lucide-react';

export function FavoritesGrid({ favorites, onRemoveOption }) {
    if (favorites.length === 0) {
        return (
            <div className="panel empty-state">
                <p>No favorite worlds saved yet.</p>
                <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#888' }}>
                    Use the search bar above to create a shortcut to your favorite Bloxd.io lobbies!
                </p>
            </div>
        );
    }

    return (
        <div className="favorites-grid">
            {favorites.map((fav) => (
                <div key={fav.id} className="favorite-card">
                    <img src={fav.imageUrl} alt={fav.name} />
                    <div className="favorite-content">
                        <div>
                            <h3 className="lobby-name">{fav.name}</h3>
                            <span className="lobby-type">{fav.type}</span>
                        </div>
                        <div className="card-actions">
                            <a
                                href={fav.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                                style={{ textDecoration: 'none' }}
                            >
                                <Play size={18} />
                                Play
                            </a>
                            <button
                                className="btn danger"
                                onClick={() => onRemoveOption(fav.id)}
                                style={{ flex: 0, padding: '0.75rem' }}
                                title="Remove from favorites"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
