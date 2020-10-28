import React, { useEffect, useMemo, useRef, useState } from 'react'
import imageForEdit from '@/assets/test-photo.jpg'
import ReactCrop from 'react-image-crop'
import { connect } from 'react-redux'

const CanvasWindow = (props) => {
    const { blur, brightness, saturation, color } = props.colorSettings
    const canvasRef = useRef(null)
    const [link, setLink] = useState('#')
    const [image, setImage] = useState('')

    useMemo(() => {
        const image = new Image()
        image.src = props.original
        image.onload = () => setImage(image)
    }, [props.original])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (image) {
            setColorFilters(canvas, ctx)
            setRecoveryFilters()
        }
        return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [blur, brightness, saturation, color, image, props.median])

    
    const setColorFilters = (canvas, ctx) => {
        canvas.height = image.height
        canvas.width = image.width
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }

    const setRecoveryFilters = () => {
        let src = cv.imread(canvasRef.current);
        let dst = new cv.Mat();
        // You can try more different parameters
        cv.medianBlur(src, dst, +props.median);
        console.log(dst,src);
        cv.imshow('canvasOutput', dst);
        src.delete(); dst.delete();
    }

    const downloadHandler = () => {
        setLink(canvasRef.current.toDataURL('image/png', 1))
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
                        id='canvasOutput'
                    ></canvas>
                </div>
                <a download="myImage" onClick={downloadHandler} href={link} className="link text--md">Завантажити на компік</a>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    const { file: { links: { original } } } = state
    const { recovery: { filters: { median } } } = state
    return {
        original,
        median
    }
}

export default connect(mapStateToProps)(CanvasWindow);