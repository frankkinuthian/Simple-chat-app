import mongoose from "mongoose";
 
// Define the schema for a message, including sender and receiver references, text content, and optional image.
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps to the schema.
);
 
// Create a model for messages based on the defined schema.
const Message = mongoose.model("Message", messageSchema);
 
// Export the Message model for use in other parts of the application.
export default Message;