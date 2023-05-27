"use client";

import Form from "@components/Form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = axios.post("/api/prompt/new", {
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
        .then((respone) => {
          console.log(respone);
          console.log(response);
          if (respone.status === 201) {
            router.push("/");
          }
        });

    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
