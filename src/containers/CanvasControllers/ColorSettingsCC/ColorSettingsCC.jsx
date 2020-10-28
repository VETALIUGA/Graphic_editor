import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import CanvasWindow from '../../../components/CanvasWindow/CanvasWindow'
import { setModifiedImage } from '../../../redux/actions/actions'
import imageForEdit from '@/assets/test-photo.jpg'

const ColorSettingsCC = (props) => {
    const { blur, brightness, saturation, color } = props.settingValues

    const isFirstRender = useRef(true)
    const canvasRef = useRef(null)

    useEffect(() => {
        let ctx, canvas;
        const image = new Image()
        image.src = props.original
        if (isFirstRender.current) {
            // isFirstRender.current = false
            image.onload = () => {
                canvas = new OffscreenCanvas(image.width, image.height)
                console.log(image.width, image.height);
                ctx = canvas.getContext('2d')
                canvas.height = image.height
                canvas.width = image.width
                ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                let canvasOn = canvasRef.current
                canvasOn.height = image.height
                canvasOn.width = image.width
                canvasOn = canvasOn.getContext('2d')
                canvasOn.drawImage(canvas, 0, 0)
            }
        } else {
            ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            const canvasOn = canvasRef.current.getContext('2d')
            canvasOn.drawImage(canvas, 0, 0)
        }
        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            props.setModifiedImage(canvasRef.current.toDataURL('image/png', 1))
            // const canvas = canvasRef.current
            // const ctx = canvas.getContext('2d')
            // const image = new Image()
            // image.src = props.original
            // if (isFirstRender.current) {
            //     isFirstRender.current = false
            //     image.onload = () => {
            //         canvas.height = image.height
            //         canvas.width = image.width
            //         ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
            //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            //     }
            // } else {
            //     ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
            //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            // }

            // return () => {
            //     ctx.clearRect(0, 0, canvas.width, canvas.height)
            //     props.setModifiedImage(canvasRef.current.toDataURL('image/png', 1))
        }
    }, [blur, brightness, saturation, color, canvasRef])
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
            </div>
        </section>
    )
}

const mapStateToProps = ({ file: { links: { original, modified } }, color: { settingValues } }) => {
    return {
        original,
        modified,
        settingValues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModifiedImage: file => dispatch(setModifiedImage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSettingsCC)