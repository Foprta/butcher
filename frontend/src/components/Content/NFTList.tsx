import React, { useContext } from "react";
import classNames from "classnames";
import { CheckCircleFilled } from "@ant-design/icons";
import { NftStoreContext } from "../../stores";
import { observer } from "mobx-react";

export const NFTList: React.FC = observer(() => {
  const nftStore = useContext(NftStoreContext);

  return (
    <div className="flex gap-3">
      {nftStore.nfts?.map((nft) => {
        const metadata = nft.metadata ? JSON.parse(nft.metadata) : undefined;

        const key = nft.token_address + ":" + nft.token_id;

        const className = classNames("relative hover:bg-blue-100 h-48 w-48", {
          "ring-2 ring-green-300": nftStore.selected[key],
        });

        if (metadata.image) {
          if (metadata.image.startsWith("ipfs://")) {
            metadata.image = metadata.image.replace(
              "ipfs://",
              "https://ipfs.io/"
            );
          }

          return (
            <div
              className={className}
              key={key}
              onClick={() => nftStore.toggleSelection(key)}
            >
              {nftStore.selected[key] && (
                <CheckCircleFilled className="absolute text-green-600 top-1 right-1 text-xl" />
              )}

              <img
                className="object-contain h-full w-full"
                src={metadata.image}
                alt={metadata.name}
              />
            </div>
          );
        }

        return (
          <div
            className={className}
            key={key}
            onClick={() => nftStore.toggleSelection(key)}
          >
            No Image Allowed
          </div>
        );
      })}
    </div>
  );
});
