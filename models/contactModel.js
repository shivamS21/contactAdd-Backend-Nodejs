import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User" // providing reference used to fill this field
        },
        name: {
            type: String,
            required: [true, "Please add the contact name!"],
        },
        email: {
            type: String,
            required: [true, "Please add the contact email!"],
        },
        phone: {
            type: String,
            required: [true, "Please add the phone!"],
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Contact", contactSchema);
// here Contact is the model name