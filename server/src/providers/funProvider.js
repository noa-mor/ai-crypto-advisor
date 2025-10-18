const cryptoMemes = [
  {
    id: 'meme-1',
    title: 'HODL Forever',
    url: 'https://i.imgflip.com/2fm6x8.jpg'
  },
  {
    id: 'meme-2',
    title: 'When You Check Your Portfolio',
    url: 'https://i.imgflip.com/1g8my4.jpg'
  },
  {
    id: 'meme-3',
    title: 'Buy High Sell Low',
    url: 'https://i.imgflip.com/30b1gx.jpg'
  },
  {
    id: 'meme-4',
    title: 'Diamond Hands',
    url: 'https://i.imgflip.com/4t0m5i.jpg'
  },
  {
    id: 'meme-5',
    title: 'To The Moon',
    url: 'https://i.imgflip.com/26am.jpg'
  },
  {
    id: 'meme-6',
    title: 'Crypto Dip',
    url: 'https://i.imgflip.com/1bij.jpg'
  },
  {
    id: 'meme-7',
    title: 'When BTC Pumps',
    url: 'https://i.imgflip.com/1ur9b0.jpg'
  },
  {
    id: 'meme-8',
    title: 'Checking Charts at 3AM',
    url: 'https://i.imgflip.com/2d3al6.jpg'
  },
  {
    id: 'meme-9',
    title: 'Trust Me Bro',
    url: 'https://i.imgflip.com/1ihzfe.jpg'
  },
  {
    id: 'meme-10',
    title: 'Paper Hands vs Diamond Hands',
    url: 'https://i.imgflip.com/261o3j.jpg'
  }
];

const funProvider = async (user) => {
  const randomIndex = Math.floor(Math.random() * cryptoMemes.length);
  const meme = cryptoMemes[randomIndex];

  console.log('[Fun Provider] Selected meme:', meme.title, 'URL:', meme.url);

  return {
    results: [{
      ...meme,
      id: meme.id + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    }]
  };
};

module.exports = funProvider;
