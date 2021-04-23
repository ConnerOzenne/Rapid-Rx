import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './MedList.css';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';
import { FullMedSearch } from '../components/FullMedSearch'


export class MedList extends React.Component {

    repo = new Repository();

    constructor(props) {
        super(props);
        const {user} = this.props;
        this.state = {
            // username: user.name,
            username: "John Doe",
            authorityLevel: 0
        }
    }

    // componentWillMount() {
    //     if (localStorage.getItem("userID")) {
    //         console.log(this.repo.getUserInfo(localStorage.getItem("userID")));
    //         this.setState({username: this.repo.getUserInfo(localStorage.getItem("userID")).firstName})
    //     }
    // }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    componentDidMount() {
        console.log("MedList: componentDidMount()")
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(localStorage.getItem("userID"))
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



    listMeds = () => {
        // populate table with med information
        // axios.get(`http://${url}:8000//order/${user.orderID}/details'`).then((res)=>{
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
            <>
            <Navbar></Navbar>
            <div className="m-5" id="header">
                {this.isLoggedIn() && this.state.authorityLevel == 0 ?  <h2 id="Name">{this.state.username}'s Prescriptions</h2> : 
                                                                        <div className="mx-5 my-3 px-5"><h2 id="Name">View All Prescription Medications</h2></div>}
                {this.isLoggedIn() ? <></> : <p className="mx-5 my-3 px-5">Login to view your own prescriptions!</p>}
                {this.isLoggedIn() && this.state.authorityLevel == 0 ? 
                <table className = "table" id="medtable">
                    <tr id="tableHeader">
                        <th scope= "col">Medication</th>
                        <th scope= "col">Dosage</th>
                        <th scope= "col">Refill Date</th>
                        <th scope= "col">Refill Rx</th>
                        <th scope= "col">Side Effects</th>
                        <th scope= "col">Save To Profile</th>
                        <th scope= "col">More Information</th>
                    </tr>
                    <tr>
                        <td scope="row" id="medName">{this.state.medName}</td>
                        <td scope="row" id="dosage">{this.state.dosage}</td>
                        <td scope="row" id="refillDate">{this.state.refillDate}</td>
                        <td scope="row" id="refillRx">
                            <button type="button" className="btn">REFILL</button>
                        </td>
                        <td scope="row" id="sideEffects">
                            <button type="button" className="btn">Side Effects</button>
                        </td>
                        <td scope="row" id="save">
                            <input type="checkbox" className="btn"></input>
                        </td>
                        <td scope="row" id="moreInfo">
                            <button type="button" className="btn">More Information</button>
                        </td>
                    </tr>
                </table>
                : <FullMedSearch authorityLevel={this.state.authorityLevel}></FullMedSearch>
                }
            </div>
            </>
        );
    }
}