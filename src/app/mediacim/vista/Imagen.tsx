'use client'

import React, { useState, useEffect } from 'react';
import { verificarEstadoActividad } from '../inicio/services/verificarActividad';
import ImageOrVideo from './img';
import { Progress } from "@/components/ui/progress"
import { usePostsContext } from '../inicio/hooks/usePosts';
import { useIpContext } from '../inicio/hooks/useIp';
import { getPosts } from '../inicio/services/Posts';

const ImageRotator = ({ data }: any) => {
    const { IpState } = useIpContext()
    const { setPosts } = usePostsContext()


    const imagenes: any = data

    const [currentImage, setCurrentImage] = useState(imagenes[0]);

    const currentImageIndex = imagenes.findIndex(
        //@ts-ignore
        item => item.name === currentImage.name);

    useEffect(() => {

        const intervalId = setInterval(async () => {

            if ((currentImageIndex + 1) % imagenes.length === 0) {
                // en vez de un location reload podria hacer un una peticion fetch que actualizara el estado de las publicaciones al final de cada ciclo,
                // lo que evitaria la necesidad de tener que recargar la pagina para obtener los nuevos datos
                setPosts(await getPosts(IpState))
                setCurrentImage(imagenes[0]);
                // return location.reload();

            }

            let nextIndex = (currentImageIndex + 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }, currentImage.duration);

        return () => clearInterval(intervalId);


    }, [currentImage.duration, currentImageIndex, imagenes]);

    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === 'ArrowRight') {
            let nextIndex = (currentImageIndex + 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }
        if (event.key === 'ArrowLeft') {
            let nextIndex = (currentImageIndex - 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }
    };

    const [fadeIn, setFadeIn] = useState('fade-in')

    useEffect(() => {

        if (imagenes.length > 1) {
            setFadeIn('fade-in')
        } else {
            setFadeIn('')
        }
    }, [imagenes.length])

    const Timer = () => {
        const total = data.length
        return (
            <div>
                <div className="flex items-center justify-center z-30 absolute border border-white w-10 h-7 rounded-sm top-5 right-3 opacity-70 bg-slate-50 text-neutral-950">{currentImageIndex + 1}/{total}</div>
            </div>
        )
    }

    function ProgressBar() {
        const [progress, setProgress] = useState(0)

        const duracionImg = Number(currentImage.duration)

        const fraccionASumar = 100000 / duracionImg

        const progreso = progress
        setInterval(() => setProgress(() => {

            return progreso + fraccionASumar;
        }), 970)


        return <Progress value={progress} className="w-[100%] z-40 absolute bg-white/10 h-2 opacity-25 dark" />
    }

    return (
        <div className='relative h-full'>
            <Timer />
            {/* <ProgressBar /> */}
            <ImageOrVideo currentImage={currentImage} fadeIn={fadeIn} />
            <button className='absolute h-full w-full  top-0 right-0' onKeyDown={handleKeyPress} ></button>
        </div>
    );
};

export default ImageRotator;