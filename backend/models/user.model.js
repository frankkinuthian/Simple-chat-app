import mongoose from "mongoose";

// Define the schema for the User model with necessary fields and constraints
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true, 
        minlength: 8
    },
    fullName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {timestamps: true}) // Automatically adds createdAt and updatedAt timestamps

// Create the User model based on the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;