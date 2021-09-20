import dotenv from 'dotenv'    
dotenv.config();

let dbName = process.env.DEV_DB_NAME

if (process.env.NODE_ENV === "prod"){
    dbName = process.env.PROD_DB_NAME
}

export const MongoDB = {
    MongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cws7p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
}

