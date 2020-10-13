import React, { useEffect, useRef, useState } from 'react'
import imageForEdit from '@/assets/test-photo.jpg'

const CanvasWindow = (props) => {
    const { blur, brightness, saturation, color } = props.colorSettings

    const isFirstRender = useRef(true)
    const canvasRef = useRef(null)
    const [link, setLink] = useState('#')


    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const image = new Image()
        image.src = imageForEdit

        if (isFirstRender.current) {
            isFirstRender.current = false
            image.onload = () => {
                canvas.height = image.height
                canvas.width = image.width
                ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            }
        } else {
            ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        }

        
        return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [blur, brightness, saturation, color, canvasRef])

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