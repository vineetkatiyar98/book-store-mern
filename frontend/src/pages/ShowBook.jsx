/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import Spiner from "../components/Spiner";

const ShowBookPage = () => {
  const [book, setbook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/book/${id}`)
      .then((response) => {
        setbook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="items-center  p-5 justify-center">
      <h1 className="text-3xl text-center">Book Details</h1>
      <div className=" border-2 border-black w-fit m-4 rounded ">
        <BackButton className="bg-black text-center" />
      </div>
      {loading ? (
        <Spiner />
      ) : (
        <div className=" border-2 text-center border-gray-700 w-1/3 p-6 bg-gray-100 rounded">
          <div className="">
            <span className="text-orange-500 font-bold mr-4">Id :-</span>
            {book._id}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Title : -</span>
            {book.title}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Author : -</span>
            {book.author}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Publish Year : -</span>
            {book.publishyear}
          </div>          
          <div>
            <span className="text-orange-500 font-bold mr-4">Last Update : -</span>
            {new Date(book.updatedAt).toString()}
          </div>          
          <div>
            <span className="text-orange-500 font-bold mr-4">Create Date : -</span>
            {new Date(book.createdAt).toString()}
          
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBookPage;
