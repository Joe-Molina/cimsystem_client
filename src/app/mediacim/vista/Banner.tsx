'use client'

import { useEffect, useState } from "react";
import { verificarEstadoActividad } from "../inicio/services/verificarActividad";


export const Banner = ({ data }: any) => {

    const banners: any = data

    const [currentImage, setCurrentImage] = useState(banners[0]);

    const currentImageIndex = banners.findIndex(
        //@ts-ignore
        item => item.name === currentImage.name);

    useEffect(() => {



        const intervalId = setInterval(() => {

            // console.log((currentImageIndex + 1) % banners.length)

            if ((currentImageIndex + 1) % banners.length === 0) {
                return setCurrentImage(banners[0])
            }

            let nextIndex = (currentImageIndex + 1) % banners.length;
            setCurrentImage(banners[nextIndex]);


        }, currentImage.duration);

        return () => clearInterval(intervalId);


    }, [currentImage.duration, currentImageIndex]);

    return (
        <div className='m-2 bg-neutral-950 rounded-sm border border-neutral-600 marquee w-full flex items-center'><img src="/media.png" alt="" className='h-7 w-10 rounded-md shadow-lg z-40 px-2 over bg-neutral-950' /><p className='text-3xl font-bold duration-700'>{currentImage.name}</p></div>
    )
}