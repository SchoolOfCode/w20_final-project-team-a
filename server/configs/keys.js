import dotenv from 'dotenv'    
dotenv.config();

export const MongoDB = {
    MongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cws7p.mongodb.net/aztechUsers?retryWrites=true&w=majority`,
}

