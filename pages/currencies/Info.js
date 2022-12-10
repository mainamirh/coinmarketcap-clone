import { useState, useEffect } from "react";
import Image from "next/image";

import Header from "../../components/Header";
import Graph from "../../components/Graph";
import Chat from "../../components/Chat";

import btc from "../../assets/btc.png";
import eth from "../../assets/eth.png";
import usdt from "../../assets/usdt.png";
import usdc from "../../assets/usdc.png";
import bnb from "../../assets/bnb.png";
import xrp from "../../assets/xrp.png";
import busd from "../../assets/diamond.png";
import cardano from "../../assets/cardano.png";
import solana from "../../assets/solana.png";
import doge from "../../assets/shiba.png";

import { getSession } from "next-auth/react";

const coinIcons = [btc, eth, usdt, usdc, bnb, xrp, busd, cardano, solana, doge];

import converter from "../../assets/converter.png";
import Usd from "../../assets/svg/usd";

const Info = ({ user }) => {
  const [coinInfo, setCoinInfo] = useState({
    symbol: "",
    coin: "",
    price: "",
    coinIcon: "",
  });

  const getCoinInfo = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setCoinInfo({
      symbol: urlParams.get("symbol"),
      coin: urlParams.get("coin"),
      price: urlParams.get("price"),
      coinIcon: urlParams.get("coinIcon"),
    });
  };

  useEffect(() => {
    getCoinInfo();
  }, []);

  return (
    <div>
      <Header user={user} />
      <div
        style={{
          background: "linear-gradient(to bottom, #212430, #17171a)",
        }}
      >
        <main className="info-container">
          <div className="statistic">
            <div className="tab-container">
              <div className="tab-1">
                <p className="tabItem tabActive">Price</p>
                <p className="tabItem">Market Cap</p>
                <p className="tabItem">Trading View</p>
                <p className="tabItem">History</p>
              </div>
              <div className="tab-2">
                <p className="tabItem tabActive">1D</p>
                <p className="tabItem">2D</p>
                <p className="tabItem">1M</p>
                <p className="tabItem">3M</p>
                <p className="tabItem">1Y</p>
                <p className="tabItem">YTD</p>
                <p className="tabItem">ALL</p>
                <p className="tabItem">LOG</p>
              </div>
            </div>
            <div>
              <Graph />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <div className="filter">
                  <div className="coin-to-usd">
                    USD
                    <input style={{ outline: "none" }} type="checkbox" />
                  </div>

                  <div className="coin-to-btc">
                    BTC
                    <input type="checkbox" />
                  </div>
                </div>

                <div className="more-data">
                  <p>
                    Want more data?{" "}
                    <span style={{ color: "#5680fd" }}>Check out our API</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="converter-container">
              <p>{coinInfo.coin} to USD Converter</p>
              <div className="convert-details">
                <div className="left">
                  {coinInfo.coinIcon && (
                    <Image
                      alt=""
                      src={coinIcons[coinInfo.coinIcon]}
                      width={40}
                      height={40}
                    />
                  )}
                  <div style={{ marginLeft: "10px" }}>
                    <p>{coinInfo.symbol}</p>
                    <p>{coinInfo.coin}</p>
                  </div>
                </div>
                <div className="middle">
                  <p>1</p>
                  <Image alt="" src={converter} width={40} height={40} />
                  <Usd />
                  <div>
                    <p>{coinInfo.symbol}</p>
                    <p>United States Dollars</p>
                  </div>
                </div>
                <p>{coinInfo.price}</p>
              </div>
              <button className="convert-button">Convert</button>
            </div>
          </div>
          <div className="chat">
            <Chat symbol={coinInfo.symbol} name={coinInfo.coin} />
          </div>
        </main>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const user = session ? session.user : null;

  return {
    props: { user: user },
  };
}

export default Info;
