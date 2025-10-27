import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

// 100 sample books
const books = Array.from({ length: 100 }, (_, i) => ({
  name: `Book Title ${i + 1}`,
  price: i % 7 === 0 ? 0 : Math.floor(Math.random() * 1000) + 100, // कुछ free
  category: i % 7 === 0 ? "Free" : "Paid",
  image: `https://picsum.photos/seed/book${i}/200/300`, // random book cover
  title: `This is a short description for Book ${i + 1}`,
}));

async function seedBooks() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB ✅");

    await Book.deleteMany({});
    console.log("Old books removed ✅");

    await Book.insertMany(books);
    console.log("100 books inserted successfully 🎉");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding books:", err);
  }
}

seedBooks();
