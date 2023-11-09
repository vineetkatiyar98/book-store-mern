/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBookPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishYear] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/book/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setPublishYear(response.data.publishyear);
        setAuthor(response.data.author);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditBook = async (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      publishyear,
    };
    axios.put(`http://localhost:8000/book/${id}`, data).then((response) =>{
      console.log(response.data)
      navigate("/")
    }).catch((err) =>{
      console.log(err)
    })
  };

  return (
    <div className="w-1/2 m-auto mt-10 h-full py-16 text-center border-2 border-gray-600 rounded bg-orange-50">
    <h1 className="text-5xl my-6">Create Book</h1>
    <form
      className="flex flex-col w-[40%] mx-auto border-3 border-slate-500"
      onSubmit={handleEditBook}
    >
      <label htmlFor="">Book List : </label>
      <input
        className="border-2 border-slate-700 px-3 rounded h-10"
        placeholder="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="">Author : </label>
      <input
        className="border-2 border-slate-700 px-3 rounded h-10"
        placeholder="author"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label htmlFor="">PublishYear : </label>
      <input
        className="border-2 border-slate-700 px-3 rounded h-10 mb-5"
        placeholder="publishYear"
        type="number"
        value={publishyear}
        onChange={(e) => setPublishYear(e.target.value)}
      />

      <button
        type="submit"
        className="border-2 border-slate-700 px-3 rounded h-10 bg-orange-600 text-white"
      >
        Create Book
      </button>
    </form>
  </div>
  );
};

export default EditBookPage;
