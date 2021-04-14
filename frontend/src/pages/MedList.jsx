import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './MedList.css';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';


export class MedList extends React.Component {

    repo = new Repository();

    constructor(props) {
        super(props);
        const {user} = this.props;
        this.state = {
            // username: user.name,
            username: "John Doe",
        }
    }

    componentWillMount() {
        if (localStorage.getItem("userID")) {
            console.log(this.repo.getUserInfo(localStorage.getItem("userID")));
            this.setState({username: this.repo.getUserInfo(localStorage.getItem("userID")).firstName})
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
            <div className="Container" id="header">
                <h2 id="Name">{this.state.username}'s Prescriptions</h2>
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
            </div>
            </>
        );
    }
}