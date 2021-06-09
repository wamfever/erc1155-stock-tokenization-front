import React, { useState } from 'react';
import { Modal, Image, Button } from 'react-bootstrap';

import MetaMaskConnector from '../integrations/MetaMaskConnector';

function ConnectModal(props) {
  const [connected, setConnected] = useState(false);
  const connectWeb3 = () => {
    MetaMaskConnector.ethEnabled().then((res, err) => {
      if (!err) {
        setConnected(true);
        props.initweb3();
      } else {
        console.log('Metamask request error:', err);
      }
    });
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      backdrop='static'
      className='text-centered'
      centered>
      <Modal.Header>Please Conenct to your Metamask</Modal.Header>
      <Modal.Body className='text-centered'>
        {!connected ? (
          <div className='container-fluid'>
            <Image
              className='center-block'
              src='https://acegif.com/wp-content/uploads/loading-2.gif'
              alt='placeholder'
              fluid
            />
          </div>
        ) : (
          <div className='container-fluid'>
            <Image
              className='center-block'
              src='https://thumbs.gfycat.com/FavorableBoldConey-size_restricted.gif'
              alt='success'
              fluid
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='text-centered'>
        <Button className='btn btn-md btn-danger' onClick={() => connectWeb3()}>
          Connect
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ConnectModal;
