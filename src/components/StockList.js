import React from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const StockList = (props) => {
  const newOffering = (ticker) => {
    props.handleNewOffering(ticker);
  };

  const newRetiring = (ticker) => {
    props.handleStockBuyback(ticker);
  };

  const fillItems = () => {
    if (props.stocks && props.stocks.length > 0) {
      return props.stocks.map((stock) => (
        <ListGroup.Item action eventKey={stock.ticker}>
          {`Ticker: ${stock.ticker}, price: ${stock.price}, shares: ${stock.initialShares} `}
          <Button
            value={stock.ticker}
            className='btn btn-info ml-auto p-2'
            onClick={(e) => newOffering(stock.ticker)}>
            ➕
          </Button>
          &nbsp;
          <Button
            value={stock.ticker}
            className='btn btn-warning ml-auto p-2'
            onClick={(e) => newRetiring(stock.ticker)}>
            ❌
          </Button>
        </ListGroup.Item>
      ));
    } else {
      return (
        <ListGroup.Item>You haven't listed any stocks yet!</ListGroup.Item>
      );
    }
  };
  return <ListGroup>{fillItems()}</ListGroup>;
};

export default StockList;
