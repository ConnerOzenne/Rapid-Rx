import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {User} from '../models/user'
import './MedList.css';
import {Repository} from '../api/repository';
<<<<<<< HEAD
import { faFlag as fasFaFlag} from "@fortawesome/free-solid-svg-icons";
import { faFlag as farFaFlag} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasFaFlag, farFaFlag);
=======
>>>>>>> main


export class MedList extends React.Component {

<<<<<<< HEAD
    repository = new Repository();
=======
    repo = new Repository();
>>>>>>> main

    constructor(props) {
        super(props);
        // const {user} = this.props;

        const user = new User(
            1,
            "Betsy",
            312,
            "betsyg",
            "helloworld",
            "betsy@gmail.com",
            2,
            1,
            "361-461-2095",
        )

        this.state = {
<<<<<<< HEAD
            user: user,
=======
            // username: user.name,
            username: "John Doe",
>>>>>>> main
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

        // this.repository.getUserOrders().then( data => {
        //     this.setState()
        // }
        //     )
        
    }

    // componentDidMount() {
    //     let id = +this.props.match.params.userID;
    //     if(id) {
    //         this.repository.getUserOrders(id)
    //         .then(orders => this.setState(orders));
    //     }
    // }

    checkRefill = () => {
        let d = new Date();
        if(this.state.refillDate == d) {
                // make button active
        }
    }


    render() {
        return (

            <div className="Container" id="header">
                
                <h2 id="Name">{this.state.username}'s Prescriptions</h2>
                <table className = "table" id="medtable">
                    <tr className="text-center" id="tableHeader">
                        <th scope= "col">Medication</th>
                        <th scope= "col">Dosage</th>
                        <th scope= "col">Refill Date</th>
                        <th scope= "col">Refill Rx</th>
                        <th scope= "col">Save To Profile</th>
                        <th scope= "col">More Information</th>
                    </tr>
                    <tr>
                        <td className="text-center" scope="row" id="medName">{this.state.medName}</td>
                        <td className="text-center" scope="row" id="dosage">{this.state.dosage}</td>
                        <td className="text-center" scope="row" id="refillDate">{this.state.refillDate}</td>
                        <td className="text-center" scope="row" id="refillRx">
                            <a className="btn btn-secondary" href="#" role="button">REFILL</a>
                        </td>
                        
                        <td className="text-center" scope="row" id="save">
                            <button className="btn btn-secondary" role="button"> <FontAwesomeIcon icon={farFaFlag} /></button>
                        </td>
                        <td className="text-center" scope="row" id="moreInfo">
                            <a className="btn btn-secondary" href="/medinfo" role="button">More Information</a>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}