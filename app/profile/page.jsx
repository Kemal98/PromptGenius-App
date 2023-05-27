"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import axios from "axios";


const MyProfile = () => {
  const {data:session} = useSession()
  const [posts, setPosts] = useState([])
  
  const router = useRouter()


   useEffect(() => {
    const fetchPost = async () => {
         const res = await axios.get(`/api/users/${session?.user.id}/posts`);
         setPosts(res.data);
         console.log(2)
         console.log(res);
       }; 
     if(session?.user.id)fetchPost()
     }, []);



   const handleEdit = (post) => {
     router.push(`/update-propmt?id=${post._id}`);
   };

   const handleDelete = async (post) => {
     const confirmed = confirm("Are you sure you want to delete the post ?");
     if (confirmed) {
       try {
        await axios.delete(`/api/prompt/${post._id.toString()}`);
        const filterPosts = posts.filter((Post) => Post._id !== post._id)
        setPosts(filterPosts);
      } catch (error) {
        console.log(error)
      }
     }
   };


  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
