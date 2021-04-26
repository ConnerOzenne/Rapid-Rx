import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';
import './HomePage.css';
import { MedList } from './MedList.jsx';
import { FullMedSearch } from '../components/FullMedSearch'

export class HomePage extends React.Component {

    repo = new Repository();

    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    medInfo = ["","Name","Description","Side Effects","Not compatible with","More Information"];

    state = {
        firstName: "_none_",
        authorityLevel: 0,
        searchOption: '',
        searchText: '',
        message:'',
        isLoggedIn: ''
    };
    
    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && localStorage.getItem("userID") != -1;
        return loggedIn;
    }

    componentDidMount() {
        debugger;
        console.log("Homepage: componentDidMount()")
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(localStorage.getItem("userID"))
                .then(data => {
                    const res = data.data;
                    
                    let spaceLoc = res.data[0].name.indexOf(" ");
                    if (spaceLoc >= 0) {
                        this.setState({firstName: res.data[0].name.substring(0, spaceLoc), authorityLevel: res.data[0].authorityLevel, isLoggedIn: true});
                    }
                    else {
                        this.setState({firstName: res.data[0].name, authorityLevel: res.data[0].authorityLevel, isLoggedIn: true});
                    }
                })
                .catch(err => {
                    console.log("No user info found")
                })
        }
        else {
            this.setState({isLoggedIn: false})
            console.log("No user info found. ID returned -1")
        }
    }

    render() {

        return (
            <>
                <Navbar homepage={true}></Navbar>
                <div className="homepage-header position-relative vh-100">
                    <img className="position-absolute homepage-img w-100" src="img/PillStock.jpg"></img>
                    <img className="position-absolute mobile-none h-50" src="img/Homepage-1.svg"></img>
                    <img className="position-absolute homepage-title" src="img/Homepage-logo-1.svg"></img>
                    <div className="position-relative position-absolute homepage-info row">
                        <div className="d-flex flex-column align-items-center position-absolute homepage-welcome p-3">
                            <h2 className="homepage-welcome">
                                {/*this.state.firstName && this.state.firstName != "_none_" ? `Welcome ${this.state.firstName}!` : 'Welcome to Rapid RX!'*/}
                                {this.isLoggedIn() ? `Welcome ${this.state.firstName}!` : 'Welcome to Rapid RX!'}
                            </h2>
                            <button className="btn-homepage homepage-start">
                                {(this.isLoggedIn() ? 
                                    <Link to="/medlist" className="text-dark">
                                        Get Started
                                    </Link>
                                    :
                                    <Link to="/login" className="text-dark">
                                        Get Started
                                    </Link>
                                )}
                            </button>
                        </div>
                        <div className="position-absolute homepage-links">
                            {this.isLoggedIn() && this.state.authorityLevel > 0 ?
                                <a className="d-block" href="/medlist">Edit Prescriptions</a>
                                : <a className="d-block" href="/medlist">View Prescriptions</a>}
                            {this.isLoggedIn() && 
                                <a className="d-block" href="/pharmacyPortal">Pharmacies</a>}
                            
                        </div>
                    </div>
                    <img className="position-absolute mobile-none w-100 homepage-img2" src="img/Homepage-2.svg"></img>
                </div>

                <h1 className="mx-5 px-5">Search Medications</h1>
                <FullMedSearch authorityLevel='0'></FullMedSearch>

                {/* <div className="m-5 d-flex flex-column align-items-center">
                    <h1>My Medications</h1>
                    <table>
                        <thead>
                            <tr className="font-weight-bold">   
                                {this.days.map(day => <td>{day}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <tbody>

                    </tbody>
                </div>

                <div className="m-5">
                    <h1>Search Medications</h1>

                    <label htmlFor="searchby">Search By</label>
                    <select className="form-control col-6" 
                            id="homepage-med-searchby" 
                            name="searchby"
                            onChange= {event => this.setState({searchOption: event.target.value})}>
                        {this.medInfo.map(sortOption => <option>{sortOption}</option>)}
                    </select>

                    <label htmlFor="search">Search</label>
                    <input  type="search" 
                            id="home-med-search" 
                            name="search"
                            value={this.state.searchText}
                            onChange= {event => this.setState({searchText: event.target.value})}></input>
                </div> 
                </div> */}
            </>
        );
        
    }
}