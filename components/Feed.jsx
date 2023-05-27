"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
        key={post.id}
        post={post}
        handleTagClick={handleTagClick}/>
      ))}
    </div>
  );
}



const Feed = () => {

  const [searchText, setSearchText] = useState('')

  const [posts, setPosts] = useState([])

  const handlerSearchChange = (e) => {

  }
 
  useEffect(() => {
    const fetchPost =  async() => {
      const res = await axios.get('/api/prompt')
      setPosts(res.data);
      console.log(res.data);
    }
    fetchPost()
  },  [])


  return (
    <div className="feed">
      <form>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onaChage={handlerSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
       data={posts}
       handleTagClick={() => {}}/>
    </div>
  );
};

export default Feed;
