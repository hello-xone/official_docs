import React from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}
const AddNetworkButton = ({ network }) => {
  const addNetwork = async () => {
    if (window.ethereum) {
      try {
        const params = network === "testnet"
          ? {
              chainId: "0x20352b3", // 33772211 转 16 进制
              chainName: "Xone TestNet",
              nativeCurrency: { name: "XOC", symbol: "XOC", decimals: 18 },
              rpcUrls: [
                "https://rpc-testnet.xone.plus",
                "https://rpc-testnet.xone.org",
                "https://rpc-testnet.knight.center",
              ],
              blockExplorerUrls: ["https://testnet.xonescan.com/"],
            }
          : {
              chainId: "0xe89", // 3721 转 16 进制
              chainName: "Xone Mainnet",
              nativeCurrency: { name: "XOC", symbol: "XOC", decimals: 18 },
              rpcUrls: [
                "https://rpc.xone.org",
                "https://rpc-node-1.xone.org",
                "https://rpc-node-2.xone.org",
                "https://rpc-node-3.xone.org",
                "https://rpc-node-4.xone.org",
              ],
              blockExplorerUrls: ["https://xonescan.com/"],
            };

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params],
        });

        alert(`${params.chainName} to add!`);
      } catch (error) {
        console.error("Failed to add network!", error);
        alert("Unable to add network, please check wallet permissions!");
      }
    } else {
      alert("No wallet detected, please install MetaMask!");
    }
  };

  return (
    <button
      className="bg-primaryHue text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
      onClick={addNetwork}
    >
      Add Xone {network === "testnet" ? "Testnet" : "Mainnet"}
    </button>
  );
};

export default AddNetworkButton;
