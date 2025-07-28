'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function NoImage() {
  const [reloadInterval] = useState(5000); // 5 seconds in milliseconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload(); // Reload the page
    }, reloadInterval);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [reloadInterval]);


  return (
    <div className='relative max-w-[800px] h-full mx-auto'><Image src='/iconos/update.svg' layout='fill' alt='gotito' /></div>
  )
}


export default NoImage