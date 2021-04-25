import { render } from "react-dom"
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Repository } from "../api/repository";

export class Inventory extends React.Component {

    repo = new Repository();

    constructor(props){
        super(props);

        this.state = {
            meds: [],
            searchOption: 'Medication ID',
            searchText: '',
            pharmacyId: 1

        };
    }
    

    searchOptions = [
        'Medication ID',
        'Medication Name',
        'Quantity',
        'Price'
    ]

    componentDidMount() {
        this.repo.getInventory(this.state.pharmacyId)
            .then(data => {
                const res = data.data;
                this.setState({meds: res});
            })
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

        return <>
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
                    </thead>
                    <tbody>
                        {
                            this.state.meds.map(currMed => 
                                (
                                    this.filter(currMed) ? 
                                    <tr>
                                        {
                                            this.props.authorityLevel > 0 ?
                                            <td>
                                                <Link   className="btn btn-light border"
                                                        to={"/medlist/edit/"+currMed.medicationID}>
                                                    {currMed.medicationID}
                                                </Link>

                                            </td> 
                                            :<td>{currMed.medicationID}</td>
                                        }
                                        <td>{currMed.name}</td>
                                        <td>
                                            {currMed.quantity}
                                            <button type="button" id="update" name="update" class="btn btn-primary">Update</button>
                                        </td>
                                        <td>${currMed.price}</td>
                                    </tr> 
                                    : <>{console.log("FALSE")}</>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    }
}