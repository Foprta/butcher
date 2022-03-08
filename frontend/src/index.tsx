import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import {
  NftStore,
  NftStoreContext,
  UserStore,
  UserStoreContext,
} from "./stores";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="imWb3a8t97861USrezy2ciZqLv7QbqaTaCaUfY76"
      serverUrl="https://wxuvvovjmhxs.usemoralis.com:2053/server"
    >
      <NftStoreContext.Provider value={new NftStore()}>
        <UserStoreContext.Provider value={new UserStore()}>
          <App />
        </UserStoreContext.Provider>
      </NftStoreContext.Provider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
