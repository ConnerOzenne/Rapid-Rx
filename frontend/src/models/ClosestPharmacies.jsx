import axios from 'axios';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Repository } from '../api/repository';

export class ClosestPharmacies extends React.Component {

    repo = new Repository();

    state = {
        zipcode: '',
        pharmacies: [],
        table: false
    }

    getPharmacies = () => {
        if (this.state.zipcode == '') {
            this.setAllPharmacies()
        }
        else {
            var rows = []
            this.repo.getPharmacies().then(data => {
                const resp = data.data
                for (var row in resp.data) {
                    if (Math.floor(resp.data[row].zipcode / 100) == Math.floor(this.state.zipcode / 100)) {
                        rows.push(resp.data[row])
                    }
                }
                this.setState({ pharmacies: rows, table: true })
                console.log(this.state.pharmacies)
            })
        }
        
    }

    setAllPharmacies() {
        this.repo.getPharmacies(this.state).then(data => {
            const resp = data.data
            this.setState( { pharmacies: resp.data, table: true } )
        })
    }

    componentDidMount() {
        this.setAllPharmacies()
    }

    render() {
        return (<>
            <div className="container">
                <h3 className="text-left">Pharmacies relative to your ZIP</h3>
                <label htmlFor="zipcode">Zip Code</label>
                <input className="form-control"
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    value={this.state.zipcode}
                    onChange={e => this.setState({ zipcode: e.target.value })}
                />
                <button className="btn btn-primary btn-block btn-login" onClick={this.getPharmacies}>Get Pharmacies</button>
                <div>
                    <table className="table table-condensed table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zipcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.table && this.state.pharmacies.map((ph, index) => (
                                <tr key={index}>
                                    <td><Link type='button' to={'/pharmacyManager/' + ph.pharmacyID } >{ph.name}</Link></td>
                                    <td>{ph.address}</td>
                                    <td>{ph.city}</td> 
                                    <td>{ph.state}</td>
                                    <td>{ph.zipcode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        )
    }

}