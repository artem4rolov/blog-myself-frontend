import React from "react";
import AddPost from "../AddPost/AddPost";
import FullPost from "../FullPost/FullPost";
import Posts from "../../components/Posts/Posts";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import UserProfileById from "../UserProfile/UserProfileById";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/post/add-post" element={<AddPost />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile/:id" element={<UserProfileById />} />
      </Routes>
    </>
  );
};

export default Home;
