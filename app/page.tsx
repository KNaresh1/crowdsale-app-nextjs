"use client";

import { Button } from "@radix-ui/themes";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import Crowdsale from "./Crowdsale";
import Spinner from "./components/Spinner";
import useConnectStore from "./store";

const Home = () => {
  const { connector, hooks } = useWeb3React();
  const { useSelectedAccount } = hooks;
  const account = useSelectedAccount(connector);

  let connectStatus = useConnectStore((s) => s.connectStatus);
  const setConnectStatus = useConnectStore((s) => s.setConnectStatus);

  useEffect(() => {
    if (connectStatus === "Connecting") {
      connectWallet();
    }
  }, [connectStatus]);

  const connectWallet = async () => {
    const chainId = "31337";
    try {
      await connector.activate(chainId);
      setConnectStatus("Connected");
    } catch (error) {
      setConnectStatus("Not Connected");
      console.log("Failed to connect to wallet or User rejected", error);
    }
  };

  return (
    <div>
      <div className="text-center py-5 space-y-4">
        <p className="text-4xl mb-2">Introducing DApp Token!</p>

        {connectStatus === "Connecting" && <Spinner />}

        {(connectStatus === "Not Connected" ||
          (connectStatus !== "Connecting" && !account)) && (
          <Button
            className="space-y-8"
            onClick={() => setConnectStatus("Connecting")}
          >
            Connect To Wallet
          </Button>
        )}
      </div>

      {connectStatus === "Connected" && account && (
        <Crowdsale account={account} />
      )}
    </div>
  );
};

export default Home;
