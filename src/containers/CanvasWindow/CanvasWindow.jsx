import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { connect } from 'react-redux'
import { setBilateralValue, setCanvasRef, setCropValues, setFilterLoading, setGeneratedLink, setImageParams, setMedianValue, setModifiedImage } from '../../redux/actions/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './CanvasWindow.scss'
import { useLocation } from 'react-router-dom'

const CanvasWindow = (props) => {
    const location = useLocation();
    const { blur, brightness, saturation, color } = props.settingValues
    const canvasRef = useRef(null)
    const wrapRef = useRef(null)
    const sectionRef = useRef(null)
    const [image, setImage] = useState('')

    const handleResize = useCallback(() => {
        const wrapWidth = sectionRef.current.clientWidth
        const wrapHeight = sectionRef.current.clientHeight
        const canvasWidth = wrapRef.current.clientWidth
        const canvasHeight = wrapRef.current.clientHeight
        let scaleValue = wrapHeight / canvasHeight
        if (canvasWidth * scaleValue > wrapWidth) {
            scaleValue = wrapWidth / canvasWidth
        }
        wrapRef.current.style.transform = `scale(${scaleValue})`
    }, [])



    useEffect(() => {
        window.addEventListener('resize', handleResize, false)

        if (location.pathname === '/crop') {
            window.removeEventListener('resize', handleResize, false)
        } else {
            setTimeout(handleResize, 0)
        }
    }, [image, location.pathname])

    useEffect(() => {
        console.log('generate')
        props.setGeneratedLink(canvasRef.current.toDataURL('image/png', 1))
    }, [props.isProcessing])

    useMemo(() => {
        const image = new Image()
        image.src = props.modified || props.original
        image.onload = () => {
            setImage(image)
            // canvasRef.current.height = image.height
            // canvasRef.current.width = image.width
            props.setImageParams({
                width: image.width,
                height: image.height
            })
        }
        // console.log(blur, props.colorSettings.blur);
    }, [props.original, props.modified, props.median, props.bilateral])

    useEffect(() => {
        if (image) {
            if (+props.median !== 1) {
                console.log('call median filter');
                setRecoveryFilters('median')
                props.onSetBilateralValue(0)
            } else {
                // const canvas = canvasRef.current
                // const ctx = canvas.getContext('2d')
                // setColorFilters(canvas, ctx)
                props.onSetModifiedImage("")
            }
        }

    }, [props.median])

    useEffect(() => {
        if (image) {
            if (+props.bilateral !== 0) {
                console.log('call bilateral filter');
                setRecoveryFilters('bilateral')
                props.onSetMedianValue(1)
            } else {
                // const canvas = canvasRef.current
                // const ctx = canvas.getContext('2d')
                // setColorFilters(canvas, ctx)
                props.onSetModifiedImage("")
            }
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
        canvas.height = image.height
        canvas.width = image.width
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }

    const setRecoveryFilters = (option) => {
        const worker = new Worker('./src/static/worker.js')
        const canvas = new OffscreenCanvas(image.width, image.height)
        canvas.id = 'canvasOffScreen'
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        let imgData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        console.log(imgData);
        worker.onmessage = (e) => {
            if (e.data) {
                // cv.imshow('canvasOutput', cv.matFromImageData(e.data));
                const ctx = canvasRef.current.getContext('2d')
                ctx.putImageData(e.data, 0, 0)
                props.onSetModifiedImage(canvasRef.current.toDataURL('image/jpeg'))
            } else {
                console.log('щось пішло не так під ча фільтрації')
            }
            props.setFilterLoading(false)

        }

        worker.postMessage([imgData, option, props.filters])
        props.setFilterLoading(true)
    }

    // const downloadHandler = () => {

    //     setLink(props.canvasRef.toDataURL('image/png', 1))
    // }

    // const sendImageToOptimaizer228 = async () => {
    //     const data = { image: canvasRef.current.toDataURL('image/jpeg').replace(/data:image\/jpeg;base64,/, '') };
    //     const response = await fetch('https://diploma-backend-compressor.herokuapp.com/api/saveImage', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
    //         },
    //     });
    //     const prepareData = await response.json();
    //     console.log(prepareData.data)
    //     setCompressedImage(`data:image/png;base64,${prepareData.data.compressImage}`);
    // }

    return (
        <>
            {
                location.pathname !== '/crop' ?
                    <section className="section canvas__section">
                        <div className="container canvas__container" ref={sectionRef}>
                            {props.isLoading ? <div className="canvas__spinner-wrap">
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    className="canvas__spinner icon--md"
                                />
                                <span className="canvas__spinner-text text--md">Обробка...</span>
                            </div> : null}
                            <div className="canvas__wrap" ref={wrapRef}>
                                <canvas
                                    ref={canvasRef}
                                    // width='1920'
                                    // height='1080'
                                    className="canvas"
                                    id='canvasOutput'
                                >
                                </canvas>
                            </div>

                            {/* <img src={compressedImage} alt="" />
                            <button onClick={sendImageToOptimaizer228}>Мінімізація</button>
                            <a
                                download={props.fileName}
                                onClick={downloadHandler}
                                href={link}
                                className="link text--md">
                                Завантажити
                                </a> */}
                        </div>
                    </section>
                    :
                    <section className="section crop__section">
                        <div className="container crop__container">
                            <ReactCrop
                                src={props.modified || props.original}
                                crop={props.crop}
                                onChange={newCrop => props.setCropValues(newCrop)}
                            />
                        </div>
                    </section>
            }
        </>
    )
}

const mapStateToProps = state => {
    const { file: { links: { original, modified }, generated: { isProcessing }, fileName } } = state
    const { recovery: { filters: { median, bilateral }, filters, isLoading } } = state
    const { color: { settingValues } } = state
    const { crop } = state
    return {
        original,
        modified,
        median,
        bilateral,
        isLoading,
        filters,
        fileName,
        settingValues,
        crop,
        isProcessing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFilterLoading: bool => dispatch(setFilterLoading(bool)),
        setCropValues: crop => dispatch(setCropValues(crop)),
        setImageParams: params => dispatch(setImageParams(params)),
        setGeneratedLink: link => dispatch(setGeneratedLink(link)),
        onSetMedianValue: (value) => dispatch(setMedianValue(value)),
        onSetBilateralValue: (value) => dispatch(setBilateralValue(value)),
        onSetModifiedImage: (link) => dispatch(setModifiedImage(link))
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(CanvasWindow);