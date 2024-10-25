'use client'

import { createContext } from "react";
import { Post, PostState } from "../interfaces/interfaces";

export type PostContextProps = {
  postsState: PostState,
  setPost: (post: Post) => void,
  setPosts: (posts: Post[]) => void,
  deletePost: (id: number) => void,
  setDuration: (idd: number, newData: number) => void,
  setPosition: (id: number, newData: number) => void,
  setStartDate: (id: number, newData: Date) => void,
  setEndDate: (id: number, newData: Date) => void,

};

export const PostsContext = createContext<PostContextProps>({} as PostContextProps)