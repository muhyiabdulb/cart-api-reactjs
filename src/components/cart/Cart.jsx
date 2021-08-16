import { Button } from 'bootstrap'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Image, Table } from 'react-bootstrap'

const Cart = (props) => {
    const [carts, setCarts] = useState([])
    const [sum, setSum] = useState(0)
    const [pay, setPay] = useState(0)
    const [returns, setReturns] = useState(0)
    const [validate, setValidate] = useState(false)

    useEffect(() => {        
        async function getListCart() {
            const response = await fetch(`https://fakestoreapi.com/products/${props.cart}`)
            const json = await response.json()
            console.log(json)
            const newCart = {
                id: json.id,
                title: json.title,
                price: json.price,
                description: json.description,
                category: json.category,
                image: json.image,
                qty: 0,
                subTotal: 0,
            }
            setCarts(carts.concat(newCart)) 
        }

        if (props.cart) {
            getListCart()   
        } else {
            console.log('cart kosong')
        }
        
        console.log(carts) 

    }, [props.cart])

    console.log(carts)  

    const handleInputQuantity = (event) => {
        const value = event.target.value
        console.log("ini qty" + value)
        if(value >= 0) {
            const key = event.target.name
            // const item = {key: value}
            // console.log(key)
            const id = key.replace('qty', '')
            console.log("ini id" + id)
            // setCarts(carts[0]['qty'] = 90)
            // console.log(carts[13]['qty'])
            // Find index of specific object using findIndex method.    
            const objIndex = carts.findIndex((obj => obj.id == id));
            console.log(carts[objIndex])
            // Update object's name property.
            const updateQty = parseFloat(carts[objIndex].qty = value) 
            // console.log(updateQty)
            const price = parseFloat(carts[objIndex].price)
            // console.log(price)
            const subTotal = updateQty * price
            console.log("ini subtotal" + subTotal)
            const resultTotal = parseFloat(carts[objIndex].subTotal = subTotal)
            console.log("ini results" + resultTotal)

            var sum = 0
            for (var i = 0; i < carts.length; i++) {
                sum += carts[i].subTotal
            }
            setSum(sum)
            console.log("ini sum" + sum)

            if(sum === 0) {
                setValidate(false)
            } else if(sum > 0) {
                setValidate(true)
            }
            
        } else {
            console.log('qty kosong')
        }
    }

    const handleInputPay = (event) => {
        console.log('ini bayar' + event.target.value)
        const pay = parseFloat(event.target.value)
        setPay(pay)
        if(pay === 0) {
            setReturns(0)
        } else if(pay >= 1) {
            const returns = parseFloat(pay - sum)
            console.log('ini kembalian' + returns)
            setReturns(returns)
        } else {
            setReturns(0)
        }
    }

    return(
        <div>
            <h2>Your Cart</h2>
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
                    carts.map((item, index) => {
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
                                    <input style={{ width: "50px" }} type="number" name={'qty' + item.id} value={item.qty} onChange={handleInputQuantity} />
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
                                validate ? <input name="pay" type="number" onChange={handleInputPay} /> : 0
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
        </div>
    )
}
export default Cart
