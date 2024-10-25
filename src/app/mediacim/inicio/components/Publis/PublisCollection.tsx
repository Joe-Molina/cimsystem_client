/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { PubliCard } from './PublisCard';
import { usePostsContext } from '../../hooks/usePosts';

const sortByPriority = (a: { position: number }, b: { position: number }) => {
  if (a.position < b.position) return -1;
  if (a.position > b.position) return 1;
  return 0;
};



export function PublisCollection() {
  const { postsState } = usePostsContext()
  const { Posts } = postsState



  const [PriorityOrder, setPriorityOrder] = useState(Posts)


  const [publicaciones, setPublicaciones] = useState(false)

  useEffect(() => {
    setPublicaciones(false)
    const sortedArray = [...Posts].sort(sortByPriority);
    const publis = sortedArray.filter((element: { type: string }) => element.type === 'img' || element.type === 'video');
    setPriorityOrder(publis);
    console.log(PriorityOrder)
    setPublicaciones(true)
  }, [Posts])




  return (
    <div className=' p-3 flex gap-4 justify-center  lg:justify-evenly items-center flex-wrap overflow-auto text-white border-b'>

      {
        publicaciones && PriorityOrder.map((publi: any, index: any) => (
          <PubliCard publi={publi} key={index} />
        ))
      }
    </div>
  )
}