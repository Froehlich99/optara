// NAVIGATION
export const NAV_LINKS = [
  { href: "/portfolio", key: "portfolio", label: "Portfolio" },
  { href: "/quests", key: "quests", label: "Quests" },
  { href: "/leaderboard", key: "leaderboard ", label: "Leaderboard" },
];

export const popularStocks = {
  US0231351067: "Amazon.com Inc.",
  DE000ZAL1111: "Zalando SE",
  US30303M1027: "Meta Platforms Inc.",
  US5949181045: "Microsoft",
  US64110L1061: "Netflix Inc.",
};

export const timeFrame = [
  "1 D.",
  "1 M.",
  "6 M.",
  "YTD",
  "1 Y.",
  "5 Y.",
  "Max.",
];

export const emptyQuests = [
  {
    name: "Claim your first Quest!",
    rewardPoints: 10,
    completion: 100,
  },
  {
    name: "Have a Portfolio worth at least 10€",
    rewardPoints: 50,
    completion: 0,
  },
  {
    name: "Log in to the app 7 days in a row",
    rewardPoints: 70,
    completion: 0,
  },
  {
    name: "Own three different stocks",
    rewardPoints: 100,
    completion: 0,
  },

];


export const rewards = [
  {
    name: "+5€ for your account",
    cost: "100"
  },
  {
    name: "+50€ for your account",
    cost: "1000"
  },
  {
    name: "No transaction costs on next buy",
    cost: "1000"
  },
  {
    name: "Spin the Wheel and get a free stock!",
    cost: "10"
  }
]