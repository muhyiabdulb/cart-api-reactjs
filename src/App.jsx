import './App.css';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [idCart, setIdCart] = useState()

  function addToCart(index) {
    setIdCart(index)
  }

  return (
    <div className="App">
      <Container fluid className="justify-content-md-center mt-3 mb-3">
        <Row>
          <Col md={5}>
            <Products add={addToCart} />
          </Col>
          <Col md={7}>
            <Cart cart={idCart} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
