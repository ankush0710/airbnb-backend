const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

// to capture the entire data form body like a fake database
const homesData = [];

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl; 
    }

    save(){
        homesData.push(this);
        const homesDataPath = path.join(rootDir, 'data', 'homes.json');
        fs.writeFile(homesDataPath, JSON.stringify(homesData), (err) => {
            console.log('File Write Concluded', err);
        });

    }

    static fetchAll(){
        return homesData
}
    
}