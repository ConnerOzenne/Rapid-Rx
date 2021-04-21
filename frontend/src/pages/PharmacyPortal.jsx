import React from 'react';
import axios from 'axios';
import { Repository } from '../api/repository';
import {Link, Redirect} from 'react-router-dom';
import { ClosestPharmacies } from '../models/ClosestPharmacies'


export class PharmacyPortal extends React.Component {

    repo = new Repository()

    constructor(props) {
        super(props);
        const id = localStorage.getItem('userID')
        this.state = {
            // username: user.name,
            username: "",
            userID: id,
            orders: [],
            auth: -1
        }
    }

    componentDidMount() {
        this.repo.getUser(this.state)
        .then(x => {
            console.log(x.data.data)
            this.setState({ 
                username: x.data.data[0].name,
                auth: x.data.data[0].authorityLevel
            })
        })
        this.repo.getUserOrders(this.state)
        .then(x => {
            console.log("X:", x)
            var res = x.data
            console.log("X.data:", x.data)
            console.log("X.data.data:", x.data.data)
            this.setState({ orders: res.data })
        })
    }


    render() {
        if (this.state.auth === 0) {
            return (

                <div className="Container" id="header">
                    <h2 id="Name">{this.state.username}'s Orders</h2>
                    <table className="table table-striped table-condensed table-bordered" id="orderDetails">
                        <thead>
                            <tr id="tableHeader">
                                <th>Pharmacy</th>
                                <th>Medication</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        { !this.state.orders.length && <tr>You have no orders yet</tr>}
                        { this.state.orders && this.state.orders.map((row, index) => (
                            <tr key={index}>
                                <td id="pharmacy">{row.name}</td>
                                <td id="medication">{row.medicationID}</td>
                                <td id="quantity">{row.quantity}</td>
                                <td id="price">{row.price}.00</td>
                                <td id="sideEffects">{row.dateOrdered}</td>
                            </tr>
                        ))}
                        </tbody>
                        
                    </table>
                    <br></br>
                <ClosestPharmacies></ClosestPharmacies>

                </div>
            );
        }
        else if (this.state.auth === 1 || this.state.auth === 2) {
            return (
                <>
                <div className="Container" id="header">
                    <h2>Authorized Pharmacist Inventory Portal</h2>
                    <table className="table table-striped table-condensed table-bordered" id="orderDetails">
                        <thead>
                            <tr id="tableHeader">
                                <th>Pharmacy</th>
                                <th>Medication</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        { !this.state.orders.length && <tr>You have no orders yet</tr>}
                        { this.state.orders && this.state.orders.map((row, index) => (
                            <tr key={index}>
                                <td id="pharmacy">{row.name}</td>
                                <td id="medication">{row.medicationID}</td>
                                <td id="quantity">{row.quantity}</td>
                                <td id="price">{row.price}.00</td>
                                <td id="sideEffects">{row.dateOrdered}</td>
                            </tr>
                        ))}
                        </tbody>
                        
                    </table>
                    <br></br>
                <ClosestPharmacies></ClosestPharmacies>

                </div>
                    
                </>
            )
        }
        else {
            return (
                <> 
                    <h2>Loading Pharmacy Details</h2>
                </>
            )
        }
        }
        
        
}

export default PharmacyPortal;