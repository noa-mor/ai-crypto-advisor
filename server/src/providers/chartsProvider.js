const chartsProvider = async (user) => {
  if (!user.preference || !user.preference.assets || user.preference.assets.length === 0) {
    console.log('[Charts Provider] No user preferences found, returning mock data for BTC and ETH');
    return getMockChartData(['BTC', 'ETH']);
  }

  const assets = user.preference.assets;

  const assetIdMap = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'SOL': 'solana',
    'DOGE': 'dogecoin',
    'XRP': 'ripple',
    'ADA': 'cardano',
    'DOT': 'polkadot',
    'MATIC': 'matic-network'
  };

  const ids = assets
    .map(asset => assetIdMap[asset])
    .filter(id => id)
    .join(',');

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`;

  try {
    console.log('Fetching chart data for assets:', assets);
    console.log('CoinGecko IDs:', ids);
    console.log('URL:', url);

    const response = await fetch(url);
    console.log('CoinGecko response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('CoinGecko error:', errorText);
      console.log('Using mock data instead');
      return getMockChartData(assets);
    }

    const data = await response.json();
    console.log('CoinGecko data received:', data.length, 'coins');
    console.log('Coin IDs received:', data.map(c => c.id));

    if (!data || data.length === 0) {
      console.log('No data returned from CoinGecko, using mock data');
      return getMockChartData(assets);
    }

    console.log('User selected assets:', assets);

    const receivedIds = data.map(c => c.id);
    const missingAssets = assets.filter(asset => {
      const coinId = assetIdMap[asset];
      return !receivedIds.includes(coinId);
    });

    if (missingAssets.length > 0) {
      console.log('Some assets missing from CoinGecko response, adding mock data for:', missingAssets);
      const mockData = getMockChartData(missingAssets);
      data.push(...mockData.results.map(m => ({
        id: assetIdMap[m.name] || m.id,
        name: m.name,
        symbol: m.symbol,
        current_price: m.current_price,
        market_cap: m.market_cap,
        total_volume: m.total_volume,
        price_change_percentage_24h: m.price_change_percentage_24h,
        image: m.image || ''
      })));
    }

    const results = data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      image: coin.image
    }));

    console.log('Final results count:', results.length);
    console.log('Final result IDs:', results.map(r => r.id));

    return { results };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return getMockChartData(assets);
  }
};

const getMockChartData = (assets) => {
  const mockPrices = {
    BTC: { price: 111000, change: -2.5, marketCap: 2.1e12, volume: 45e9 },
    ETH: { price: 4100, change: 1.8, marketCap: 490e9, volume: 25e9 },
    SOL: { price: 185, change: 3.2, marketCap: 85e9, volume: 4.5e9 },
    DOGE: { price: 0.32, change: -1.2, marketCap: 46e9, volume: 2.8e9 },
    XRP: { price: 2.1, change: 0.5, marketCap: 120e9, volume: 3.2e9 },
    ADA: { price: 1.05, change: -0.8, marketCap: 37e9, volume: 1.5e9 },
    DOT: { price: 18.5, change: 2.1, marketCap: 24e9, volume: 900e6 },
    MATIC: { price: 1.25, change: -1.5, marketCap: 12e9, volume: 650e6 }
  };

  const results = assets.map(asset => {
    const mock = mockPrices[asset] || mockPrices.BTC;
    return {
      id: asset.toLowerCase(),
      name: asset,
      symbol: asset.toLowerCase(),
      current_price: mock.price,
      market_cap: mock.marketCap,
      total_volume: mock.volume,
      price_change_percentage_24h: mock.change,
      image: ''
    };
  });

  return { results };
};

module.exports = chartsProvider;
