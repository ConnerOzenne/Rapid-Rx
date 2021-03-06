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
        this.getMeds();
}

    getMeds() {
        this.repo.getMedications()
        .then(data => {
            const res = data.data;
            this.setState({meds: res});
            this.state.meds.forEach((med,j) => {
                let meds = [...this.state.meds];
                med.flagType = 0;
                med.flagID = 0;
                meds[j] = med;
                this.setState({meds});
            })
            this.repo.getUserFlags(localStorage.getItem("userID"))
            .then(flags => {
                flags.data.forEach((flag, i) => {
                    this.state.meds.forEach((med,j) => {
                        let meds = [...this.state.meds];
                        if(med.medicationID == flag.medicationID) {
                            med.flagType = flag.flagType;
                            med.flagID = flag.flagID;
                            meds[j] = med;
                            this.setState({meds});
                        }
                })
                })
        })
    })
    }

    flagMed(flagID, flagType, medicationID) {
        let userID = localStorage.getItem("userID");
        if(flagID == 0) {
            const flag = {userID, flagType: 1, medicationID};
            this.repo.createFlag(flag);
        }
        else {
            if(flagType == 1) {
                this.repo.updateFlagType(flagID, 0);
            }
            else {
                this.repo.updateFlagType(flagID, 1);
            }
        }
        this.getMeds();
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == -1);
        return loggedIn;
    }

    filter(currMed) {
        // debugger;
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
                    this.props.authorityLevel && this.props.authorityLevel >= 2 && 
                    <p className="h5 font-italic font-weight-bold text-info">Welcome Pharmacy Manager! Click on the ID of a Medication to edit it.</p>
                }

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
                        <th>Flag Medication</th>
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
                                    <td className="text-center" scope="row" id="save">
                                        {
                                           (this.isLoggedIn() && currMed.flagType == 0 ) &&
                                            <Link to={"/flag/" + currMed.flagID} className="btn btn-outline-danger" onClick = {() => this.flagMed(currMed.flagID, currMed.flagType, currMed.medicationID)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                                                    </svg> 
                                            </Link>
                                        }
                                        {
                                            (this.isLoggedIn() && currMed.flagType == 1) && 
                                            <Link to={"/flag/" + currMed.flagID}  className="btn btn-danger" onClick = {() => this.flagMed(currMed.flagID, currMed.flagType, currMed.medicationID)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                                                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                                                </svg>
                                            </Link>
                                        }
                                    </td>
                                        {
                                            this.props.authorityLevel >= 2 ?
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

                {
                    this.props.authorityLevel && this.props.authorityLevel >= 2 && 
                    <Link to="/medlist/edit/0" className="btn btn-primary">
                        New
                    </Link>
                }
            </div>
        </>
    }
}