/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import {BiAddToQueue} from "react-icons/bi"
import axios from "axios";
import { Link } from "react-router-dom";
import Spiner from "../components/Spiner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/book`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/createbook">
          <BiAddToQueue className="text-orange-600 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <spiner />
      ) : (
        <table className=" w-full border-orange-800 border-separat border-2  border-spacing-2">
          <thead className="items-center">
            <tr>
              <th className="border border-slate-800">No.</th>
              <th className="border border-slate-800">Book Title</th>
              <th className="border border-slate-800">Author</th>
              <th className="border border-slate-800 max-md:hidden">Publish Year</th>
              <th className="border border-slate-800">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr key={book._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{book.title}</td>
                  <td className="text-center">{book.author}</td>
                  <td className="text-center max-md:hidden">{book.publishyear}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-x-3">
                      <Link to={`/showbook/${book._id}`}>
                        <GrCircleInformation className="text-green-600"/>
                      </Link>
                      <Link to={`/editbook/${book._id}`}>
                        <AiFillEdit className="text-orange-600" />
                      </Link>
                      <Link to={`/deletebook/${book._id}`}>
                        <AiFillDelete className="text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>    
      )}
    </div>
  );
};

export default Home;
