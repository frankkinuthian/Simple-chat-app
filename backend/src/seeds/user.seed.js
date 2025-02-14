import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "mwende.mutua@example.com",
    fullName: "Mwende Mutua",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "nyambura.kimani@example.com",
    fullName: "Nyambura Kimani",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "nzisa.ndungu@example.com",
    fullName: "Nzisa Ndung'u",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "mueni.nganga@example.com",
    fullName: "Mueni Ng'ang'a",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "kanini.waweru@example.com",
    fullName: "Kanini Waweru",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mwende.mbugua@example.com",
    fullName: "Mwende Mbugua",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "nzisa.kamau@example.com",
    fullName: "Nzisa Kamau",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "nyokabi.ngugi@example.com",
    fullName: "Nyokabi Ngugi",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "kioko.mutiso@example.com",
    fullName: "Kioko Mutiso",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "mwangi.kamau@example.com",
    fullName: "Mwangi Kamau",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "ngugi.njuguna@example.com",
    fullName: "Ngugi Njuguna",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "kimani.kariuki@example.com",
    fullName: "Kimani Kariuki",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "mwaura.macharia@example.com",
    fullName: "Mwaura Macharia",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "ndungu.nganga@example.com",
    fullName: "Ndung'u Ng'ang'a",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "mwenda.mbugua@example.com",
    fullName: "Mwenda Mbugua",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
