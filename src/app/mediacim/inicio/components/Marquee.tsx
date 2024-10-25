/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import { PublisCollection } from './Publis/PublisCollection'
import { BannersCollection } from './Publis/BannersCollection'
import { usePostsContext } from '../hooks/usePosts'
import { getPosts } from '../services/Posts'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIpContext } from '../hooks/useIp'

export function SelectIp() {
  const { setIp } = useIpContext()

  const handleClick = (value: string) => {
    console.log(value)
    setIp(value)
  }

  return (
    <Select onValueChange={handleClick}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="monitor 1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectItem value="http://mediacim1:3002">Monitor 1</SelectItem>
          <SelectItem value="http://mediacim2:3002">Monitor 2</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function Marquee() {
  const { setPosts } = usePostsContext()
  const { IpState } = useIpContext()

  const posts = async (URL: string) => {
    setPosts(await getPosts(URL))
  }


  useEffect(() => {
    posts(IpState)
  }, [IpState])

  //<button onClick={() => { console.log(postsState.Posts) }} >posts state</button>
  return (
    <section className=" lg:[grid-area:main]  bg-neutral-900 overflow-auto">
      <div className='flex h-full w-full flex-col '>
        <div className='bg-neutral-950 flex justify-around items-center px-2 h-[53px] w-full border-b border-neutral-700' >
          <p className='font-2xl font-bold'>MediaCIM Web</p>
          <SelectIp />
        </div>

        <div className='bg-neutral-950 h-[95%] m-3 border rounded-md overflow-auto'>
          <h2 className='font-medium text-2xl pl-3 py-2 border-b '>Publicaciones</h2>
          <PublisCollection />
          <h2 className='font-medium text-2xl pl-3 py-2 border-b '>Banners</h2>
          <BannersCollection />
        </div>

      </div>
    </section>
  )
}

export default Marquee