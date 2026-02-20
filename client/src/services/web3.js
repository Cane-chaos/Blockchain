import Web3 from "web3";
import marketplaceAbi from "../../blockchain_abi.json"; 
// bạn export ABI từ hardhat/truffle rồi copy sang client

let web3;
let contract;

export async function initWeb3() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const networkId = await web3.eth.net.getId();

  const deployedNetwork = marketplaceAbi.networks[networkId];
  if (!deployedNetwork) {
    throw new Error("Contract not deployed on this network");
  }

  contract = new web3.eth.Contract(
    marketplaceAbi.abi,
    deployedNetwork.address
  );

  return web3;
}

export async function getAccount() {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}

export async function buyCourse(courseId, priceInEth) {
  const account = await getAccount();
  const value = web3.utils.toWei(priceInEth.toString(), "ether");

  return contract.methods.buyCourse(courseId).send({
    from: account,
    value
  });
}

export async function isPurchased(courseId) {
  const account = await getAccount();
  return contract.methods.isPurchased(account, courseId).call();
}