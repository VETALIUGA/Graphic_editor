import React from 'react'
import './ColorSettings.scss'

import InputRange from '../../../components/Inputs/InputRange/InputRange'
import PresetItem from './PresetItem'
import { connect } from 'react-redux'
import { setActivePreset } from '../../../redux/actions/actions'

const ColorSettings = (props) => {
    const { colorSettings: { blur, brightness, saturation, color }, inputHandler, originalImage, presetHandler, presets, activePreset, setActivePreset } = props
    return (
        <>
            <div className="color-settings">
                <InputRange title='блюр' name="blur" dimension='px' inputHandler={inputHandler} range={{ min: '0', max: '10' }} value={blur} />
                <InputRange title='яскравість' name="brightness" dimension='%' inputHandler={inputHandler} range={{ min: '0', max: '200' }} value={brightness} />
                <InputRange title='насиченість' name="saturation" dimension='%' inputHandler={inputHandler} range={{ min: '0', max: '200' }} value={saturation} />
                <InputRange title='гама' name="color" dimension='deg' inputHandler={inputHandler} range={{ min: '0', max: '360' }} value={color} />
            </div>
            <div className="color-settings__presets">
            <span className="color-settings__title text--sm">Готові темплейти</span>
                <div className="color-settings__grid">
                {presets.map((item, index) => {
                    return (
                        <PresetItem
                            id={index}
                            params={item}
                            originalImage={originalImage}
                            key={index}
                            active={activePreset === index}
                            presetHandler={presetHandler}
                            setActiveId={setActivePreset}
                        />
                    )
                })}
                </div>

            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setActivePreset: id => dispatch(setActivePreset(id))
    }
}

const mapStateToProps = (state) => {
    const { settingValues } = state.color
    const { presets, activePreset } = state.preset
    return { settingValues, presets, activePreset }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSettings);
