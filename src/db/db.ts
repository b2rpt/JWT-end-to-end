import mongoose from 'mongoose';

const uri : string= process.env.MONGO_URI||'';

// Connect to MongoDB Atlas
const connectDataBase=()=>{

    mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas!');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });
}
export default connectDataBase;
