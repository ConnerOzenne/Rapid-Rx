import axios from 'axios';

export class Repository {

    url = false ? 'http://3.129.6.230:8000' : 'http://localhost:8000';

    config = {
        headers: {
            Authorization: '*'
            // Access-Control-Allow-Origin: '*'
        }
    }

    //Account stuff    path = /account
    //POST /account on DB side
    addAccount(state){
        return new Promise((resolve, reject) => {
            console.log('account trying to be added');
            axios.post(`${this.url}/users/create`, state).then(resp => {
                resolve(resp.data);
            }).catch(err => alert(err));
        });
    }

    //logging in 
    login(state){
        return new Promise((resolve, reject) => {
            console.log(state)
            axios.post(`${this.url}/login`, state, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("error");
                console.log(e);
            });
        })
    }

    // getting pharmacies to sort by zip
    getPharmacies(state) {
        var zip = Math.floor(Math.floor(state.zipcode/10)/10)
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/pharmacies/${zip}`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("Axios error");
                console.log(e);
            });
        })
    }

    getUserOrders(state) {
        var userID = state.userID
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders/${userID}`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("Axios error");
                console.log(e);
            });
        })
    }

    getUser(state) {
        var userID = state.userID
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userID}`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("Axios error");
                console.log(e);
            });
        })
    }

    // getAccountInfo(id) {
    //     return new Promise((resolve, reject) => {
    //         //axios.get(`${this.url}/account/${id}`)
    //         axios.get(`${this.url}/account/${id}`, this.config)
    //         .then(x => resolve(x.data))
    //         .catch(e => {
    //             alert(e);
    //             reject();
    //         });
    //     })
    // }

}//end repository