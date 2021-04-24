import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import { Repository } from '../api/repository';
import { Navbar } from '../components/Navbar';
import { ClosestPharmacies } from '../models/ClosestPharmacies'

export class CreateAccount extends React.Component {

    repo = new Repository();

    state = {
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        authorityLevel: "",
        phoneNumber: "",
        name: "",
        country: "",
        success: false,
        error: "",
        pharmacy: "",
        pharmacies: []
    }

    //Functionality needed for creation errors:
    //Username taken
    //Passwords don't match

    typeToInt = (typeStr) => {
        if (typeStr === "Customer")
            return 0;
        else if (typeStr === "Pharmacist")
            return 1;
    }

    handleCreate = () => {

        //Test if fields are filled correctly
        this.setState({error: this.evalErrors()});
        console.log(this.state)
        if (this.evalErrors() == "") {
            this.setState({success: true});
        }
        else
            return;
    
        let json = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            authorityLevel: this.typeToInt(this.state.authorityLevel),
            phone: this.state.phoneNumber,
            showPharmacyHelper: false,
            pharmacyID: this.getPharmacyID(this.state.pharmacy)
        }
        console.log(json)
        this.repo.addAccount(json);
    }

    getPharmacyID(name) {
        var id = 0
        this.state.pharmacies.forEach(ph => {
            if (ph.name === name) {
                id = ph.pharmacyID
            }
        })
        return id
    }

    componentDidMount() {
        this.repo.getPharmacies()
        .then(x => {
            this.setState({pharmacies: x.data.data})
        })
    }

    evalErrors = () => {

        //Return a string for error codes during creation
        if (this.state.username == "") {
            return "You must fill in your username"
        }
        if (this.state.email == "") {
            return "You must fill in your email address"
        }
        if (this.state.password == "") {
            return "You must create a password"
        }
        if (this.state.confirmPassword == "") {
            return "You must confirm your password"
        }
        if (this.state.name == "") {
            return "You must fill out a name"
        }
        if (this.state.password != this.state.confirmPassword) {
            return "Passwords do not match"
        }
        if (this.state.pharmacyID == "") {
            return "Must select a pharmacy"
        }

        return "";

    }

    render() {

        return (<>
            <Navbar></Navbar>
            <div className="container my-5">
                {!this.state.success && <div>
                    <h3>Create Account</h3>

                    <label htmlFor="name">Email</label>
                    <input className="form-control"
                    type="text" 
                    name="name" 
                    id="name"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}/>

                    <label htmlFor="username">Username</label>
                    <input className="form-control"
                    type="text" 
                    name="username" 
                    id="acct-username"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                    />

                    <label htmlFor="email">Email</label>
                    <input className="form-control"
                    type="text" 
                    name="email" 
                    id="acct-email"
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                    />

                    <label htmlFor="password">Password</label>
                    <input className="form-control" 
                    type="password" 
                    name="password" 
                    id="acct-password"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}/>

                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input className="form-control"
                    type="password" 
                    name="password-confirm" 
                    id="password-confirm"
                    value={this.state.confirmPassword}
                    onChange={e => this.setState({confirmPassword: e.target.value})}/>

                    <label htmlFor="phone">Phone Number</label>
                    <input className="form-control"
                    type="tel" 
                    name="phone" 
                    id="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={this.state.phoneNumber}
                    onChange={e => this.setState({phoneNumber: e.target.value})}/>

                    <label htmlFor="authorityLevel">Account Type</label>
                    <select className="form-control col-6" 
                        id="authorityLevel"
                        value={this.state.authorityLevel}
                        onChange={e => this.setState({authorityLevel: e.target.value})}>

                        <option></option>
                        <option>Customer</option>
                        <option>Pharmacist</option>
                        
                    </select>

                    {/* Make dropdown for select pharmacy of choice. Set to state for post to DB
                    Need to add getPharmacies to componentDidMount */}

                    <label htmlFor="selectPharmacy">Select a Default Pharmacy</label>
                    <select className="form-control col-6" 
                        id="selectPharmacy"
                        value={this.state.pharmacy}
                        onChange={e => this.setState({pharmacy: e.target.value})}>

                        <option></option>
                        {this.state.pharmacies.map(ph => (
                            <option key={ph.pharmacyID}>{ph.name}</option>
                        ))}
                    </select>  
                    <text className="" onClick={() => this.setState({showPharmacyHelper: !this.state.showPharmacyHelper})}>See Pharmacies Table <u>Here</u> for Help</text>
                    {this.state.showPharmacyHelper && <ClosestPharmacies auth={0}></ClosestPharmacies>} 

                    {this.state.error != "" && <div className="alert alert-danger" role="alert">{`Error: ${this.state.error}`}</div>}
                    <button className="mt-5 btn btn-primary btn-block" onClick={this.handleCreate}>Create Account</button>
                </div>}
                {this.state.success && <div className="alert alert-success">
                    Account created successfully. Back to 
                    <Link to="/login"> login</Link>
                </div>}
            </div>
        </>
        );

    }

}