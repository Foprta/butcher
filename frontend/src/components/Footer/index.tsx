import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { useMoralis } from "react-moralis";
import { observer } from "mobx-react";
import { NftStoreContext } from "../../stores";

export const Footer: React.FC = observer(() => {
  const { enableWeb3 } = useMoralis();
  const nftStore = useContext(NftStoreContext);

  const sendNfts = () => {
    enableWeb3().then((web3) => {
      const nftIds = Object.entries(nftStore.selected)
        .filter(([, value]) => value)
        .map(([key]) => key);

      console.log(nftIds);
    });
  };

  return (
    <Layout.Footer>
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-full text-white">
        <Button type="primary" onClick={sendNfts}>
          Send
        </Button>
      </div>
    </Layout.Footer>
  );
});
