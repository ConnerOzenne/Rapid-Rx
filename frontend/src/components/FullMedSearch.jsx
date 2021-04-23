import { render } from "react-dom"
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Repository } from "../api/repository";

export class FullMedSearch extends React.Component {

    repo = new Repository();

    state = {
        meds: [],
        searchOption: 'Medication ID',
        searchText: ''
    };

    searchOptions = [
        'Medication ID',
        'Medication Name',
        'Description',
        'Side Effects',
        'Used For',
        'Price'
    ]

    componentDidMount() {
        this.repo.getMedications()
            .then(data => {
                const res = data.data;
                this.setState({meds: res});
            })
    }

    filter(currMed) {
        if (this.state.searchText == '') return true;
        if (this.state.searchOption == this.searchOptions[0] && currMed.medicationID == parseInt(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[1] && currMed.name.includes(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[2] && currMed.description.includes(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[3] && currMed.sideEffects.includes(this.state.searchText)) return true;
        if (this.state.searchOption == this.searchOptions[4] && currMed.usedFor.includes(this.state.searchText)) return true;
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
                    <p className="h5 font-italic font-weight-bold text-info">Welcome Pharmacy Manager! Click on the ID of a Medication to edit it.</p>
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
                        <th>Description</th>
                        <th>Side Effects</th>
                        <th>Used For</th>
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
                                        <td>{currMed.description}</td>
                                        <td>{currMed.sideEffects}</td>
                                        <td>{currMed.usedFor}</td>
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