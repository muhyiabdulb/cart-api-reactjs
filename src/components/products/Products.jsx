import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col, Image, Figure } from 'react-bootstrap'

const Products = (props) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    async function getListProduct() {
        setLoading(true)
        // await fetch('https://fakestoreapi.com/products')
        //     .then(res=>res.json())
        //     .then(json=>setProducts(json))
        const response = await fetch(`https://fakestoreapi.com/products`)
        const json = await response.json()
        setProducts(json)
        setLoading(false)
    }

    useEffect(() => {
        getListProduct()
    }, [])

    return(
        <div>
            <h2>List Products</h2>
            <Row >
            { 
                // console.log(products)
                loading ? <h3 className="center">Loading ...</h3> : products.map((product) => {
                    return(
                        <Col md={6}>
                            <Figure key={product.id}>
                                <Image src={product.image}  
                                    width={120}
                                    height={120} 
                                    thumbnail/>
                                <Figure.Caption>
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            Rp {product.price}
                                        </Card.Text>
                                        <Card.Text>
                                            {product.category}
                                        </Card.Text>
                                        {/* <Card.Text>
                                            {product.description}
                                        </Card.Text> */}
                                        <Button variant="primary" onClick={() => props.add(product.id)}>Add to Cart</Button>
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

export default Products