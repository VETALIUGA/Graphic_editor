import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import InputRange from '../../../components/Inputs/InputRange/InputRange'
import useDebounce from '../../../Hooks/useDebounce';
import { setBrightnessValue, setColorCorrectionValues } from '../../../redux/actions/actions';
import './ColorSettings.scss'

const ColorSettings = (props) => {
    const {colorSettings:{blur, brightness, saturation}, inputHandler} = props
    
    return (
        <>
            <InputRange name="blur" inputHandler={inputHandler} range={{ min: '0', max: '10' }} value={blur} />
            <InputRange name="brightness" inputHandler={inputHandler} range={{ min: '0', max: '200' }} value={brightness} />
            <InputRange name="saturation" inputHandler={inputHandler} range={{ min: '0', max: '200' }} value={saturation} />
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setBrightness: value => dispatch(setBrightnessValue(value)),
        setColorCorrection: values => dispatch(setColorCorrectionValues(values))
    }
}

const mapStateToProps = (state) => {
    // const { brightness } = state.color;
    return { ...state.color}
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSettings);
