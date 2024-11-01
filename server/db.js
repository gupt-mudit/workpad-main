import mongoose  from 'mongoose';

const Connection = async () => {
//const URL = `mongodb://${username}:${password}@google-docs-clone-shard-00-00.u7w63.mongodb.net:27017,google-docs-clone-shard-00-01.u7w63.mongodb.net:27017,google-docs-clone-shard-00-02.u7w63.mongodb.net:27017/GOOGLE-DOCS?ssl=true&replicaSet=atlas-zfichu-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect("mongodb://localhost:27017/doc-clone")
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}
export default Connection;
