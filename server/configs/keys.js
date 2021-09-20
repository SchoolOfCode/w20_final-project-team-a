import dotenv from 'dotenv'    
dotenv.config();

let dbName = "aztechUsers" //default to dev db

if (process.env.NODE_ENV === "prod"){
    dbName = "aztechProd"
}

export const MongoDB = {
    MongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cws7p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
}

