const voteService = require('../services/voteService');

const promptTemplates = [
  (investorType, assets, voteContext) =>
    `As a ${investorType} tracking ${assets}, what's one contrarian investment thesis for the current market?${voteContext} Share a unique perspective.`,
  (investorType, assets, voteContext) =>
    `Give tactical advice for a ${investorType} focused on ${assets} based on recent market movements.${voteContext} What should they watch for?`,
  (investorType, assets, voteContext) =>
    `What's a risk that ${investorType} investors in ${assets} are overlooking right now?${voteContext} Explain briefly.`,
  (investorType, assets, voteContext) =>
    `Provide a specific actionable strategy for a ${investorType} investing in ${assets} this week.${voteContext} Be concrete.`,
  (investorType, assets, voteContext) =>
    `What emerging trend in ${assets} should a ${investorType} pay attention to?${voteContext} Give fresh insights.`,
  (investorType, assets, voteContext) =>
    `If you're a ${investorType} holding ${assets}, what's one thing you should do differently today?${voteContext} Be specific.`
];

const socialProvider = async (user) => {
  if (!user.preference || !user.preference.assets || !user.preference.investorType) {
    console.log('[Social Provider] No user preferences found, returning generic fallback');
    const genericFallbacks = [
      'Stay informed about market trends and always conduct your own research before making investment decisions. Diversification is key to managing risk.',
      'Monitor both technical indicators and fundamental developments. The crypto market moves fast, so staying updated is crucial for success.',
      'Consider dollar-cost averaging to reduce timing risk. This strategy helps smooth out volatility in your portfolio.',
      'Keep track of regulatory developments as they can significantly impact crypto markets. Knowledge is power in this space.',
      'Never invest more than you can afford to lose. Crypto markets are highly volatile and proper risk management is essential.'
    ];
    const randomIndex = Math.floor(Math.random() * genericFallbacks.length);
    return {
      results: [{
        id: 'ai-fallback-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        text: genericFallbacks[randomIndex]
      }]
    };
  }

  const assets = user.preference.assets.join(', ');
  const investorType = user.preference.investorType;
  const hfToken = process.env.HUGGING_FACE_TOKEN;

  const userVotes = await voteService.getVotesByUser(user._id);

  console.log('[AI Insight] Total user votes:', userVotes.length);

  const likedItems = userVotes.filter(v => v.value === 1).map(v => v.itemTitle);
  const dislikedItems = userVotes.filter(v => v.value === -1).map(v => v.itemTitle);
  const likesCount = likedItems.length;
  const dislikesCount = dislikedItems.length;

  console.log('[AI Insight] Liked items:', likedItems);
  console.log('[AI Insight] Disliked items:', dislikedItems);

  let voteContext = '';
  if (likedItems.length > 0) {
    voteContext += ` User has liked ${likesCount} items including: ${likedItems.slice(-3).join(', ')}.`;
  }
  if (dislikedItems.length > 0) {
    voteContext += ` User disliked ${dislikesCount} items including: ${dislikedItems.slice(-3).join(', ')}.`;
  }

  const randomness = Math.random().toString(36).substr(2, 5);
  const timestamp = Date.now();
  voteContext += ` Session: ${timestamp}-${randomness}.`;

  const templateIndex = Math.floor(Math.random() * promptTemplates.length);
  const prompt = promptTemplates[templateIndex](investorType, assets, voteContext);

  console.log('[AI Insight] Template index:', templateIndex);
  console.log('[AI Insight] Generated prompt:', prompt);

  if (hfToken) {
    try {

      const response = await fetch(
        'https://api-inference.huggingface.co/models/google/gemma-2-2b-it',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hfToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 200,
              temperature: 0.9,
              top_p: 0.95,
              return_full_text: false
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        let text;

        if (Array.isArray(data) && data.length > 0) {
          text = data[0].generated_text || String(data[0]);
        } else if (data.generated_text) {
          text = data.generated_text;
        } else {
          text = String(data);
        }

        return {
          results: [{
            id: 'ai-insight-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            text: text.trim()
          }]
        };
      }
    } catch (error) {
      console.error('HuggingFace API error:', error);
    }
  }

  const fallbackInsights = [
    `As a ${investorType} focused on ${assets}, consider implementing a steady dollar-cost averaging strategy. Monitor the correlation between BTC and ETH this week, as market volatility may present strategic entry points.`,
    `For ${investorType} investors in ${assets}, pay attention to on-chain metrics like wallet accumulation patterns. Rising exchange outflows often signal confidence from large holders.`,
    `${investorType} traders should watch for divergences between ${assets} price action and volume trends. These often precede major movements and can inform better entry/exit timing.`,
    `As a ${investorType} in ${assets}, consider the impact of upcoming regulatory clarity on institutional adoption. Position sizing and risk management remain crucial in volatile conditions.`,
    `For ${investorType} strategies with ${assets}, monitor the correlation with traditional markets. Decoupling events historically present unique opportunities for crypto-focused portfolios.`
  ];

  const fallbackIndex = Math.floor(Math.random() * fallbackInsights.length);

  return {
    results: [{
      id: 'ai-fallback-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      text: fallbackInsights[fallbackIndex]
    }]
  };
};

module.exports = socialProvider;
