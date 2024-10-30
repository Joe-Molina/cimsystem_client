'use client'

import Image from 'next/image'
import React from 'react'
import IconNavFunction from './nav/IconNav'
import IconNavLink from './nav/IconNavLink'

export default function Nav() {
  return (
    <aside className="sm:flex [grid-area:aside] md:flex-col flex overflow-y-auto bg-neutral-950 text-white items-center border-r border-neutral-700  sticky lg:relative z-40  top-0" >

      <span className='w-full bg-neutral-900 border-b border-neutral-700'><Image src="/media.png" alt="" width={50} height={50} /></span>



    </aside>
  )
}