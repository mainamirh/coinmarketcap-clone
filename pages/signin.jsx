import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";

function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (tag = "") => {
    if (isConnected) {
      await disconnectAsync();
    }

    let account,
      chain = "";

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
      push(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={() => handleAuth("metamask")}>
        Authenticate via Metamask
      </button>
      <button onClick={() => handleAuth("connectWallet")}>
        Authenticate via Connect Wallet
      </button>
    </div>
  );
}

export default SignIn;
