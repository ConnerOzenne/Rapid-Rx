import React, { Component } from 'react';
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Repository } from '../api/repository';
import './Appointments.css'

export class Appointments extends React.Component{

    repo = new Repository();

    state = {
        users: [],
        appointments: []
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    componentDidMount() {

        this.repo.getUsers()
        .then(data => {
            const res = data.data;
            console.log("getUsers, data...")
            console.log(data);
            this.setState({users: res})
            console.log(this.state);
        });

        if (this.isLoggedIn()) { 
            this.repo.getAppointmentsForCustomer(localStorage.getItem("userID"))
            .then (data => {
                const res = data.data;
                this.setState({appointments: res});
                
                console.log("appointments:")
                console.log(this.state.appointments);
            });
        }
    }

    getPharmacyWorkers() {
        let pharmacyWorkers = []

        if (this.state.users.length > 0) {
            this.state.users.forEach(user => user.authorityLevel > 0 && pharmacyWorkers.push(user));
        }

        console.log(pharmacyWorkers)
        return pharmacyWorkers;
    }

    // getPharmacyName = pharmacyID => {

    //     this.repo.getPharmacyInfo(pharmacyID)
    //     .then (data => {
    //         const res = data.data;
    //         return res.data[0].name;
    //     })
    // }

    render() {
        return (
            <>
                <Navbar></Navbar>
                <div id="myappointments" className="my-5 container-md jumbotron">
                    <h2 className="mb-5">My Appointments</h2>

                    {
                        this.state.appointments.length > 0 ?
                            <div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.appointments.map(appointment => (
                                            appointment.date.charAt(13) == '0' ? 
                                            <tr>
                                                <td>{appointment.date.substring(0, 10)}</td>
                                                <td>{appointment.date.substring(12, 17)}</td>
                                            </tr>    
                                                :
                                            <tr>
                                                <td>{appointment.date.substring(0, 10)}</td>
                                                <td>{appointment.date.substring(12, 16)}</td>
                                            </tr> 
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        
                        :
                        <p>No appointments scheduled yet!</p>
                        }

                    {/* <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sunday</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Doctor one - 4pm</td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
                <div className="my-5 container-md">

                    <h4 className="my-3">Book Appointments</h4>
                    
                    <label htmlFor="search">Search</label>
                    <input  type="search" 
                            id="home-med-search" 
                            name="search"
                            className="form-control mb-5"
                            onChange= {event => this.setState({searchText: event.target.value})}></input>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Pharmacy</th>
                                <th>Phone Number</th>
                                <th>Book Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.getPharmacyWorkers().map(worker => (
                                    <tr className="">
                                        <td>{worker.name}</td>
                                        {/* <td>{this.getPharmacyName(worker.pharmacyID)}</td> */}
                                        <td>{worker.pharmacyID}</td>
                                        <td>{worker.phone}</td>
                                        <td><Link to={"/appointments/"+worker.userID} id="btn-book" className="btn btn-primary">Book</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}