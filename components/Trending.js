import { useState } from "react";
import TrendingCard from "./TrendingCard";
import Rate from "./Rate";
import SwitchButton from "./SwitchButton";

import btc from "../assets/btc.png";
import eth from "../assets/eth.png";
import usdt from "../assets/usdt.png";
import fire from "../assets/fire.png";
import gainers from "../assets/gainers.png";
import recent from "../assets/recent.png";

const coins = [
  {
    icon: btc,
    name: "Bitcoin",
    symbol: "BTC",
    rate: "2.34",
  },
  {
    icon: eth,
    name: "Ethereum",
    symbol: "ETH",
    rate: "9.2",
  },
  {
    icon: usdt,
    name: "Tether",
    symbol: "USDT",
    rate: "5.6",
  },
];

const Trending = () => {
  const [showTrending, setShowTrending] = useState(true);

  return (
    <div className="trending">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div className="title">Todays Cryptocurrency Prices by Market Cap</div>
        <SwitchButton
          checked={showTrending}
          setChecked={() => setShowTrending(!showTrending)}
        />
      </div>
      <div className="description">
        The global crypto market cap is $919.95B, a&nbsp;
        <Rate rate={"1.89"} /> decrease over the last day.
      </div>

      {showTrending && (
        <div className="content">
          <TrendingCard coins={coins} title="Trending" titleIcon={fire} />
          <TrendingCard
            coins={coins}
            title="Biggest Gainers"
            titleIcon={gainers}
          />
          <TrendingCard
            coins={coins}
            title="Recently Added"
            titleIcon={recent}
          />
        </div>
      )}
    </div>
  );
};

export default Trending;
