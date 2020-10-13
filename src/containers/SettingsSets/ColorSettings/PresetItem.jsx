import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { setColorCorrectionValues } from '../../../redux/actions/actions';
import './ColorSettings.scss'

const PresetItem = (props) => {
    const { params: { brightness, saturation, blur, color }, originalImage, params, setActiveId, id, active } = props
    const canvasRef = useRef(null);

    const onClickHandler = () => {
        props.presetHandler(params)
        setActiveId(id)
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = originalImage;

        image.onload = () => {
            canvas.height = image.height;
            canvas.width = image.width;
            ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${color}deg)`;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }

        return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [brightness, saturation, blur, color, canvasRef])

    return (
        <button className={`color-settings__presets-item ${active? 'active' : ''}`}
            onClick={onClickHandler}
        >
            <canvas
                ref={canvasRef}
                width="600px"
                height="500px"
                className="color-settings__presets-image"
            ></canvas>
        </button>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setColorCorrection: values => dispatch(setColorCorrectionValues(values))
    }
}



export default connect(null, mapDispatchToProps)(PresetItem) 