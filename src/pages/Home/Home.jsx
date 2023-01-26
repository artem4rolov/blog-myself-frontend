import React from "react";
import AddPost from "../../components/AddPost/AddPost";
import FullPost from "../../components/FullPost/FullPost";
import Posts from "../../components/Posts/Posts";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/post/add-post" element={<AddPost />} />
      </Routes>
    </>
  );
};

export default Home;
