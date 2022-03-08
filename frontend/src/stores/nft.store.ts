import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";
import { NFT } from "../models";

export class NftStore {
  @observable nfts: NFT[] | undefined = undefined;
  @observable selected: Record<string, boolean> = {};

  constructor() {
    makeAutoObservable(this);
  }

  @action setNfts(nfts: NFT[] | undefined): void {
    this.nfts = nfts;
  }

  @action toggleSelection(nftId: string): void {
    this.selected[nftId] = !this.selected[nftId];
  }
}

export const NftStoreContext = createContext<NftStore>(new NftStore());
