import React from "react";
import AddPost from "../../components/AddPost/AddPost";
import FullPost from "../../components/FullPost/FullPost";
import Post from "../../components/Post/Post";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/post/add" element={<AddPost />} />
      </Routes>
    </>
  );
};

export default Home;
