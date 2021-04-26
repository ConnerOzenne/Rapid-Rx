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


    checkRefill = (med) => {
        let d = new Date();
        // let d = "2021-05-24T20:59:01.000Z";

        if(d == med.refillDate) {
            // assuming that a medication will be available for refill one month after refilling
            this.repository.createOrderAndOrderDetails({userID: localStorage.getItem("userID"), pharmacyID: med.pharmacyID, medicationID: med.medicationID, quantity: med.quantity, monthsTillRefill: 1, refillLeft: med.refillLeft})
            .then(x => {
                console.log("Test func")

                window.alert(`Refill placed, pick up in 24 hours at ${med.pharmacyName}`);
            })
        }
        else {
            window.alert(`Not available for refill until ${med.refillDate.substring(0,10)}`);
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
            {!this.isLoggedIn() && <div className="alert alert-danger" role="alert">Please sign in to view your prescriptions</div> }
            {this.isLoggedIn() && 
                <div className="container" id="header">
                    
                    <h2>Prescriptions</h2>

                    {this.isLoggedIn() && this.state.authorityLevel == 0 ?

                    <table className = "table table-striped" id="medtable">
                        <thead>
                            <tr className="text-center" id="tableHeader">
                                <th scope= "col">Medication</th>
                                <th scope= "col">Dosage</th>
                                <th scope="col">Pharmacy</th>
                                <th scope="col">Total Cost</th>
                                <th scope= "col">Refill Date</th>
                                <th scope= "col">Refill Rx</th>
                                <th scope= "col">More Information</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.meds.map((med) => (
                                <tr id="rows">
                                    <td className="text-center" scope="row" id="medName">{med.medName}</td>
                                    <td className="text-center" scope="row" id="dosage">{med.quantity} mg</td>
                                    <td className="text-center" scope="row" id="pharmacy">{med.pharmacyName}</td>
                                    <td className="text-center" scope="row" id="totalCost">${med.totalCost}</td>
                                    <td className="text-center" scope="row" id="refillDate">{med.refillDate && med.refillDate.substring(0, 10)}</td>
                                    <td className="text-center" scope="row" id="refillRx">
                                        <button className="btn btn-success"
                                        onClick={ () => this.checkRefill(med) }>
                                            REFILL
                                            </button>
                                    </td>
                                    <td className="text-center" scope="row" id="moreInfo"> <Link className="btn btn-info" to={"/medinfo/" + med.medicationID}>More Information</Link> </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    : <FullMedSearch authorityLevel={this.state.authorityLevel}></FullMedSearch>}
                </div>
            }
            </>
        )
    }
}