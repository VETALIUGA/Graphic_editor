import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './MainWindow.scss';
import imageForEdit from '@/assets/test-photo.jpg'

import { setActivePreset, setColorCorrectionValues, setInitialImage } from '../../redux/actions/actions';
import useDebounce from '../../hooks/useDebounce';

import Header from '../Header/Header';
import SettingsSidebar from '../SettingsSidebar/SettingsSidebar';
import ToolsSidebar from '../ToolsSidebar/ToolsSidebar';
import ColorSettings from '../SettingsSets/ColorSettings/ColorSettings'
import CanvasWindow from '../../components/CanvasWindow/CanvasWindow';
import { Route, Switch } from 'react-router-dom';
import CropSettings from '../SettingsSets/CropSettings/CropSettings';

const MainWindow = ({ settingValues, setColorCorrection, setInitialImage, setActivePreset }) => {
    const [colorSettings, setColorSettings] = useState({
        ...settingValues
    })

    const debouncedColorSettings = useDebounce(colorSettings, 100)

    useEffect(() => {
        console.log(imageForEdit);
        setInitialImage(imageForEdit)
    }, [imageForEdit])

    useEffect(() => {
        setColorCorrection({
            ...colorSettings
        })
    }, [debouncedColorSettings])

    const inputHandler = (e) => {
        setActivePreset(null)
        setColorSettings({
            ...colorSettings,
            [e.target.name]: e.target.value
        });
    }

    const presetHandler = (colorSettings) => {
        setColorSettings({
            ...colorSettings
        })
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

                <Switch>
                    <Route exact path="/color">
                        <SettingsSidebar title='Налаштування фотокорекції'>
                            <ColorSettings
                                presetHandler={presetHandler}
                                inputHandler={inputHandler}
                                colorSettings={colorSettings}
                                originalImage={imageForEdit}
                            />
                        </SettingsSidebar>
                    </Route>
                    <Route exact path="/crop">
                        <SettingsSidebar title='Обрізання зображення'>
                            <CropSettings />
                        </SettingsSidebar>
                    </Route>
                </Switch>

            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setColorCorrection: values => dispatch(setColorCorrectionValues(values)),
        setInitialImage: src => dispatch(setInitialImage(src)),
        setActivePreset: id => dispatch(setActivePreset(id))
    }
}

const mapStateToProps = (state) => {
    const { settingValues } = state.color
    return { settingValues }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);