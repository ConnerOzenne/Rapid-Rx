export class User {
    constructor(userID, name, addressID, userName, password, email, 
        pharmacyID, authorityLevel, contactInfo) {
        this.userID = userID;
        this.name = name;
        this.addressID = addressID;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.pharmacyID = pharmacyID;
        this.authorityLevel = authorityLevel;
        this.contactInfo = contactInfo;
        this.orders = orders;
    }
}