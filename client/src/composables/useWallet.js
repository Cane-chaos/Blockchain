import { ref } from "vue";

export function useWallet() {
  const account = ref("");
  const chainId = ref("");
  const isConnected = ref(false);
  const error = ref("");

  async function connect() {
    error.value = "";
    if (!window.ethereum) {
      error.value = "MetaMask chưa được cài!";
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      account.value = (accounts?.[0] || "").toLowerCase();
      chainId.value = await window.ethereum.request({ method: "eth_chainId" });
      isConnected.value = !!account.value;
    } catch (e) {
      error.value = e?.message || "Connect failed";
    }
  }

  function disconnect() {
    // MetaMask không hỗ trợ disconnect “thật”, ta chỉ clear state
    account.value = "";
    chainId.value = "";
    isConnected.value = false;
  }

  // Auto update khi user đổi account/network
  if (window.ethereum?.on) {
    window.ethereum.on("accountsChanged", (accs) => {
      account.value = (accs?.[0] || "").toLowerCase();
      isConnected.value = !!account.value;
    });
    window.ethereum.on("chainChanged", (cid) => {
      chainId.value = cid;
    });
  }

  return { account, chainId, isConnected, error, connect, disconnect };
}