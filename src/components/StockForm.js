import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const StockForm = (props) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState(0);
  const [initialFloat, setInitialFloat] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(name, ticker, price, initialFloat);
  };
  return (
    <Container className='row d-flex'>
      <Row>
        <Col lg='12'>
          <Form>
            <Form.Label className='h4 text-center py-4'>
              Tokenize your stock!
            </Form.Label>
            <div className='grey-text'>
              <Form.Group size='lg' controlId='name'>
                <Form.Label className='text-light bg-dark-gray'>
                  Stock name
                </Form.Label>
                <Form.Control
                  placeholder='Stock name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size='lg' controlId='ticker'>
                <Form.Label className='text-light bg-dark-gray'>
                  Ticker symbol
                </Form.Label>
                <Form.Control
                  placeholder='Ticker'
                  type='text'
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                />
              </Form.Group>
              <Form.Group size='lg' controlId='price'>
                <Form.Label className='text-light bg-dark-gray'>
                  Price in BSC
                </Form.Label>
                <Form.Control
                  placeholder='Price'
                  type='text'
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </Form.Group>
              <Form.Group size='lg' controlId='float'>
                <Form.Label className='text-light bg-dark-gray'>
                  Initial float
                </Form.Label>
                <Form.Control
                  placeholder='Initial Float'
                  group
                  value={initialFloat}
                  onChange={(e) => setInitialFloat(parseInt(e.target.value))}
                />
              </Form.Group>
            </div>
            <div className='text-center py-4 mt-3'>
              <Button type='submit' onClick={(e) => handleSubmit(e)}>
                Enlist!
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StockForm;
