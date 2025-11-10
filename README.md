# 🚀 Crypto Market Explorer – Web3 Dashboard

Explore live cryptocurrency market data with a **modern, SaaS-grade Web3 dashboard**, built using **Next.js**, **TypeScript**, **TailwindCSS**, **Ant Design**, and **React Query**.

---

## 🧠 API Chosen

**[CoinGecko Public API](https://www.coingecko.com/en/api/documentation)**  

Endpoints used:
- Market List: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
- Coin Details: `https://api.coingecko.com/api/v3/coins/{id}`  

✅ Provides live market data — prices, changes, market caps, volume, and metadata.  
⚠️ Public API is rate-limited, so React Query handles caching, stale-while-revalidate, and debouncing.

---

## ⚙️ How to Run

### Prerequisites
- Node.js 18+  
- npm or yarn  
- Internet connection (for API)

### Steps
```bash
# 1. Install dependencies
npm install
# or
yarn

# 2. Run development server
npm run dev
# Open: http://localhost:3000

# 3. Build for production
npm run build && npm start

# 4. Run tests
npm test

💡 Assumptions

CoinGecko API is accessible without authentication.

Favorites are stored locally in browser localStorage (no backend).

React Query handles caching, pagination, and network error retries.

Responsive layout works across modern browsers and devices.

Project focuses on UX polish, performance, and production-grade structure.

🎨 Short Design Notes

UI:

Built with Ant Design 5 components + Tailwind utility classes.

Light/Dark themes with glassmorphism accents and gradients.

Enhanced light mode table using subtle shadows and color contrast.

Architecture:

Next.js (Pages Router) for SSR & file-based routing.

Context + useReducer for global favorites state.

Modular structure for scalability and testing.

Performance:

Debounced global search.

Infinite scroll with IntersectionObserver.

Virtualized list via react-window.

Cached API calls via React Query.

Testing:

Jest + React Testing Library.

Sample tests: useFetchCoins.test.tsx, CoinCard.test.tsx.

📦 Folder Structure
src/
  components/
  context/
  hooks/
  pages/
  services/
  styles/
  tests/
  types/


Key Pages

/index.tsx → Dashboard (search, filter, infinite scroll)

/coin/[id].tsx → Coin detail view

/favorites.tsx → Favorites list (localStorage persisted)

🧭 Future Improvements

Real-Time Live Data: Integrate WebSocket-based live price updates and market movements for instant refresh.

Portfolio Management: Allow users to create and track their crypto portfolios with profit/loss analytics and historical trends.

On-Chain Insights: Add blockchain-level metrics (transaction volume, wallet count, gas fees) for deeper analytics.

News & Sentiment Feed: Display trending crypto news, social sentiment, and influencer signals alongside coin data.

Multi-Currency Support: Introduce fiat currency toggles (USD, INR, EUR, GBP) for a global audience.

User Authentication & Cloud Sync: Enable secure login (Firebase/Auth0) to sync favorites and portfolio data across devices.

Web3 Wallet Integration: Connect MetaMask or WalletConnect to fetch wallet balances and token holdings.

Dashboard Personalization: Support custom layouts, widgets, and themes to personalize the analytics view.

Mobile & PWA Support: Make the dashboard installable with push notifications and offline caching for key data.

Performance Monitoring: Add API latency tracking, caching visualization, and usage stats for better system insights.
