import React from "react";
import AddPost from "../AddPost/AddPost";
import FullPost from "../FullPost/FullPost";
import Posts from "../../components/Posts/Posts";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/post/add-post" element={<AddPost />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default Home;
