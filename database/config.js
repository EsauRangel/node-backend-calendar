const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN);


    } catch (error) {
        console.log(error);
        // throw new Error("error al iniciar base de datos");
    }
}


module.exports = {
    dbConnection
}