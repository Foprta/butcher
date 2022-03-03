import React from 'react';
import './App.css';
import {useMetaMask} from "metamask-react";

function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  console.log(ethereum)

  return (
    <div className="App">

    </div>
  );
}

export default App;
