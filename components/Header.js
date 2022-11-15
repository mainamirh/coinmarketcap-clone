import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SearchIcon from "../assets/svg/search";
import Guest from "../assets/svg/guest";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { signIn, signOut } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";

const Header = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();

  const modal = useRef();

  // Prevent React Hydration Error
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    window.onclick = function (event) {
      if (event.target == modal.current) {
        modal.current.style.display = "none";
      }
    };

    return () => {
      window.onclick = null;
    };
  }, []);

  const shortenAddress = (str) => {
    return str.substring(0, 5) + "..." + str.substring(str.length - 4);
  };

  const handleAuth = async (tag = "") => {
    console.log("vercel url: ", process.env.NEXT_PUBLIC_VERCEL_URL);
    if (isConnected) {
      await disconnectAsync();
    }

    let account,
      chain = "";

    try {
      if (tag == "metamask") {
        ({ account, chain } = await connectAsync({
          connector: new MetaMaskConnector(),
        }));
      } else if (tag == "connectWallet") {
        ({ account, chain } = await connectAsync({
          connector: new WalletConnectConnector({
            options: {
              qrcode: true,
            },
          }),
        }));
      }
    } catch (error) {
      console.log(error.message);
      return;
    }

    const userData = { address: account, chain: chain.id, network: "evm" };

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });

    const message = data.message;

    // Catch error if user denied message signature.
    try {
      const signature = await signMessageAsync({ message });
      // redirect user after success authentication to '/user' page
      const { url } = await signIn("credentials", {
        message,
        signature,
        redirect: false,
        // callbackUrl: "/user",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="header">
      <div className="coinmarketcap-logo">
        <Image
          priority="preload"
          alt="icon"
          src="/coinmarketcap.svg"
          width={190}
          height={190}
        />
      </div>

      <div className="nav">
        <div className="navItem">Cryptocurrencies</div>
        <div className="navItem">Exchanges</div>
        <div className="navItem">NFT</div>
        <div className="navItem">Cryptown</div>
        <div className="navItem">Portfolio</div>
        <div className="navItem">Watchlist</div>
        <div className="navItem">Products</div>
        <div className="navItem">Learn</div>
      </div>

      <div className="right-section">
        {isConnected && currentUser ? (
          <div onClick={() => signOut()} className="shown-address">
            <Guest />
            <div style={{ display: "flex", alignItems: "center" }}>
              {shortenAddress(currentUser.address)}
            </div>
          </div>
        ) : (
          <button
            onClick={() => (modal.current.style.display = "flex")}
            className="connect-wallet"
          >
            Connect Wallet
          </button>
        )}
        <div ref={modal} className="connect-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div>Connect a wallet</div>
              <div
                onClick={() => (modal.current.style.display = "none")}
                className="close-modal"
              >
                &times;
              </div>
            </div>

            <div className="connect-options">
              <div onClick={() => handleAuth("metamask")} className="metamask">
                <Image
                  src={
                    "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreies74clpwa2jslad2ehkxqk6hn7z2tsoxhpg3g6lxtrx2ycmthhn4.ipfs.nftstorage.link/"
                  }
                  alt="metamask"
                  width={30}
                  height={30}
                />
                <div style={{ marginLeft: "10px" }}>Metamask</div>
              </div>
              <div
                onClick={() => handleAuth("connectWallet")}
                className="walletConnect"
              >
                <Image
                  src={
                    "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreifuvwajsm2dafjrhkafl3xia4outp6jxvsunuwzhxj6dajd3lnauu.ipfs.nftstorage.link"
                  }
                  alt="walletConnect"
                  width={30}
                  height={30}
                />
                <div style={{ marginLeft: "10px" }}>WalletConnect</div>
              </div>
            </div>
          </div>
        </div>
        <div className="search-bar">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  );
};

export default Header;
