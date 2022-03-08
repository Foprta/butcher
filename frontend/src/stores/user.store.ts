import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

export class UserStore {
  @observable address: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  @action setAddress(address: string | undefined): void {
    this.address = address;
  }
}

export const UserStoreContext = createContext<UserStore>(new UserStore());
