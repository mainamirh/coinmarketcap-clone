import { useContext, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import topTenFake from "./topTenFake.json";
import Rate from "./Rate";

//https://www.jsonkeeper.com/b/FDNJ

import btc from "../assets/btc.png";
import eth from "../assets/eth.png";
import usdt from "../assets/usdt.png";
import usdc from "../assets/usdc.png";
import bnb from "../assets/bnb.png";
import xrp from "../assets/xrp.png";
import busd from "../assets/diamond.png";
import cardano from "../assets/cardano.png";
import solana from "../assets/solana.png";
import doge from "../assets/shiba.png";

const coinIcons = [btc, eth, usdt, usdc, bnb, xrp, busd, cardano, solana, doge];
const coinCharts = [
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1027.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1839.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/4687.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2010.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2010.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/74.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5994.svg",
];

import { CoinMarketContext } from "../context/context";

import Image from "next/image";
import Info from "../assets/svg/info";
import Star from "../assets/svg/star";

const Ranking = () => {
  const { getTopTenCoins } = useContext(CoinMarketContext);
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    setCoinData(topTenFake.data);
  }, []);

  // const setData = useCallback(async () => {
  //   try {
  //     let res = await getTopTenCoins();
  //     let filteredRes = [];

  //     for (let i = 0; i < 10; i++) {
  //       filteredRes.push(res[i]);
  //     }

  //     setCoinData(filteredRes);
  //     console.log(filteredRes);

  //     return true;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [getTopTenCoins]);

  const roundNumber = (number) => {
    let roundNumber;
    roundNumber = Number(number).toFixed(2);

    if (String(roundNumber).length > 10) {
      roundNumber = Number(number).toFixed(0);
    }

    roundNumber = String(roundNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Thousands Separator
    return roundNumber;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>&nbsp;</th>
            <th style={{ textAlign: "center", paddingRight: "16px" }}>&#35;</th>
            <th style={{ textAlign: "start" }}>Name</th>
            <th>Price</th>
            <th>1h &#37;</th>
            <th>24h &#37;</th>
            <th>7d &#37;</th>
            <th>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "5px" }}>Market Cap</span>
                <Info />
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "5px" }}>Volume&#40;24h&#41;</span>
                <Info />
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "5px" }}>Circulating Supply</span>
                <Info />
              </div>
            </th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coinData
            ? coinData.map((coin, index) => {
                return (
                  <tr className="table-row" key={index}>
                    <td style={{ textAlign: "center", paddingRight: "8px" }}>
                      <Star />
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingRight: "20px",
                        color: "#a1a7bb",
                      }}
                    >
                      {coin.cmc_rank}
                    </td>
                    <td>
                      <Link
                        href={{
                          pathname: "currencies/Info",
                          query: {
                            symbol: coin.symbol,
                            coin: coin.name,
                            price: roundNumber(coin.quote.USD.price),
                            coinIcon: index,
                          },
                        }}
                        target="_blank"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          width: "max-content",
                        }}
                      >
                        <Image
                          alt=""
                          src={coinIcons[index]}
                          width={19}
                          height={19}
                        />
                        &nbsp;&nbsp;
                        <span>
                          {coin.name}&nbsp;{coin.symbol}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={{
                          pathname: "currencies/Price",
                          query: {
                            symbol: coin.symbol,
                            coin: coin.name,
                            price: roundNumber(coin.quote.USD.price),
                          },
                        }}
                        target="_blank"
                        style={{ cursor: "pointer", display: "inline-flex" }}
                      >
                        &#36;{roundNumber(coin.quote.USD.price)}
                      </Link>
                    </td>
                    <td>
                      <Rate
                        rate={roundNumber(coin.quote.USD.percent_change_1h)}
                      />
                    </td>
                    <td>
                      <Rate
                        rate={roundNumber(coin.quote.USD.percent_change_24h)}
                      />
                    </td>
                    <td>
                      <Rate
                        rate={roundNumber(coin.quote.USD.percent_change_7d)}
                      />
                    </td>
                    <td>&#36;{roundNumber(coin.quote.USD.market_cap)}</td>
                    <td>&#36;{roundNumber(coin.quote.USD.volume_24h)}</td>
                    <td>{roundNumber(coin.circulating_supply)}</td>
                    <td>
                      <Image
                        alt=""
                        src={coinCharts[coin.cmc_rank]}
                        width={164}
                        height={53}
                      />
                    </td>
                  </tr>
                );
              })
            : undefined}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
