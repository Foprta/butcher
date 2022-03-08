import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Layout, message } from "antd";
import { useMoralis } from "react-moralis";
import { observer } from "mobx-react";
import { NftStoreContext, UserStoreContext } from "../../stores";
import { groupBy } from "lodash-es";
import { ERC721_ABI } from "../../contracts/ERC721";
import { BUTCHER_ABI, BUTCHER_ADDRESS } from "../../contracts/Butcher";

export const Footer: React.FC = observer(() => {
  const { isWeb3Enabled, enableWeb3, web3, Moralis } = useMoralis();
  const nftStore = useContext(NftStoreContext);
  const userStore = useContext(UserStoreContext);
  const [receiver, setReceiver] = useState(
    "0x51A0D39666247200D834FfcdF2eC4BF18271426B"
  );

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  const sendNfts = () => {
    const ethers = Moralis.web3Library;

    const NFTs: Array<{ tokenId: string; contractAddress: string }> =
      Object.entries(nftStore.selected)
        .filter(([, value]) => value)
        .map(([key]) => {
          const [contractAddress, tokenId] = key.split(":");

          return { contractAddress, tokenId };
        });

    Promise.all(
      Object.keys(groupBy(NFTs, "contractAddress")).map((address) => {
        const NFTContract = new ethers.Contract(
          address,
          ERC721_ABI,
          web3!.getSigner()!
        );

        return NFTContract.isApprovedForAll(userStore.address, BUTCHER_ADDRESS)
          .then((approved: boolean) =>
            approved
              ? Promise.resolve()
              : NFTContract.setApprovalForAll(BUTCHER_ADDRESS, true)
          )
          .then((tx: any | undefined) => tx?.wait(1));
      })
    )
      .then(() => {
        const Butcher = new ethers.Contract(
          BUTCHER_ADDRESS,
          BUTCHER_ABI,
          web3!.getSigner()!
        );

        return Butcher.sendNFTs(receiver, NFTs);
      })
      .then((tx) => tx.wait(1))
      .then((tx) =>
        message.success(
          <span>
            Success! Watch{" "}
            <a
              target="_blank"
              href={"https://rinkeby.etherscan.io/tx/" + tx.hash}
            >
              transaction
            </a>
          </span>
        )
      )
      .catch((err) => console.error(err));
  };

  const selectedNumber = Object.values(nftStore.selected).filter(
    Boolean
  ).length;

  return (
    <Layout.Footer>
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-full text-white space-x-4">
        <Input
          placeholder="Receiver address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        <Button
          type="primary"
          onClick={sendNfts}
          disabled={selectedNumber === 0 || !isWeb3Enabled}
        >
          Send {selectedNumber ? selectedNumber : null}
        </Button>
      </div>
    </Layout.Footer>
  );
});
