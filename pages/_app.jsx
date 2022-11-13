import "../styles/globals.css";
import "../styles/header.css";
import "../styles/trending.css";
import "../styles/trending-card.css";
import "../styles/switch-button.css";
import "../styles/ranking.css";
import "../styles/info.css";
import "../styles/chat.css";
import "../styles/chat-card.css";
import "../styles/price.css";

import { CoinMarketProvider } from "../context/context";

// -------------------------------
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});
// -------------------------------

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <CoinMarketProvider>
          <Component {...pageProps} />
        </CoinMarketProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
