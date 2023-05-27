"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="sm:mt-12 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
 
  const [searchCriteria, setSearchCriteria] = useState("")


  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const res = await axios.get("/api/prompt");
    setPosts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter((item) => {
      const matchByUsername = regex.test(item.creator.username);
      const matchByTag = regex.test(item.tag);
      const matchByPrompt = regex.test(item.prompt);
      if (matchByUsername) {
        setSearchCriteria("username");
      } else if (matchByTag) {
        setSearchCriteria("tag");
      } else if (matchByPrompt) {
        setSearchCriteria("prompt");
      }
      return matchByUsername || matchByTag || matchByPrompt;
    });
  };

  const handlerSearchChange = (e) => {
    setSearchText(e.target.value);
      console.log(searchCriteria);    
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500);

  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <div className="feed">
      <form>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handlerSearchChange}
          required
          className="search_input peer"
        />
        <div>
          {searchText && searchedResults.length !== 0 && (
            <p className="text-sm text-center text-gray-600">
              Data filtering is done by {searchCriteria}
            </p>
          )}
        </div>
      </form>
      {searchedResults.length === 0 && searchText ? (
        <Image alt="not_found" src="/assets/images/notFound.png" width={400} height={350}/>
      ) : (
        <PromptCardList
          data={searchText ? searchedResults : posts}
          handleTagClick={handleTagClick}
        />
      )}
    </div>
  );
};

export default Feed;
