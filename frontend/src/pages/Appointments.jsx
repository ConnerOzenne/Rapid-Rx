import React, { Component } from 'react';
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Repository } from '../api/repository';
import './Appointments.css'

export class Appointments extends React.Component{

    repo = new Repository();

    state = {
        users: []
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
    }

    getPharmacyWorkers() {
        let pharmacyWorkers = []

        if (this.state.users.length > 0) {
            this.state.users.forEach(user => user.authorityLevel > 0 && pharmacyWorkers.push(user));
        }

        console.log(pharmacyWorkers)
        return pharmacyWorkers;
    }

    render() {
        return (
            <>
                <Navbar></Navbar>
                <div id="myappointments" className="my-5 container-md jumbotron">
                    <h2 className="mb-5">My Appointments</h2>
                    <table className="table table-striped">
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
                    </table>
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
                                <th>Pharmacy Address</th>
                                <th>Phone Number</th>
                                <th>Book Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.getPharmacyWorkers().map(worker => (
                                    <tr className="">
                                        <td>{worker.name}</td>
                                        <td>{worker.pharmacyID}</td>
                                        <td></td>
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