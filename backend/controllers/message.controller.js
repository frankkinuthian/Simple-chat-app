import User from "../models/user.model.js";
import Message from "../models/message.model.js";

// This function retrieves all users except the logged-in user for the sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// This function fetches all messages between the logged-in user and another specified user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  // Handles the logic for sending a new message between users
  try {
    // Extracts the text and image from the request body
    // Retrieves the receiver's ID from the request parameters
    // Uses the sender's ID from the authenticated user object
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    // If an image is provided, uploads it to Cloudinary and retrieves the URL
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Creates a new message instance with sender, receiver, text, and optional image URL
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Set to do here: Implement realtime functionality with socket.io

    // Responds with a 201 status and the new message object
    res.status(201).json(newMessage);

    // Saves the new message to the database
    await newMessage.save();

    // Responds again with a 201 status and the new message object
    res.status(201).json(newMessage);
  } catch (error) {
    // Logs any errors that occur during message sending to the console
    // Responds with a 500 status and an error message
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
