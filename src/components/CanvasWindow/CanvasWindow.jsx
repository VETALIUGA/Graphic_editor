import React, { useEffect, useRef, useState } from 'react'
import imageForEdit from '@/assets/test-photo.jpg'

const CanvasWindow = (props) => {
    const { blur, brightness, saturation } = props.colorSettings;

    const isFirstRender = useRef(true);
    const canvasRef = useRef(null);
    const [link, setLink] = useState('#');


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imageForEdit;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            image.onload = function () {
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                
                // setLink(canvasRef.current.toDataURL('image/png'))
            }
        } else {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            // setLink(canvasRef.current.toDataURL('image/png'))
        }
        

        
        // setTimeout(() => {
        //     const img = canvasRef.current.toDataURL('image/png');
        //     const imgNode = document.createElement('img')
        //     imgNode.src = img;
        //     document.body.appendChild(imgNode)
        // }, 2000)





        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px)`;
        return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [blur, brightness, saturation, canvasRef])
    const downloadHandler = () => {
        setLink(canvasRef.current.toDataURL('image/png'))
    }

    return (
        <section className="section canvas__section">
            <div className="container canvas__container">
                <div className="canvas__wrap">
                    <canvas
                        ref={canvasRef}
                        width="600px"
                        height="500px"
                        className="canvas"
                    ></canvas>
                </div>
                <a download="myImage.png" onClick={downloadHandler} href={link} className="link">Завантажити на компік</a>
            </div>
        </section>
    )
}

export default CanvasWindow;