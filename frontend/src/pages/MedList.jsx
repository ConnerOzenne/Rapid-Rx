import React from 'react';
import {User} from '../models/user'
import './MedList.css';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';
import { MedInfo } from './MedInfo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FullMedSearch } from '../components/FullMedSearch'


export class MedList extends React.Component {

    repository = new Repository();

    constructor(props) {
        super(props);
        this.state = {
            meds: [],
            // username: user.name,
            username: "John Doe",
            authorityLevel: 0
        }
    }

    componentDidMount() {
        let id = localStorage.getItem("userID");
        this.getMeds(id);

        if (this.isLoggedIn()) {
            this.repository.getUserInfo(localStorage.getItem("userID"))
                .then(data => {
                    const res = data.data;
                    console.log("MedList - componentDidMount(): res...")
                    console.log(res);
                    this.setState({username: res.data[0].name, authorityLevel: res.data[0].authorityLevel})
                })
                .catch(err => {
                    console.log("No user info found")
                })
        }
    }


    getMeds = (id) => {
        // debugger;
        this.repository.getUserMedications(id)
        .then(x => {
            console.log("getting prescriptions")
            console.log(x)
            this.setState({meds: x});
        })
    }

    
    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == -1);
        return loggedIn;
    }

    isFlagged = () => {

    }

    checkRefill = (pharmacyID, medicationID) => {
        let d = new Date();

        if(d == d) {
            this.repository.createOrder({userID: localStorage.getItem("userID"), pharmacyID: pharmacyID, dateOrdered: d})
            .then(x => {
                console.log("Test func")
                console.log(x)
                
                // const order = this.state.meds.find( ({element}) => element.medicationID == medicationID);
                // console.log(order)
                // // use find function to grab the specific medication by id from state
                // var orderID = order.orderID;
                // var quantity = order.quantity;
                // var refillDate = order.refillDate;
                // var totalCost = order.totalCost;
                // using index to access specific order?

                
                // this.repository.createOrderDetails({orderID: orderID, medicationID: medicationID, quantity: quantity, refillDate: refillDate, totalCost: totalCost})

                // do i need to change refill date in the table??
                window.alert("Refill placed, pick up in 24 hours at Pharmacy Name");
            })
        }
        else {
            window.alert("Not available for refill until refill date");
        }
    }



    render() {
        if(!this.state.meds) {
            return
            <p>Loading</p>
        }
        return (
            <>
            <Navbar norender={this.props.navbarnorender}></Navbar>
            { !this.isLoggedIn() && <Redirect to={{pathname: '/', state: {message: 'Please sign in to view your prescriptions'}}} /> }
            {/* message does not display */}
            {!this.isLoggedIn() && <div className="alert alert-danger" role="alert">User doesnt exist or wrong password</div> }
            {this.isLoggedIn() && 
                <div className="container" id="header">
                    
                    <h2>Prescriptions</h2>

                    {this.isLoggedIn() && this.state.authorityLevel == 0 ?

                    <table className = "table" id="medtable">
                        <tr className="text-center" id="tableHeader">
                            <th scope= "col">Medication</th>
                            <th scope= "col">Dosage</th>
                            <th scope="col">Pharmacy</th>
                            <th scope="col">Total Cost</th>
                            <th scope= "col">Refill Date</th>
                            <th scope= "col">Refill Rx</th>
                            <th scope= "col">More Information</th>
                        </tr>
                        { this.state.meds.map((med, index) => (
                                <tr id="rows">
                                    <td className="text-center" scope="row" id="medName">{med.medName}</td>
                                    <td className="text-center" scope="row" id="dosage">{med.quantity} mg</td>
                                    <td className="text-center" scope="row" id="pharmacy">{med.pharmacyName}</td>
                                    <td className="text-center" scope="row" id="totalCost">${med.totalCost}</td>
                                    <td className="text-center" scope="row" id="refillDate">{med.refillDate.substring(0,10)}</td>
                                    <td className="text-center" scope="row" id="refillRx">
                                        <button id="btn-refill" className="btn btn-secondary"
                                        onClick={ () => this.checkRefill(med.pharmacyID, med.medicationID) }>
                                            REFILL
                                            </button>
                                    </td>


                                        <td className="text-center" scope="row" id="moreInfo"> <Link id="btn-moreinfo" className="btn btn-secondary" to={"/medinfo/" + med.medicationID}>More Information</Link> </td>

                                        {/* <Router>
     
                                        </Router> */}
                                    
                    

                                    {/* <MedInfo  medicationID={med.medicationID}/> */}
                                </tr>
                            ))
                        }
                    </table>
                    : <FullMedSearch authorityLevel={this.state.authorityLevel}></FullMedSearch>}
                </div>
            }
            </>
        )
    }
}