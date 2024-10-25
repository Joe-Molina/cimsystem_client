import Image from 'next/image';
import './vista.css'
import React from 'react';
import { useIpContext } from '../inicio/hooks/useIp';


const ImageOrVideo = ({ currentImage, fadeIn }: any) => {
    const { IpState } = useIpContext()

    if (currentImage.type === "img") {
        return (
            <div className='h-full'>

                <img
                    src={IpState + '/fotos/' + currentImage.name}
                    alt="Image"
                    className={`h-full mx-auto  ${fadeIn}`}
                    key={currentImage.name}
                />
            </div>
        );
    } else {
        return (
            <video src={IpState + '/fotos/' + currentImage.name} className={`h-full mx-auto ${fadeIn}`} muted autoPlay key={currentImage.name} />
        );
    }
};

export default ImageOrVideo;