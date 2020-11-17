import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { connect } from 'react-redux'
import { setFilterLoading } from '../../redux/actions/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './CanvasWindow.scss'
import { useLocation } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'

const CanvasWindow = (props) => {
    const [crop, setCrop] = useState();
    const location = useLocation();
    const { blur, brightness, saturation, color } = props.settingValues
    const canvasRef = useRef(null)
    const wrapRef = useRef(null)
    const sectionRef = useRef(null)
    const [link, setLink] = useState('#')
    const [image, setImage] = useState('')
    const [compressedImage, setCompressedImage] = useState('')

    useEffect(() => {
        function handleResize() {
            if (image && location.pathname !== '/crop') {
                const wrapWidth = sectionRef.current.clientWidth
                const wrapHeight = sectionRef.current.clientHeight
                const canvasWidth = wrapRef.current.clientWidth
                const canvasHeight = wrapRef.current.clientHeight
                let scaleValue = wrapHeight / canvasHeight
                if (canvasWidth * scaleValue > wrapWidth) {
                    scaleValue = wrapWidth / canvasWidth
                }
                wrapRef.current.style.transform = `scale(${scaleValue})`
            }

        }

        window.addEventListener('resize', handleResize)
        handleResize()
    }, [image, location])

    useMemo(() => {
        const image = new Image()
        image.src = props.original
        image.onload = () => {
            setImage(image)
            canvasRef.current.height = image.height
            canvasRef.current.width = image.width
        }

        console.log(blur, props.colorSettings.blur);
    }, [props.original])

    useEffect(() => {
        if (image && +props.median !== 1) {
            console.log('call median filter');
            setRecoveryFilters('median')
        }
    }, [props.median])

    useEffect(() => {
        if (image && +props.bilateral !== 0) {
            console.log('call bilateral filter');
            setRecoveryFilters('bilateral')
        }
    }, [props.bilateral])


    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            if (image) {
                setColorFilters(canvas, ctx)
            }
            return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

    }, [blur, brightness, saturation, color, image, location])

    const setColorFilters = (canvas, ctx) => {
        // if (image.height > image.width) {
        //     canvasRef.current.classList.add('canvas__horizontal')
        // } else {
        //     canvasRef.current.classList.remove('canvas__horizontal')
        // }
        // canvas.height = image.height
        // canvas.width = image.width
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }

    const setRecoveryFilters = (option) => {
        const worker = new Worker('./src/static/worker.js')
        const canvas = new OffscreenCanvas(image.width, image.height)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        let imgData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        console.log(imgData);
        worker.onmessage = (e) => {
            if (e.data) {
                cv.imshow('canvasOutput', cv.matFromImageData(e.data));
            } else {
                console.log('щось пішло не так під ча фільтрації')
            }
            props.setFilterLoading(false)
        }

        worker.postMessage([imgData, option, props.filters])
        props.setFilterLoading(true)
    }

    const downloadHandler = () => {
        setLink(canvasRef.current.toDataURL('image/png', 1))
    }

    const sendImageToOptimaizer228 = async () => {
        const data = { image: canvasRef.current.toDataURL('image/jpeg').replace(/data:image\/jpeg;base64,/, '') };
        const response = await fetch('https://diploma-backend-compressor.herokuapp.com/api/saveImage', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
            },
        });
        const prepareData = await response.json();
        console.log(prepareData.data)
        setCompressedImage(`data:image/png;base64,${prepareData.data.compressImage}`);
    }
    return (
        <>
            {
                location.pathname !== '/crop' ?
                    <section className="section canvas__section">
                        <div className="container canvas__container" ref={sectionRef}>
                            {props.isLoading ? <div className="canvas__spinner-wrap">
                                <FontAwesomeIcon icon={faSpinner} spin className="canvas__spinner icon--md" />
                                <span className="canvas__spinner-text text--md">Обробка...</span>
                            </div> : null}
                            <div className="canvas__wrap" ref={wrapRef}>
                                <canvas
                                    ref={canvasRef}
                                    width='1920'
                                    height='1080'
                                    className="canvas"
                                    id='canvasOutput'
                                >
                                </canvas>
                            </div>

                            {/* <img src={compressedImage} alt="" />
                <button onClick={sendImageToOptimaizer228}>ыыы</button>
                <a download={props.fileName} onClick={downloadHandler} href={link} className="link text--md">Завантажити на компік</a> */}
                        </div>
                    </section>
                    :
                    <section className="section crop__section">
                        <div className="container crop__container">
                            <ReactCrop src={props.original} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                        </div>
                    </section>
            }
        </>
    )
}

const mapStateToProps = state => {
    const { file: { links: { original }, fileName } } = state
    const { recovery: { filters: { median, bilateral }, filters, isLoading } } = state
    const { color: { settingValues } } = state
    return {
        original,
        median,
        bilateral,
        isLoading,
        filters,
        fileName,
        settingValues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFilterLoading: bool => dispatch(setFilterLoading(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasWindow);