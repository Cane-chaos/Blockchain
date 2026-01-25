import { ethers } from "ethers";

export async function connectWallet() {
  // 1. Check MetaMask
  if (!window.ethereum) {
    alert("MetaMask chưa được cài");
    return null;
  }

  try {
    // 2. Request account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = accounts[0];

    // 3. Check chain ID
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    const expectedChainId =
      "0x" + Number(import.meta.env.VITE_CHAIN_ID).toString(16);

    if (currentChainId !== expectedChainId) {
      alert("Sai network, vui lòng chuyển sang Ganache");
      return null;
    }

    console.log("Connected account:", account);
    return account;
  } catch (err) {
    console.error("User rejected or error:", err);
    return null;
  }
}
