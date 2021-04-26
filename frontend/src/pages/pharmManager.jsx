import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Repository } from '../api/repository';
import { Navbar } from '../components/Navbar';


export class PharmManager extends React.Component {
    repo = new Repository();

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name"];

    state = {
        pharmacyID: +this.props.match.params.pharmacyID,
        medicationID: 1,
        meds: [],
        searchOption: 'Medication ID',
        searchText: '',
        update: false,
    };
    

    searchOptions = [
        'Medication ID',
        'Medication Name',
        'Quantity',
        'Price'
    ]

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == -1);
        return loggedIn;
    }


    componentDidMount() {
        //console.log();
        //debugger;
        this.repo.getUserInfo(18)
            .then(data => {
                const res = data.data;
                console.log("User Profile - componentDidMount(): res...")
                console.log(res);
                this.setState({authorityLevel: res.data[0].authorityLevel,
                    pharmacyID: res.data[0].pharmacyID,
                })
                this.repo.getInventory(this.state.pharmacyID)
                    .then(x => {
                        const res2 = x.data;
                        this.setState({meds: res2});
                    })
                .catch(err => {
                    console.log("No address info found")
                })
        })
    }

    updateActive = (currMed) => {
        this.setState({medicationID: currMed.medicationID,
            redirect: '/update'});
    }



    filter(currMed) {
        if (this.state.searchText == '') return true;
        if (this.state.searchOption == this.searchOptions[0] && currMed.medicationID == parseInt(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[1] && currMed.name.includes(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[4] && currMed.quantity.includes(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[5] && currMed.price == parseInt(this.state.searchText)) return true;
        return false;
    }

    render() {
        if (!this.state.meds) {
            return <p>Loading...</p>
        }
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />;
        }

        return (
            <>
                <Navbar/>           
                <div className="Container" id="header">
                    <h1>Medication Inventory</h1>
                    <div className="mx-5 p-5">
                    {
                    this.props.authorityLevel && this.props.authorityLevel > 0 ?
                        <p className="h5 font-italic font-weight-bold text-info">My Pharmacy Manager:</p>
                    : <> </>}

                    <label htmlFor="searchby">Search By</label>
                    <select className="form-control col-md-6" 
                            id="homepage-med-searchby" 
                            name="searchby"
                            onChange= {event => this.setState({searchOption: event.target.value})}>
                        {this.searchOptions.map(sortOption => <option>{sortOption}</option>)}
                    </select>

                    <label htmlFor="search">Search</label>
                    <input  type="search" 
                            id="home-med-search" 
                            name="search"
                            className="form-control mb-5"
                            value={this.state.searchText}
                            onChange= {event => this.setState({searchText: event.target.value})}></input>

                    <table className="table table-striped">
                        <thead>
                            <th>Medication ID</th>
                            <th>Medication Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Update Inventory</th>
                        </thead>
                        <tbody>
                            {
                                this.state.meds.map(currMed => 
                                    (
                                        this.filter(currMed) ? 
                                        <tr>
                                            <td>{currMed.medicationID}</td>
                                            <td>{currMed.name}</td>
                                            <td>
                                            {currMed.quantity}
                                            </td>
                                            <td>${currMed.price}</td>
                                            <td>
                                            <button className="btn btn-secondary" onClick={() => this.updateActive(currMed)}>Update</button>
                                            </td>
                                        </tr> 
                                        : <>{console.log("FALSE")}</>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </>
        );
    }
}