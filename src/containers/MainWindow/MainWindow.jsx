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
import RecoverySettings from '../SettingsSets/RecoverySettings/RecoverySettings';
import ColorSettingsCC from '../CanvasControllers/ColorSettingsCC/ColorSettingsCC';
import UploadSettings from '../SettingsSets/UploadSettings/UploadSettings';
import RecoverySettingsCC from '../CanvasControllers/RecoverySettingsCC/RecoverySettingsCC';

const MainWindow = ({ settingValues, original, setColorCorrection, setInitialImage, setActivePreset }) => {
    const [colorSettings, setColorSettings] = useState({
        ...settingValues
    })

    const debouncedColorSettings = useDebounce(colorSettings, 100)

    useEffect(() => {
        const setImage = async () => {
            console.log(imageForEdit);
            await setInitialImage(imageForEdit)
        }
        setImage()
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
                {original ? <CanvasWindow
                    colorSettings={colorSettings} /> : 'Loading...'}
                {/* <Switch>
                    <Route exact path="/">
                        {original ? <CanvasWindow
                            colorSettings={colorSettings} /> : 'Loading...'}
                    </Route>
                    <Route exact path="/color">
                        {original ? <ColorSettingsCC /> : 'Loading...'}
                    </Route>
                    <Route exact path="/recovery">
                        {original ? <RecoverySettingsCC /> : 'Loading...'}
                    </Route>
                </Switch> */}
            </main>
            <div className="main-window--right-sidebar">
                <Switch>
                    <Route exact path="/">
                        <SettingsSidebar title='Завантажити зображення'>
                            <UploadSettings />
                        </SettingsSidebar>
                    </Route>
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
                    <Route exact path="/recovery">
                        <SettingsSidebar title='Відновлення зображення'>
                            <RecoverySettings />
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
    const { original } = state.file.links
    return { settingValues, original }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);