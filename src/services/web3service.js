import contractData from '../contracts/StockFactory';

let web3;
let contract;
let currentAddress;

const Web3Service = {
  isSetUp: () => {
    return web3 && contract && currentAddress;
  },
  setupWeb3: (instance, address) => {
    web3 = instance;
    contract = new web3.eth.Contract(contractData.abi, contractData.address);
    currentAddress = address;
  },

  getWeb3: () => {
    return web3;
  },

  getContract: () => {
    return contract;
  },

  owner: () => {
    return contract.methods.owner().call();
  },

  getBSCBalance: (address) => {
    return contract.methods.balanceOf(address, 0).call();
  },
  getStockId: (ticker) => {
    const _ticker = web3.utils.asciiToHex(ticker);
    return contract.methods.stockId(_ticker).call({
      from: currentAddress,
    });
  },
  getStockBalance: (address, stockId) => {
    return contract.methods.balanceOf(address, stockId).call();
  },
  enlistInvestor: (name) => {
    const _name = web3.utils.asciiToHex(name);
    return contract.methods.enlistInvestor(_name).send({
      from: currentAddress,
    });
  },
  enlistStock: (ticker, name, price, initialShares) => {
    const _ticker = web3.utils.asciiToHex(ticker);
    const _name = web3.utils.asciiToHex(name);
    return contract.methods
      .createStock(_ticker, _name, price, initialShares)
      .send({
        from: currentAddress,
      });
  },
  additionalOffering: (stockId, shares) => {
    return contract.methods.increaseSupply(stockId, shares).send({
      from: currentAddress,
    });
  },
  retireShares: (stockId, shares) => {
    return contract.methods.decreaseSupply(stockId, shares).send({
      from: currentAddress,
    });
  },
};

export default Web3Service;
