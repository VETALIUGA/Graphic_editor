import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { resetColorCorrectionValues, resetRecoveryFilters, setActivePreset, setInitialImage } from '../../../redux/actions/actions';

import './UploadSettings.scss';

const images = [
    '/src/assets/examples/subway.jpg',
    '/src/assets/examples/forest.jpg',
    '/src/assets/examples/skyscraper.jpg',
    '/src/assets/examples/parrot.jpg'
]

const UploadSettings = ({ setInitialImage, resetRecoveryFilters, resetColorCorrectionValues, original }) => {
    const [activeImg, setActiveImg] = useState(null)
    const [fileName, setFileName] = useState('Оберіть зображення у форматі png, jpeg, webp')
    const [isDrag, setIsDrag] = useState(false)
    const inputHandler = (e) => {
        if (e.target.files[0]) {
            setInitialImage(URL.createObjectURL(e.target.files[0]))
            resetColorCorrectionValues()
            resetRecoveryFilters()
            const pathArr = e.target.value.split("\\")
            setFileName(pathArr[pathArr.length - 1])
            setIsDrag(false)
            setActiveImg(null)
            
        }
    }

    const buttonHandler = (e, index) => {
        console.log(e.target.src === original);
        if (original !== e.target.src) {
            resetColorCorrectionValues()
            setInitialImage(e.target.src)
            setActiveImg(index)
            setFileName('Оберіть зображення у форматі png, jpeg, webp')
            
        }
    }

    return (
        <>
            <div className="upload-settings">
                <label
                    className="upload-settings__label"
                    onDragEnter={() => setIsDrag(true)}
                    onDragLeave={() => setIsDrag(false)}
                >

                    <input
                        className="upload-settings__input"
                        type="file"
                        onChange={(e) => inputHandler(e)}
                        aria-label={fileName}
                    />
                    <div className={`upload-settings__overlay ${isDrag ? 'drag' : ''}`}>
                        {activeImg === null ?
                            <FontAwesomeIcon className="upload-settings__overlay-icon icon--md" icon={faEdit} />
                            :
                            <FontAwesomeIcon className="upload-settings__overlay-icon icon--md" icon={faPlus} />
                        }
                        <span className="upload-settings__overlay-text text--sm">{fileName}</span>
                    </div>
                </label>
            </div>
            <div className="upload-presets">
                <div className="upload-presets__wrap">
                    <span className="upload-presets__title text--sm">оберіть серед існуючих</span>
                    <div className="upload-presets__grid">
                        {images.map((item, index) => (
                            <button key={index} onClick={e => buttonHandler(e, index)} className={`upload-presets__item ${activeImg === index ? 'active' : ''}`}>
                                <img className="upload-presets__image" src={item} alt="image" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setInitialImage: file => dispatch(setInitialImage(file)),
        resetRecoveryFilters: () => dispatch(resetRecoveryFilters()),
        resetColorCorrectionValues: () => dispatch(resetColorCorrectionValues())
    }
}

const mapStateToProps = ({ file: { links: { original } } }) => {
    return {
        original
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadSettings)