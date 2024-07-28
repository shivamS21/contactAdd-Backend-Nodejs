import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        username: {
            type: String,
            require: [true, "Please add the username"]
        },
        email: {
            type: String,
            require: [true, "Please add the user email"],
            unique: [true, "Email address already taken"]
        },
        password: {
            type: String,
            required: [true, "Please add the user password"]
        }
    }, 
    {
        timeStamp: true
    }
);

export default mongoose.model('User', userSchema);