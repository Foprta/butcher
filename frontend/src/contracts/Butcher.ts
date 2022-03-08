export const BUTCHER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct Butcher.NFTEntity[]",
        name: "_tokens",
        type: "tuple[]",
      },
    ],
    name: "sendNFTs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const BUTCHER_ADDRESS = "0xf22dFC433e634E40D1decbBF8d0ca49C7A64d703";
