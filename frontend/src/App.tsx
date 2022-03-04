import React, { useState } from "react";
import "./App.css";
import { Button } from "carbon-components-react";
import { useMoralis, useNFTBalances } from "react-moralis";

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

const App: React.FC = () => {
  const { authenticate, isAuthenticated, account } = useMoralis();
  const { getNFTBalances } = useNFTBalances();

  const [nftBalances, setNftBalances] =
    useState<UnboxPromise<ReturnType<typeof getNFTBalances>>>(undefined);

  const ensureAuth = (): Promise<any> => {
    if (!isAuthenticated) {
      return authenticate();
    }

    return Promise.resolve();
  };

  const getNfts = (): void => {
    ensureAuth()
      .then(() =>
        getNFTBalances({ params: { chain: "rinkeby", address: account! } })
      )
      .then((data) => setNftBalances(data));
  };

  return (
    <div>
      <Button kind="primary" onClick={getNfts}>
        as
      </Button>

      <div className="text-black">
        {nftBalances?.result?.map((nft) => {
          const metadata = nft.metadata ? JSON.parse(nft.metadata) : undefined;

          if (metadata.image) {
            if (metadata.image.startsWith("ipfs://")) {
              metadata.image = metadata.image.replace(
                "ipfs://",
                "https://ipfs.io/"
              );
            }

            return (
              <img
                src={metadata.image}
                alt={metadata.name}
                width={200}
                height={200}
              />
            );
          }

          return <div className="bg-gray-300">No Image Allowed</div>;
        })}
      </div>
    </div>
  );
};

export default App;
