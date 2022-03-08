import React, { useContext, useEffect } from "react";
import { Layout } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import { NftStoreContext, UserStoreContext } from "../../stores";
import { NFTList } from "./NFTList";
import { observer } from "mobx-react";

export const Content: React.FC = observer(() => {
  const { getNFTBalances } = useNFTBalances();
  const { isAuthenticated } = useMoralis();
  const userStore = useContext(UserStoreContext);
  const nftStore = useContext(NftStoreContext);

  useEffect(() => {
    if (isAuthenticated) {
      getNFTBalances({
        params: { chain: "rinkeby", address: userStore.address! },
      }).then((data) => nftStore.setNfts(data?.result));
    } else {
      nftStore.setNfts(undefined);
    }
  }, [isAuthenticated]);

  return (
    <Layout.Content>
      <div className="max-w-[1280px] mx-auto py-3">
        <NFTList />
      </div>
    </Layout.Content>
  );
});
