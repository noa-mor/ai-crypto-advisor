import React, { useState } from 'react';
import { addVote } from '../api/voteApi';

export default function ContentCard({ item, type, onVote }) {
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (value) => {
    if (voting || hasVoted) return;

    setVoting(true);
    try {
      await addVote({
        type,
        itemId: item.id.toString(),
        itemTitle: item.title || item.name || item.text || 'Untitled',
        value
      });
      setHasVoted(true);
      if (onVote) onVote(item.id);
    } catch (err) {
      console.error('Vote failed:', err);
    } finally {
      setVoting(false);
    }
  };

  const renderContent = () => {
    if (type === 'news') {
      return (
        <>
          <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h4>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>
        </>
      );
    }

    if (type === 'charts') {
      return (
        <>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">{item.name}</h4>
            <span className="text-xs text-gray-500">{item.symbol?.toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-gray-900">${item.current_price?.toLocaleString()}</span>
            <span className={`text-sm font-semibold ${item.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {item.price_change_percentage_24h >= 0 ? '+' : ''}{item.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs text-gray-500">
            <div>Market Cap: ${(item.market_cap / 1e9).toFixed(2)}B</div>
            <div>24h Volume: ${(item.total_volume / 1e9).toFixed(2)}B</div>
          </div>
        </>
      );
    }

    if (type === 'social') {
      return (
        <>
          <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
        </>
      );
    }

    if (type === 'fun') {
      console.log('[ContentCard - Fun]', 'Item:', item);
      console.log('[ContentCard - Fun]', 'Title:', item.title, 'URL:', item.url);
      return (
        <>
          <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
          {item.url ? (
            <img
              src={item.url}
              alt={item.title}
              className="w-full rounded-lg mb-2"
              onError={(e) => {
                console.error('[Meme Image] Failed to load:', item.url);
                e.target.src = 'https://via.placeholder.com/400x300?text=Meme+Not+Available';
              }}
              onLoad={() => console.log('[Meme Image] Loaded successfully:', item.url)}
            />
          ) : (
            <div className="bg-gray-200 p-8 text-center text-gray-500 rounded-lg">
              No meme image available
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      {renderContent()}

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => handleVote(1)}
          disabled={voting || hasVoted}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
            voting
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed opacity-75'
              : hasVoted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {voting ? '⏳ Voting...' : hasVoted ? '👍 Voted' : '👍 Like'}
        </button>
        <button
          onClick={() => handleVote(-1)}
          disabled={voting || hasVoted}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
            voting
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed opacity-75'
              : hasVoted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {voting ? '⏳ Voting...' : hasVoted ? '👎 Voted' : '👎 Dislike'}
        </button>
      </div>
    </div>
  );
}
