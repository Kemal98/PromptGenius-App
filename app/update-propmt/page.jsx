"use client";

import Form from "@components/Form";
import axios from "axios";
import { useSession, } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });


useEffect(() => {
    const getPromptDetails = async () => {
     const {data} = await axios.get(`/api/prompt/${promptId}`) 
     setPost({
       prompt: data.prompt,
       tag: data.tag,
     });
    }
    getPromptDetails()
}, [promptId]);


  const updatePrompt = async (e) => {
    e.preventDefault();
    if(!promptId) return alert('Prompt id not found')
    setIsSubmitting(true);
    console.log(promptId);
    try {
      const response = axios.patch(`/api/prompt/${promptId}`, {
          prompt: post.prompt,
          tag: post.tag,
        })
        .then((respone) => {
            console.log(respone)
            if (respone.statusText === "OK") return router.push("/");
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
