import React, { Component } from 'react'
import { Card, Button, Row, Col, Image, Figure } from 'react-bootstrap'

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
          loading: true
        };
    }
    
    componentDidMount() {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(parsedJSON => parsedJSON)
            .then(products => this.setState({
                products,
                loading: false
            }))
        .catch(error => console.log('parsing failed', error))
    }
    
    render() {
        const { products, loading } = this.state;
        return (
            <div className="boxWhite">
            <h2>List Products</h2>
                <Row>
                    {
                        loading ? <h3 className="center">Loading ...</h3> : products.map(item => {
                        const {id, title, price, category, image} = item;
                        return (
                            <Col md={6} key={id}>
                                <Figure>
                                    <Image src={image}  
                                    width={120}
                                    height={120} 
                                    thumbnail/>
                                    <Figure.Caption>
                                        <Card.Body>
                                            <Card.Title>{title}</Card.Title>
                                            <Card.Text>
                                                Rp {price}
                                            </Card.Text>
                                            <Card.Text>
                                                {category}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => this.props.add(id)}>Add to Cart</Button>
                                        </Card.Body>
                                    </Figure.Caption>
                                </Figure>
                            </Col>
                        )
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default Products