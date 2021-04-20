import React from 'react';
import {User} from '../models/user'
import './MedList.css';
import {Repository} from '../api/repository';
import { faFlag as fasFaFlag} from "@fortawesome/free-solid-svg-icons";
import { faFlag as farFaFlag} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasFaFlag, farFaFlag);


export class MedList extends React.Component {

    repository = new Repository();

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
            orders: []
        }
    }

    // componentWillMount() {
    //     if (localStorage.getItem("userID")) {
    //         console.log(this.repo.getUserInfo(localStorage.getItem("userID")));
    //         this.setState({username: this.repo.getUserInfo(localStorage.getItem("userID")).firstName})
    //     }
    // }




    listMeds = () => {
        // populate table with med information

        // this.repository.getUserOrders().then( data => {
        //     this.setState()
        // }
        //     )
        
    }

    componentDidMount() {
        // let id = +this.props.match.params.userID;
        // debugger;
        let id = 2;
            this.repository.getUserOrders(id)
            .then(orders => {
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
        // debugger;

        return (

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
                                    <button className="btn btn-secondary" role="button"> <FontAwesomeIcon icon={farFaFlag} /></button>
                                </td>
                                <td className="text-center" scope="row" id="moreInfo">
                                    <a className="btn btn-secondary" href="/medinfo" role="button">More Information</a>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        );
    }
}