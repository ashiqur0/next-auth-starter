const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect = (collectionName) => {
    return client.db(db_name).collection(collectionName);
}