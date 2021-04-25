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
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
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
            { !this.isLoggedIn() && <Redirect to={{pathname: '/', state: {message: 'Please sign in'}}} /> }
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
                            {/* <th scope= "col">Save To Profile</th> */}
                            <th scope= "col">More Information</th>
                        </tr>
                        { this.state.meds.map((med) => (
                                <tr>
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
                                    
                                    {/* <td className="text-center" scope="row" id="save">
                                        <button className="btn btn-secondary" role="button"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                                            </svg> 
                                        </button>
                                    </td> */}
                                    
                                        {/* <a className="btn btn-secondary" href="/medinfo" role="button">More Information</a> */}

                                        {/* <Link className="btn btn-secondary" to="/medinfo">More Information</Link> </td> */}
                                        
                                        {/* <Router>
                                            
                                            <Route 
                                                path="/medinfo" 
                                                render={(props) => ( }
                                            />
                                        </Router> */}


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