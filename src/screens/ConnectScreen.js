import React, { useState } from 'react';

import StockForm from '../components/StockForm';
import ConnectModal from '../components/ConnectModal';
import StockList from '../components/StockList';
import { Button, Container, Row } from 'react-bootstrap';

const ConnectScreen = (props) => {
  const [stocks, setStocks] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connectModal, setConnectModal] = useState(false);

  const openModal = () => {
    setConnectModal(true);
  };

  const closeModal = () => {
    setConnectModal(false);
  };

  const initWeb3Interface = () => {
    setTimeout(() => {
      props.enlistInvestor();
      setConnected(true);
      closeModal();
    }, 2000);
  };
  const handleStockSubmission = async (name, ticker, price, initialShares) => {
    const stock = {
      name: name,
      ticker: ticker,
      price: parseInt(price),
      initialShares: parseInt(initialShares),
    };
    await props.formSubmitted(stock);
    const newStocks = [...stocks];
    newStocks.push(stock);

    setStocks(newStocks);
  };

  const handleNewOffering = (ticker) => {
    const shares = prompt('Please specify the amount of new shares offered', 0);
    if (shares && shares !== '') {
      const shareValue = parseInt(shares);
      props.newOffering(ticker, shareValue);

      const stock = { ...stocks.find((stock) => stock.ticker === ticker) };
      const newStocks = [
        ...stocks.filter((security) => ticker !== security.ticker),
      ];

      stock.initialShares += shareValue;
      newStocks.push(stock);
      setStocks(newStocks);
    }
  };

  const handleStockBuyback = (ticker) => {
    const shares = prompt('Please specify the amount of share to retire', 0);
    if (shares && shares !== '') {
      const shareValue = parseInt(shares);
      props.newRetiring(ticker, shareValue);

      const newStocks = [
        ...stocks.filter((security) => ticker !== security.ticker),
      ];

      const stock = { ...stocks.find((stock) => stock.ticker === ticker) };
      stock.initialShares -= shareValue;
      newStocks.push(stock);
      setStocks(newStocks);
    }
  };

  return (
    <div className='absolute-center'>
      <div className={connected ? 'bg-image' : 'bg-image-gray'}>
        {connectModal ? (
          <ConnectModal
            show={connectModal}
            onHide={() => closeModal()}
            initweb3={initWeb3Interface}
          />
        ) : (
          <br />
        )}
        {connected ? (
          <Container className='container-fluid'>
            <Row>
              <Container className='col-lg-6 d-flex justify-content-lg-left justify-content-center'>
                <StockForm onSubmit={handleStockSubmission} />
              </Container>
              <Container className='col-lg-6 d-flex justify-content-lg-right'>
                <StockList
                  stocks={stocks}
                  handleNewOffering={handleNewOffering}
                  handleStockBuyback={handleStockBuyback}
                />
              </Container>
            </Row>
          </Container>
        ) : (
          <Button
            className='btn btn-lg btn-danger text-center'
            onClick={() => openModal()}>
            {' '}
            Connect Your MetaMask!
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectScreen;
