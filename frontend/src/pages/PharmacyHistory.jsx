import React from 'react';
import axios from 'axios';
import { Repository } from '../api/repository';
import {Link, Redirect} from 'react-router-dom';
import { Navbar } from '../components/Navbar'


export class PharmacyHistory extends React.Component {

    repo = new Repository()

    state = {
        pharmacyID: +this.props.match.params.pharmacyID,
        orders: []
    }

    componentDidMount() {
        this.repo.getPharmacyOrderHistory(this.state.pharmacyID)
        .then(x => {
            this.setState({orders: x })
        })
    }


    render() {
            return (
                <>
                <Navbar norender={false}></Navbar>
                <div className="jumbotron" id="header">
                    <h2 id="Name">Order History</h2>
                    <table className="table table-striped table-condensed table-bordered" id="orderDetails">
                        <thead>
                            <tr id="tableHeader">
                                <th>Order ID</th>
                                <th>Ordered By</th>
                                <th>Medication</th>
                                <th>Quantity</th>
                                <th>Total Cost</th>
                                <th>Date Ordered</th>
                            </tr>
                        </thead>
                        <tbody>
                        { !this.state.orders.length && <tr><td>You have no orders yet</td></tr>}
                        { this.state.orders && this.state.orders.map((row, index) => (
                            <tr key={index}>
                                <td id="pharmacy">{row.orderID}</td>
                                <td id="user">{row.userName}</td>
                                <td id="medication">{row.medName}</td>
                                <td id="quantity">{row.quantity}</td>
                                <td id="total">{row.totalCost}.00</td>
                                <td id="quantity">{row.dateOrdered && row.dateOrdered.substring(0, 10)}{!row.dateOrdered && "No date found"}</td>
                            </tr>
                        ))}
                        </tbody>
                        
                    </table>
                    <br></br>
                </div>
                </>
            );
        
        }
        
        
}

export default PharmacyHistory;