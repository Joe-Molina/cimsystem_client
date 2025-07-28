'use client'

import { useReducer } from "react";
import { Post, PostState } from "../interfaces/interfaces";
import { PostsContext } from "./PostContex";
import { postsReducer } from "./PostReducer";


interface props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PostState = {
  Posts: []
}

export const PostsProvider = ({ children }: props) => {

  const [postsState, dispatch] = useReducer(postsReducer, INITIAL_STATE)


  const deletePost = (id: number) => {
    dispatch({ type: 'deletePost', payload: { id } })
  }

  const setPost = (post: Post) => {
    dispatch({ type: 'addPost', payload: { post } })
  }

  const setPosts = async (posts: Post[]) => {
    dispatch({ type: 'addPosts', payload: { posts } })
  }

  const setDuration = async (idd: number, newData: number) => {
    dispatch({ type: 'changeDurationPost', payload: { idd, newData } })
  }

  const setPosition = async (id: number, newData: number) => {
    dispatch({ type: 'changePositionPost', payload: { id, newData } })
  }

  const setStartDate = async (id: number, newData: Date) => {
    dispatch({ type: 'changeStartDatePost', payload: { id, newData } })
  }

  const setEndDate = async (id: number, newData: Date) => {
    dispatch({ type: 'changeEndDatePost', payload: { id, newData } })
  }

  return (
    <PostsContext.Provider value={{
      postsState,
      setPost,
      deletePost,
      setPosts,
      setDuration,
      setPosition,
      setEndDate,
      setStartDate,
    }}>
      {children}
    </PostsContext.Provider>
  )
}