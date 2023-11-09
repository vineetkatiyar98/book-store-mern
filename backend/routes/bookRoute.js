import Book from "../models/bookModels.js";
import express from "express";
const router = express.Router();

//create new book in the database
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishyear) {
      return res.status(404).send({
        message: "Please enter a title",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishyear: req.body.publishyear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
//get all the books
router.get("/", async (request, response) => {
  try {
    const book = await Book.find({});
    return response.status(201).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
});

//get one book by the id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(201).json(book);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
});

//update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishyear
    ) {
      return response.status(404).json({
        message: "please provide valid data of these fields",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({
        message: "book not found",
      });
    }

    return response.status(201).json({
      message: "book updated successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
    });
  }
});

//delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    console.log(book);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(201).json({
      message: "book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});


export default router;