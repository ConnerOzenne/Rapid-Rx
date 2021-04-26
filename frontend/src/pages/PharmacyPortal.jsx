import React from 'react';
import axios from 'axios';
import { Repository } from '../api/repository';
import { Link, Redirect } from 'react-router-dom';
import { ClosestPharmacies } from '../models/ClosestPharmacies'
import { Navbar } from '../components/Navbar'


export class PharmacyPortal extends React.Component {

    repo = new Repository()

    constructor(props) {
        super(props);
        const id = localStorage.getItem('userID')
        this.state = {
            username: "",
            userID: id,
            orders: [],
            auth: -1
        }
    }

    componentDidMount() {
        if (this.state.userID != -1) {
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
                    var res = x.data
                    console.log("User Orders:", x.data.data)
                    this.setState({ orders: res.data })
                })
        }
        else {
            this.setState({userID: -1})
        }
    }


    render() {
        if (this.state.auth === 0) {
            return (
                <>
                    <Navbar norender={false}></Navbar>
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
                                {!this.state.orders.length && <tr><td>You have no orders yet</td></tr>}
                                {this.state.orders && this.state.orders.map((row, index) => (
                                    <tr key={index}>
                                        <td id="pharmacy">{row.pharmacyName}</td>
                                        <td id="medication">{row.medName}</td>
                                        <td id="quantity">{row.quantity}</td>
                                        <td id="price">{row.price}.00</td>
                                        <td id="date">{row.refillDate.substring(0, 10)}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <br></br>
                        <ClosestPharmacies props={this.state.auth}></ClosestPharmacies>

                    </div>
                </>
            );
        }
        else if (this.state.auth === 1 || this.state.auth === 2) {
            return (
                <>
                    <Navbar norender={false}></Navbar>
                    <div className="Container" id="header">
                        <h2 className="mt-3">View Pharmacies</h2>
                        <ClosestPharmacies auth={this.state.auth}></ClosestPharmacies>
                    </div>
                </>
            )
        }
        else if (this.state.userID === -1) {
            return (
                <>
                    <Navbar norender={false}></Navbar>
                    <ClosestPharmacies auth={0}></ClosestPharmacies>
                </>
            )
        }
        else {
            return (
                <>
                    <Navbar norender={false}></Navbar>
                    <h2>Loading Pharmacy Details</h2>
                </>
            )
        }
    }


}

export default PharmacyPortal;