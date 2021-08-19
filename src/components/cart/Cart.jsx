import React, { Component } from 'react'
import { Image, Table } from 'react-bootstrap'

class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            cart: [],
            sum: 0,
            pay: null,
            return: 0,
            loading: true,
            validate: false
        }
    }

    componentDidMount() {
        this.getListCart(this.props.cart)
    }

    componentWillReceiveProps(nextProps) {
        let newCart = nextProps.cart
        console.log('ini newCart' + newCart)
        this.getListCart(newCart)
    }

    // udah masuk cart
    async getListCart(newCart) {
        const response = await fetch(`https://fakestoreapi.com/products/${newCart}`)
        const json = await response.json()
        // console.log(json)
        const addCart = {
            id: json.id,
            title: json.title,
            price: json.price,
            description: json.description,
            category: json.category,
            image: json.image,
            qty: 0,
            subTotal: 0,
        }
        // console.log(addCart)
        this.setState({ 
            cart: this.state.cart.concat(addCart),
            loading: false
        })
    }
    
    handleInputQuantity = (event) => {
        const { cart } = this.state
        const value = event.target.value
        console.log('ini qty' + value)

        if(value >= 0) {
            const key = event.target.name
            console.log(key)
            const id = key.replace('qty', '')
            console.log('ini id' + id)
            const objIndex = cart.findIndex((obj => obj.id == id))
            console.log('ini objIndex' + objIndex)
            console.log(cart[objIndex])
            // update qty
            const updateQty = parseFloat(cart[objIndex].qty = value)
            console.log('updateQty' + updateQty)
            const price = parseFloat(cart[objIndex].price)
            console.log('price' + price)
            const subTotal = updateQty * price
            console.log('ini subTotal' + subTotal)
            const total = parseFloat(cart[objIndex].subTotal = subTotal)
            console.log('total' + total)

            var sum = 0
            for(var i = 0; i < cart.length; i++) {
                sum += cart[i].subTotal
            }
            console.log('ini sum' + sum)
            this.setState({
                sum: sum
            })

            if(sum === 0) {
                this.setState({
                    validate: false
                })
            } else if(sum >= 1) {
                this.setState({
                    validate: true
                })
            }

        } else {
            const key = event.target.name
            const id = key.replace('qty', '')
            const objIndex = cart.findIndex((obj => obj.id == id))
            const title = cart[objIndex].title
            console.log('title' + title)
            console.log(title + 'ini qty kurang dari noll')
        }
    }

    handleInputPay = (event) => {
        const { sum } = this.state
        const value = event.target.value
        console.log('ini bayar' + value)
        const pay = parseFloat(value)
        this.setState({
            pay: pay
        })

        if(pay === 0) {
            this.setState({
                returns: 0
            })
        } else if(pay >= 1) {
            const returns = parseFloat(pay - sum)
            console.log('ini kembalian' + returns)
            this.setState({
                returns: returns
            })
        } else {
            this.setState({
                pay: null,
                returns: 0
            })
        }
    }

    render() {
        console.log(this.state.cart)
        const { cart, loading, sum, validate, pay, returns } = this.state
        return(
            <div>
                <h2>Your Cart</h2>
                {
                    loading ? <h3 className="center">Empty Cart</h3> : 
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            cart.map((item, index) => {
                                return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Image src={item.image}  
                                                width={100}
                                                height={100} 
                                                thumbnail/>
                                        </td>
                                        <td>{item.title}</td>
                                        <td>Rp {item.price}</td>
                                        <td>
                                            <input style={{ width: "50px" }} type="number" name={'qty' + item.id} onChange={this.handleInputQuantity} />
                                        </td>
                                        <td>
                                        Rp {item.subTotal}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={5}>Total</th>
                                <th>Rp { sum ?? 0 }</th>
                            </tr>
                            <tr>
                                <th colSpan={5}>Pay</th>
                                <th>
                                    Rp {
                                        validate ? <input name="pay" type="number" value={pay === 0 ? 0 : pay} onChange={this.handleInputPay} /> : 0
                                    } 
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={5}>Return</th>
                                <th>
                                    Rp {pay === 0 ? 0 : returns}
                                </th>
                            </tr>
                        </tfoot>
                    </Table>
                }
            </div>
        )
    }
}

export default Cart
