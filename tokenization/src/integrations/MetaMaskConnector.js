import Web3 from 'web3';

let web3Connector;

const MetaMaskConnector = {
  ethEnabled: async () => {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      web3Connector = window.web3;
      return true;
    }
    return false;
  },

  getWeb3: () => {
    return web3Connector;
  },
};

export default MetaMaskConnector;
