import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and MetaMask is running.
  try {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
  } catch (error) {
    console.error("Error requesting accounts:", error.message);
  }
} else {
  // We are on the server *OR* the user is not running MetaMask.
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/0816730807ce471ea107f4ecdf834614"
  );
  web3 = new Web3(provider);
}

export default web3;
// metamask have connection with other node
// infura have they own node
