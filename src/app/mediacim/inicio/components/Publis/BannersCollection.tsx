/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { BannersCard } from './BannersCard';
import { usePostsContext } from '../../hooks/usePosts';

const sortByPriority = (a: { position: number }, b: { position: number }) => {
  if (a.position < b.position) return -1;
  if (a.position > b.position) return 1;
  return 0;
};

export function BannersCollection({ user }: any) {
  const { postsState } = usePostsContext()
  const { Posts } = postsState

  const [PriorityOrder, setPriorityOrder] = useState(Posts)

  useEffect(() => {
    const sortedArray = [...Posts].sort(sortByPriority);
    const banners = sortedArray.filter((element: { type: string }) => element.type === 'banner');
    setPriorityOrder(banners);
  }, [Posts])

  return (
    <div className='p-3 flex gap-4 justify-stretch flex-wrap overflow-auto text-white'>

      {
        PriorityOrder.map((publi: any, index: any) => (
          <BannersCard publi={publi} key={index} user={user} />
        ))
      }
    </div>
  )
}