/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import { PublisCollection } from './Publis/PublisCollection'
// import { BannersCollection } from './Publis/BannersCollection'
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
import IconNavFunction from './nav/IconNav'
import IconNavLink from './nav/IconNavLink'

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
    <article className="[grid-area:main]">
      <div className='flex w-full flex-col max-w-[1400px] m-auto h-[87vh]'>
        <div className=' flex justify-between  items-center py-1 ' >
          <div className='flex items-center'>
            <SelectIp />
            <IconNavFunction url="./iconos/plus.svg" alt="add Publi" message="crear publicacion" />
          </div>
          <IconNavLink url="./iconos/nav/eye.svg" alt="add Publi" message="ir a vista" />
        </div>

        <div className='rounded-md overflow-y-auto border py-4'>
          <PublisCollection />
        </div>
      </div>
    </article>
  )
}

export default Marquee