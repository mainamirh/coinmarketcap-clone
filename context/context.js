import { createContext, useState, useEffect } from "react";
import Moralis from "moralis";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";

import {
  dogeAddress,
  linkAddress,
  usdcAddress,
  dogeAbi,
  linkAbi,
  usdcAbi,
} from "../lib/contracts/constants";

export const CoinMarketContext = createContext();

export const CoinMarketProvider = ({ children }) => {
  const { isConnected, address } = useAccount();

  // const {isAuthenticated, user, Moralis} from useMoralis()
  // useMoralisQuery

  const [buyCryptoModal, setBuyCryptoModal] = useState(false);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");

  const getFromAddress = () => {
    if (fromToken === "Doge") return dogeAddress;
    if (fromToken === "Link") return linkAddress;
    if (fromToken === "Usdc") return usdcAddress;
  };

  const getToAddress = () => {
    if (toToken === "Doge") return dogeAddress;
    if (toToken === "Link") return linkAddress;
    if (toToken === "Usdc") return usdcAddress;
  };

  const mint = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTopTenCoins = async () => {
    try {
      const res = await fetch("/api/getTopTen");
      const data = await res.json();
      return data.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CoinMarketContext.Provider value={{ getTopTenCoins }}>
      {children}
    </CoinMarketContext.Provider>
  );
};
