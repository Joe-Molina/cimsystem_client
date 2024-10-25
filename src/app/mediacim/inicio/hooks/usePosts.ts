import { useContext } from "react";
import { PostsContext } from "../context/PostContex";

export const usePostsContext = () => {
  const {
    postsState,
    setPost,
    setPosts,
    deletePost,
    setDuration,
    setPosition,
    setEndDate,
    setStartDate,
  } = useContext(PostsContext);

  return {
    postsState,
    setPost,
    setPosts,
    deletePost,
    setDuration,
    setPosition,
    setEndDate,
    setStartDate,
  };
};
