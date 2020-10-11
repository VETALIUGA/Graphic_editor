import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import imageForEdit from '@/assets/test-photo.jpg';
import Header from '../Header/Header';
import SettingsSidebar from '../SettingsSidebar/SettingsSidebar';
import ToolsSidebar from '../ToolsSidebar/ToolsSidebar';
import ColorSettings from '../SettingsSets/ColorSettings/ColorSettings'
import './MainWindow.scss';
import { setBrightnessValue, setColorCorrectionValues } from '../../redux/actions/actions';
import useDebounce from '../../Hooks/useDebounce';
import CanvasWindow from '../../components/CanvasWindow/CanvasWindow';

const MainWindow = ({ settingValues, setColorCorrection }) => {
    const [colorSettings, setColorSettings] = useState({
        ...settingValues
    })
    const debouncedColorSettings = useDebounce(colorSettings, 100)
    useEffect(() => {
        setColorCorrection({
            ...colorSettings
        })
    }, [debouncedColorSettings])
    const inputHandler = (e) => {
        setColorSettings({
            ...colorSettings,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="main-window">
            <div className="main-window--header">
                <Header />
            </div>
            <div className="main-window--left-sidebar">
                <ToolsSidebar />
            </div>
            <main className="main-window--main">
                <CanvasWindow
                    colorSettings={colorSettings}
                />
            </main>
            <div className="main-window--right-sidebar">
                <SettingsSidebar title='Налаштування фотокорекції'>
                    <ColorSettings
                        inputHandler={inputHandler}
                        colorSettings={colorSettings}
                    />
                </SettingsSidebar>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setColorCorrection: values => dispatch(setColorCorrectionValues(values))
    }
}

const mapStateToProps = (state) => {

    return { ...state.color }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);