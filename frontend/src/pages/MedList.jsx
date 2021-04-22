import React from 'react';
import {User} from '../models/user'
import './MedList.css';
import {Redirect} from 'react-router-dom';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';


export class MedList extends React.Component {

    repository = new Repository();

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            orders: []
        }
    }

    componentDidMount() {
        let id = localStorage.getItem("userID")
        this.getOrders(id);
        this.getMedicationInfo(id);
    }

    getOrders(id) {
        this.repository.getUserOrders(id)
        .then(orders => {
            console.log(orders);
            this.setState({orders});
            orders.forEach((order, i) => {
                this.repository.getUserOrderDetails(order.orderID)
                .then(orderDetails => {
                    this.repository.getUserMedications(id)
                    .then(medications => {
                        order.quantity = orderDetails[0].quantity;
                        order.refillDate = orderDetails[0].refillDate;
                        order.refillLeft = orderDetails[0].refillLeft;
                        order.name = medications.name;
                        orders[i] = order;
                    })
                    this.setState({orders});
                })
            });
        });
    }

    getMedicationInfo(id) {
        this.repository.getUserMedications(id)
        .then(medications => {
            console.log(orders);
            this.setState({orders});
            orders.forEach((order, i) => {
                this.repository.getUserOrderDetails(order.orderID)
                .then(x => {
                    order.quantity = x[0].quantity;
                    order.refillDate = x[0].refillDate;
                    order.refillLeft = x[0].refillLeft;
                    orders[i] = order;
                    this.setState({orders});
                })

            });
        });
    }
       

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    checkRefill = () => {
        let d = new Date();
        if(this.state.refillDate == d) {
                // make button active
        }
        else {
            // display "not available for refill until {order.refillDate}"
        }
    }


    render() {

        return (
            <>
            <Navbar norender={this.props.navbarnorender}></Navbar>
            {!this.isLoggedIn() && <Redirect to={{pathname: '/', state: {message: 'Please sign in'}}} />}
            {this.isLoggedIn() && 
                <div className="Container" id="header">
                    
                    <h2 id="Name">{this.state.name}'s Prescriptions</h2>
                    <table className = "table" id="medtable">
                        <tr className="text-center" id="tableHeader">
                            <th scope= "col">Medication</th>
                            <th scope= "col">Dosage</th>
                            <th scope= "col">Refill Date</th>
                            <th scope= "col">Refill Rx</th>
                            <th scope= "col">Save To Profile</th>
                            <th scope= "col">More Information</th>
                        </tr>
                        { this.state.orders.map((order) => (
                                <tr>
                                    <td className="text-center" scope="row" id="medName">{order.medName}</td>
                                    <td className="text-center" scope="row" id="dosage">{order.quantity} mg</td>
                                    <td className="text-center" scope="row" id="refillDate">{order.refillDate}</td>
                                    <td className="text-center" scope="row" id="refillRx">
                                        <a className="btn btn-secondary" href="#" role="button">REFILL</a>
                                    </td>
                                    
                                    <td className="text-center" scope="row" id="save">
                                        <button className="btn btn-secondary" role="button"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                                            </svg> 
                                        </button>
                                    </td>
                                    <td className="text-center" scope="row" id="moreInfo">
                                        <a className="btn btn-secondary" href="/medinfo" role="button">More Information</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                }
            </>
        )
    }
}