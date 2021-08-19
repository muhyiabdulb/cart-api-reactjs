import React, { Component } from 'react'
import './App.css';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      idCart: null,
    }
  }

  // componentDidMount(index){
  //   this.setState({idCart: index})
  // }

  addToCart = (index) => {
    this.setState({idCart: index})
  }
  
  render() {
    console.log("ini idCart" + this.state.idCart)
    return(
      <div className="App">
        <Container fluid className="justify-content-md-center mt-3 mb-3">
          <Row>
            <Col md={5}>
              <Products add={this.addToCart} />
            </Col>
            <Col md={7} >
              <Cart cart={this.state.idCart}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
