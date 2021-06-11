import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ConnectScreen from './screens/ConnectScreen';
import Web3Service from './services/web3service';
import MetaMaskConnector from './integrations/MetaMaskConnector';
import generateName from './services/nameGenerator';

function App() {
  const enlistInvestor = () => {
    if (!Web3Service.isSetUp()) {
      Web3Service.setupWeb3(
        MetaMaskConnector.getWeb3(),
        window.ethereum.selectedAddress
      );
    }
    const name = generateName();
    Web3Service.enlistInvestor(name).then((res, err) => {
      if (!err) {
        alert(`Happy tokenizing, ${name}!`);
      } else {
        console.log(err);
      }
    });
  };
  const formSubmitted = (stock) => {
    if (!Web3Service.isSetUp()) {
      Web3Service.setupWeb3(
        MetaMaskConnector.getWeb3(),
        window.ethereum.selectedAddress
      );
    }
    Web3Service.enlistStock(
      stock.ticker,
      stock.name,
      stock.price,
      stock.initialShares
    ).then((res, err) => {
      if (!err) {
        return res;
      }
    });
  };
  const newOffering = (ticker, shareValue) => {
    Web3Service.getStockId(ticker).then((res, err) => {
      if (!err) {
        Web3Service.additionalOffering(res, shareValue).then((res, err) => {
          if (!err) {
            console.log(res);
          } else {
            console.log(err);
          }
        });
      }
    });
  };

  const newRetiring = (ticker, shareValue) => {
    Web3Service.getStockId(ticker).then((res, err) => {
      if (!err) {
        Web3Service.retireShares(res, shareValue).then((res, err) => {
          if (!err) {
            console.log(res);
          } else {
            console.log(err);
          }
        });
      }
    });
  };
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <ConnectScreen
              formSubmitted={formSubmitted}
              enlistInvestor={enlistInvestor}
              newOffering={newOffering}
              newRetiring={newRetiring}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
