import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './MedList.css';


export class MedList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.name,
            refillDate: "04/28/21",
            todaysDate: "04/28/21",
            medName: "Ibuprofen",
            dosage: "400mg"
        }
    }


    listMeds = () => {
        // populate table with med information
        // axios.get(`http://${url}:8000//order/${this.props.orderid}/details'`).then((res)=>{
        //     alert(res.data);
        // })
    }

    checkRefill = () => {
        if(this.state.refillDate == this.state.todaysDate) {
                // make button active
        }
    }


    render() {
        return (

            <div className="Container" id="header">
                <nav>
                    <div id="navbar">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="/home">Home</a></li>
                            <li><a href="#">Pharmacy Portal</a></li>
                            <li><a href="/user/:userId">My Account</a></li>
                            <span>
                                <li>You are signed in as {this.state.username}!</li>
                                <li><a href="#">Log Out</a></li>
                            </span>
                        </ul>
                    </div>
                </nav>
                <h2 id="Name">{this.state.username}'s Prescriptions</h2>
                <table id="medtable">
                    <tr id="tableHeader">
                        <th>Medication</th>
                        <th>Dosage</th>
                        <th>Refill Date</th>
                        <th>Refill Rx</th>
                        <th>Side Effects</th>
                        <th>Save To Profile</th>
                        <th>More Information</th>
                    </tr>
                    <tr>
                        <td id="medName">{this.state.medName}</td>
                        <td id="dosage">{this.state.dosage}</td>
                        <td id="refillDate">{this.state.refillDate}</td>
                        <td id="refillRx">
                            <button type="button" className="active">REFILL</button>
                        </td>
                        <td id="sideEffects">
                            <button type="button">Side Effects</button>
                        </td>
                        <td id="save">
                            <input type="checkbox"></input>
                        </td>
                        <td id="moreInfo">
                            <button type="button">More Information</button>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}