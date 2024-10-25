/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'

import NoImage from './NoImage'
import { Banner } from './Banner'
import { getPosts } from '../inicio/services/Posts'
import ImageRotator from './Imagen'
import { getAllPosts } from './services/getAllPosts'
import { usePostsContext } from '../inicio/hooks/usePosts'
import { useIpContext } from '../inicio/hooks/useIp'

function Vista() {
  const { IpState } = useIpContext()
  const { postsState, setPosts } = usePostsContext()

  const [dividedPosts, setDividedPosts] = useState({
    publis: [],
    Banners: []
  })

  const posts = async (URL: string) => {
    setPosts(await getPosts(URL))
  }

  useEffect(() => {
    posts(IpState)
    console.log('san pedro')
  }, [])

  useEffect(() => {

    getAllPosts(postsState, setDividedPosts)
    console.log('aca no cambia')
    console.log(dividedPosts)
  }, [postsState])


  return (
    <div className='bg-black w-screen h-screen' >
      <div className={dividedPosts.Banners.length == 0 ? `h-[100%]` : `h-[95%]`}>
        {dividedPosts.publis.length > 0 && <ImageRotator data={dividedPosts.publis} />}
        {dividedPosts.publis.length === 0 && <NoImage />}
      </div>
      {dividedPosts.Banners.length != 0 &&
        <div className='h-[5%] flex w-full'>
          <Banner data={dividedPosts.Banners} />
        </div>}
    </div>
  )
}
export default Vista