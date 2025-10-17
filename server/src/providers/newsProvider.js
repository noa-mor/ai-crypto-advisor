const url = "https://cryptopanic.com/api/developer/v2/posts/";

const newsProvider = async (user) => {
  const params = {
    auth_token: process.env.CRYPTOPANIC_TOKEN,
    public: "true",
    kind: "news",
    page: 1,
  };

  const queryParams = new URLSearchParams(params);
  const currencies = user.preference.assets.join(",");
  const urlWithParams = `${url}?${queryParams.toString()}&currencies=${currencies}`;
  const response = await fetch(urlWithParams);

  if (!response.ok) {
    return mockData;
    // throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseJson = await response.json();

  return responseJson;
};

module.exports = newsProvider;

const mockData = {
  next: "",
  results: [
    {
      id: 26188511,
      slug: "Ethereum-Ready-For-Rapid-Expansion-As-Price-Holds-3900-Support-30-Rally-Coming",
      title:
        "Ethereum Ready For ‘Rapid Expansion’ As Price Holds $3,900 Support – 30% Rally Coming?",
      description:
        "As the market volatility continues, Ethereum (ETH) has dropped 3. 1% in the daily timeframe and is attempting to hold a key price area as support once again. Despite the dip, some analysts have suggested that the King of Altcoin is set to start a new expansion phase soon. Related Reading: Bitcoin (BTC) ‘Uptober’ Rally On Pause Until This Level Is Reclaimed Ethereum Retests Major Support Zone On Wednesday, Ethereum fell below the $4,000 level for the third time this week, retesting a crucial area before bouncing",
      published_at: "2025-10-16T09:00:20Z",
      created_at: "2025-10-16T09:00:20+00:00",
      kind: "news",
    },
    {
      id: 26188470,
      slug: "600M-Bitcoin-short-sparks-fear-Is-BTCs-110K-under-threat",
      title: "$600M Bitcoin short sparks fear – Is BTC’s $110K under threat?",
      description:
        "BTC on edge: Massive shorts hit ahead of U. S. –China trade war news.",
      published_at: "2025-10-16T09:00:00Z",
      created_at: "2025-10-16T09:00:00+00:00",
      kind: "news",
    },
    {
      id: 26188504,
      slug: "Building-October-2025s-Best-Crypto-Portfolio-Large-Caps-BTC-123K-ETH-4551-High-Growth-Ozak-AI-0012",
      title:
        "Building October 2025's Best Crypto Portfolio: Large-Caps (BTC $123K, ETH $4,551) + High-Growth (Ozak AI $0.012)",
      description:
        "By October 2025, Bitcoin (BTC) and Ethereum (ETH) will still be the two most prominent representatives of large-cap cryptocurrencies, with a price of $123,000 and $4,551, respectively.",
      published_at: "2025-10-16T08:56:12Z",
      created_at: "2025-10-16T08:56:12+00:00",
      kind: "news",
    },
    {
      id: 26189953,
      slug: "Mt-Goxs-34000-Bitcoin-Deadline-Sparks-Market-Jitters-Analysts-Warn-of-FUD",
      title:
        "Mt. Gox’s 34,000 Bitcoin Deadline Sparks Market Jitters — Analysts Warn of FUD",
      description:
        "The long-running Mt. Gox saga has returned to center stage as blockchain analysts detect new movement in the defunct exchange&rsquo;s wallets for the first time in seven months. The move comes just weeks before a key repayment deadline, sparking concerns about renewed market FUD (fear, uncertainty, and doubt). Mt",
      published_at: "2025-10-16T08:51:01Z",
      created_at: "2025-10-16T08:51:01+00:00",
      kind: "news",
    },
    {
      id: 26188446,
      slug: "Crypto-scammer-on-the-run-with-18-billion-in-Bitcoin",
      title: "Crypto scammer on the run with $1.8 billion in Bitcoin",
      description:
        "Chen Zhi, chairman of Cambodia’s Prince Group, has become the central figure in one of the largest crypto fraud scandals &#8230; Continue reading The post Crypto scammer on the run with $1.",
      published_at: "2025-10-16T08:47:36Z",
      created_at: "2025-10-16T08:47:36+00:00",
      kind: "news",
    },
    {
      id: 26188461,
      slug: "Will-Tesla-Nvidia-End-Thursday-Up-Or-Down-Of-Course-You-Dont-Know-For-Sure-But-You-Can-Bet-the-Outcome-on-Polymarket",
      title:
        "Will Tesla, Nvidia End Thursday Up Or Down? Of Course, You Don't Know For Sure, But You Can Bet the Outcome on Polymarket",
      description:
        "Blockchain-based prediction platform Polymarket introduced a new &#8220;up/down&#8221; equity market feature, allowing users to bet on&nbsp;specific stocks and benchmarks. read more",
      published_at: "2025-10-16T08:42:50Z",
      created_at: "2025-10-16T08:42:50+00:00",
      kind: "news",
    },
    {
      id: 26189224,
      slug: "Bitcoin-Is-Flirting-with-Danger-Early-Black-Friday",
      title: "Bitcoin Is ‘Flirting’ with Danger: Early Black Friday?",
      description:
        "Bitcoin (BTC) price plunged below the key $112,000 level amid global market stress, with analysts warning of short-term fragility.",
      published_at: "2025-10-16T08:42:29Z",
      created_at: "2025-10-16T08:42:29+00:00",
      kind: "news",
    },
    {
      id: 26188418,
      slug: "Bitcoin-Faces-Potential-Consolidation-Amid-Market-Uncertainty",
      title: "Bitcoin Faces Potential Consolidation Amid Market Uncertainty",
      description:
        "Bitcoin may face challenges sustaining its upward momentum unless fresh catalysts reignite investor interest, according to Glassnode. “Without a renewed catalyst to lift prices back above $117. 1k, the market risks deeper contraction toward the lower boundary of this range,” the report said. Bitcoin is trading around $110,840, approximately 5% below the $117,000 level, according to CoinMarketCap",
      published_at: "2025-10-16T08:40:27Z",
      created_at: "2025-10-16T08:40:27+00:00",
      kind: "news",
    },
    {
      id: 26188393,
      slug: "Bitcoin-Seizure-Sparks-Tension-Between-UK-Treasury-and-Chinese-Victims",
      title:
        "Bitcoin Seizure Sparks Tension Between UK Treasury and Chinese Victims",
      description:
        "The UK government is weighing a compensation plan for victims of a major crypto fraud involving 61,000 BTC seized from Chinese scammer Zhimin Qian. Details of the Seizure and Conviction The United Kingdom government is considering a compensation plan for victims of a major fraud case that could see the Treasury retain a portion of [&#8230;]",
      published_at: "2025-10-16T08:30:37Z",
      created_at: "2025-10-16T08:30:37+00:00",
      kind: "news",
    },
    {
      id: 26191527,
      slug: "What-Happened-To-Crypto-Market-Today-Weekly-Slide-Hits-104",
      title: "What Happened To Crypto Market Today: Weekly Slide Hits 10.4%",
      description:
        "The crypto market dropped by 1. 02% over the last 24 hours, continuing its downward slide for the week. This recent decline adds to a total weekly loss of 10. 4%, reflecting both technical pressure and broader global instability. Read More",
      published_at: "2025-10-16T08:30:00Z",
      created_at: "2025-10-16T08:30:00+00:00",
      kind: "news",
    },
    {
      id: 26187102,
      slug: "UK-proposes-compensation-for-Chinese-victims-of-68B-BTC-fraud",
      title: "UK proposes compensation for Chinese victims of $6.8B BTC fraud",
      description:
        "Authorities seek to balance investors’ right to restitution with the State’s fiscal interests. The post UK proposes compensation for Chinese victims of $6.",
      published_at: "2025-10-16T08:02:43Z",
      created_at: "2025-10-16T08:02:43+00:00",
      kind: "news",
    },
    {
      id: 26187116,
      slug: "The-rise-of-the-Bitcoin-treasuries-the-new-model-that-redefines-corporate-finance",
      title:
        "The rise of the Bitcoin treasuries: the new model that redefines corporate finance",
      description:
        "Corporate Bitcoin holdings jumped 23% in Q2 2025 as firms embrace BTC for treasury, strategy, and long-term value. The article The rise of the Bitcoin treasuries: the new model that redefines corporate finance was first published on Crypto Valley Journal.",
      published_at: "2025-10-16T08:02:41Z",
      created_at: "2025-10-16T08:02:41+00:00",
      kind: "news",
    },
    {
      id: 26186912,
      slug: "Newbie-Bitcoin-Whales-Now-Control-44-Of-Realized-Cap-Highest-Ever",
      title:
        "Newbie Bitcoin Whales Now Control 44% Of Realized Cap, Highest Ever",
      description:
        "On-chain data shows the short-term holder Bitcoin whales have recently increased their Realized Cap share to the highest level ever. Bitcoin Is Currently Being Dominated By New Capital In a new post on X, CryptoQuant community analyst Maartunn has talked about the latest trend in the share of the Bitcoin whale Realized Cap held by the short-term holders. The Realized Cap here is an on-chain indicator that measures, in short, the total amount of capital that the BTC investors as a whole have put into the cryptocurrency. Changes in this metric reflect the incoming or outgoing of capital",
      published_at: "2025-10-16T08:00:05Z",
      created_at: "2025-10-16T08:00:05+00:00",
      kind: "news",
    },
    {
      id: 26190081,
      slug: "Australia-Targets-Crypto-ATMs-With-Potential-Ban-Powers-for-AUSTRAC",
      title:
        "Australia Targets Crypto ATMs With Potential Ban Powers for AUSTRAC",
      description:
        "Australia’s cybersecurity minister Tony Burke is drafting legislation that would give the country’s financial intelligence agency, AUSTRAC, the authority to restrict or ban crypto ATMs viewed as “high-risk products.",
      published_at: "2025-10-16T08:00:02Z",
      created_at: "2025-10-16T08:00:02+00:00",
      kind: "news",
    },
    {
      id: 26186828,
      slug: "Bitcoin-Tests-110K-Floor-as-Whale-Sales-Put-Demand-Surge",
      title: "Bitcoin Tests $110K Floor as Whale Sales, Put Demand Surge",
      description: "Your daily access to the backroom",
      published_at: "2025-10-16T07:32:31Z",
      created_at: "2025-10-16T07:32:31+00:00",
      kind: "news",
    },
    {
      id: 26186770,
      slug: "Bitcoin-OG-Transfers-2000-BTC-to-51-Wallets-Are-Whales-Looking-to-Dump",
      title:
        "Bitcoin OG Transfers 2,000 BTC to 51 Wallets — Are Whales Looking to Dump?",
      description:
        "A long-dormant Bitcoin wallet moved 2,000 BTC worth $222m to 51 new addresses, fueling speculation over whether whales are preparing to dump.",
      published_at: "2025-10-16T07:28:11Z",
      created_at: "2025-10-16T07:28:11+00:00",
      kind: "news",
    },
    {
      id: 26187586,
      slug: "How-Low-Can-Bitcoin-Ethereum-and-XRP-Prices-Go-Key-Targets-Revealed",
      title:
        "How Low Can Bitcoin, Ethereum, and XRP Prices Go? Key Targets Revealed",
      description:
        "This week’s crypto landscape has become a battleground of bears and battered bulls. As panic selling spurred by geopolitical uncertainities and regulatory crackdowns triggered a broad market sell-off. The global crypto market cap collapsed by 1. 97% to $3. 76 trillion, echoing a steep 10. 88% weekly dive. This is with the CMC20 index off 1. 53% and altcoin &hellip;",
      published_at: "2025-10-16T07:07:33Z",
      created_at: "2025-10-16T07:07:33+00:00",
      kind: "news",
    },
    {
      id: 26190080,
      slug: "Ethereum-BitMine-Holds-25-of-Supply-After-Buying-the-Dip",
      title: "Ethereum: BitMine Holds 2.5% of Supply After Buying the Dip",
      description:
        "BitMine has reportedly added another 104,000 ETH worth around $417 million to its holdings as prices dropped roughly 20% from their August peak. The post Ethereum: BitMine Holds 2.",
      published_at: "2025-10-16T07:00:54Z",
      created_at: "2025-10-16T07:00:54+00:00",
      kind: "news",
    },
    {
      id: 26185313,
      slug: "Bitcoin-Bull-Run-Coming-To-An-End-Cycle-Peak-Countdown-Signals-993-Completion",
      title:
        "Bitcoin Bull Run Coming To An End: Cycle Peak Countdown Signals 99.3% Completion",
      description:
        "After a turbulent few days, Bitcoin (BTC) has resumed its downtrend, currently retracing toward $111,000. This marks a 12% decline from its recent peak of $126,000, which raises concerns among market experts who suggest that the bull run may be closer to its end than many investors believe. End Of Bitcoin Bull Cycle Within Nine Days? On October 14, market analyst CryptoBirb, took to social media platform X (formerly Twitter) to assert that the bullish cycle is nearing its conclusion, stating that it may end within the next nine days. He referenced the Cycle Peak Countdown indicator, which suggests that Bitcoin is 99",
      published_at: "2025-10-16T07:00:18Z",
      created_at: "2025-10-16T07:00:18+00:00",
      kind: "news",
    },
    {
      id: 26185301,
      slug: "Square-Enables-First-Bitcoin-Payment-at-US-Coffee-Chain",
      title: "Square Enables First Bitcoin Payment at US Coffee Chain",
      description:
        "All 10 wallet tests succeeded at the coffee shop instantly as Square prepares worldwide rollout of its new Bitcoin payment system.",
      published_at: "2025-10-16T06:51:39Z",
      created_at: "2025-10-16T06:51:39+00:00",
      kind: "news",
    },
  ],
};
