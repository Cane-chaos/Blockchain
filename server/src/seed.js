require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");

const seedCourses = [
{
  id: 1,
  slug: "blockchain-fundamentals",
  title: "Blockchain Fundamentals",
  price: "0.05",
  image: "https://img.bitgetimg.com/multiLang/web/0a2c529e667a671d17e0ec282e7a28d3.png",
  previewVideo: "yubzJw0uiE4",
  level: "Beginner",
  duration: "2 weeks",

  skills: ["Blockchain","Distributed Systems","Cryptography","Data Integrity"],

  about: {
    description: "This course introduces blockchain technology.",
    learning: [
      "Understand blockchain fundamentals",
      "Explain consensus mechanisms",
      "Analyze blockchain use cases"
    ]
  },

  curriculum: [
    {
      title: "Blockchain Basics",
      lessons: [
        "What is Blockchain",
        "Distributed Ledger",
        "Blockchain vs Traditional DB"
      ]
    }
  ],

  reviews: [
    {
      user: "Alice",
      rating: 5,
      comment: "Very easy to understand!"
    }
  ]
},

{
  id: 2,
  slug: "smart-contract-solidity",
  title: "Smart Contract with Solidity",
  price: "0.08",
  image: "https://assets.coingecko.com/coingecko/public/ckeditor_assets/pictures/21681/content_Solidity_Guide__Develop_a_Smart_Contract_-_CoinGecko_API.webp",
  previewVideo: "ZE2HxTmxfrI",
  level: "Intermediate",
  duration: "4 weeks",

  skills: ["Solidity","Ethereum","Smart Contracts","Web3.js"],

  about: {
    description: "Learn how to write smart contracts.",
    learning: [
      "Write smart contracts",
      "Deploy contracts to Ethereum",
      "Secure smart contracts"
    ]
  },

  curriculum: [],
  reviews: []
},

{
  id: 3,
  slug: "web3-dapp-development",
  title: "Web3 & DApp Development",
  price: "0.1",
  image: "https://moralis.io/wp-content/uploads/2022/09/22_09_How-to-Create-a-Web3-Dapp-in-3-Steps.jpg",
  previewVideo: "zQZluEJaCgs",
  level: "Intermediate",
  duration: "6 weeks",

  skills: ["Web3","DApp","MetaMask","Ethers.js"],

  about: {
    description: "Build decentralized applications.",
    learning: [
      "Build decentralized apps",
      "Connect frontend with blockchain",
      "Integrate MetaMask"
    ]
  },

  curriculum: [],
  reviews: []
},
{
  id: 4,
  slug: "ethereum-for-developers",
  title: "Ethereum for Developers",
  price: "0.07",
  image: "https://www.coindeveloperindia.com/blog/wp-content/uploads/2020/10/ethereum-dapp-development-1.jpg",
  previewVideo: "YZi1TzbEfqA",
  level: "Beginner",
  duration: "3 weeks",

  skills: ["Ethereum","Blockchain","Web3"],

  about: {
    description: "Learn how Ethereum works from a developer perspective.",
    learning: [
      "Understand Ethereum architecture",
      "Work with transactions and blocks",
      "Interact with smart contracts"
    ]
  },

  curriculum: [
    {
      title: "Ethereum Basics",
      lessons: [
        "Accounts",
        "Gas",
        "Transactions"
      ]
    }
  ],

  reviews: []
},

{
  id: 5,
  slug: "defi-fundamentals",
  title: "DeFi Fundamentals",
  price: "0.09",
  image: "https://www.blog.bitfinity.network/content/images/2022/07/Fundamental....jpg",
  previewVideo: "17QRFlml4pA",
  level: "Intermediate",
  duration: "4 weeks",

  skills: ["DeFi","Liquidity Pools","Yield Farming"],

  about: {
    description: "Understand decentralized finance protocols and use cases.",
    learning: [
      "Understand DeFi ecosystem",
      "Explore AMMs",
      "Analyze real DeFi protocols"
    ]
  },

  curriculum: [
    {
      title: "DeFi Overview",
      lessons: [
        "What is DeFi",
        "DEX vs CEX"
      ]
    }
  ],

  reviews: []
},

{
  id: 6,
  slug: "blockchain-security",
  title: "Blockchain Security",
  price: "0.1",
  image: "https://img.freepik.com/free-vector/blockchain-technology-is-safe-like-shield-blockchain-security-graphic-illustration-vector_117842-64.jpg",
  previewVideo: "_L83K2e8s4A",
  level: "Advanced",
  duration: "5 weeks",

  skills: ["Security","Smart Contract Auditing"],

  about: {
    description: "Learn common vulnerabilities in blockchain systems.",
    learning: [
      "Identify smart contract vulnerabilities",
      "Understand attack vectors",
      "Apply security best practices"
    ]
  },

  curriculum: [
    {
      title: "Security Basics",
      lessons: [
        "Reentrancy",
        "Overflow",
        "Access Control"
      ]
    }
  ],

  reviews: []
}
];

(async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  await mongoose.connect(mongoUri);
  await Course.deleteMany({});
  await Course.insertMany(seedCourses);
  console.log("✅ Seeded courses:", seedCourses.length);
  await mongoose.disconnect();
})();