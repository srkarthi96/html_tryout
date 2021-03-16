const mongoose = require('mongoose')

const dbConnection = "mongodb://localhost:27017/html_user"
try{
   mongoose.connect(dbConnection,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
   }), console.log(`mongodb connected @ ${dbConnection}`)
    const connection = mongoose.connection;

    connection.once("open", function() {
     console.log("MongoDB database connection established successfully");
    });
}
catch(err){
    throw err
}