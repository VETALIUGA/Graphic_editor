import React, { useState } from 'react'
import './CropSettings.scss'
import ReactCrop from 'react-image-crop'
import { connect } from 'react-redux'
import 'react-image-crop/dist/ReactCrop.css'
import { resetCropValues, setCropValues, setInitialImage } from '../../../redux/actions/actions'
import InputRange from '../../../components/Inputs/InputRange/InputRange'
import Input from '../../../components/Inputs/Input/Input'
import InputButtons from '../../../components/Inputs/InputButtons/InputButtons'

const settingsButtons = [
    {
        title: 'Скинути',
        value: 'reset',
    },
    {
        title: 'Підтвердити',
        value: 'accept',
    },
]

const CropSettings = (props) => {

    // console.log(props.crop);
    // const [crop, setCrop] = useState(
    //     {
    //         unit: 'px',
    //         width: 0,
    //         height: 0,
    //         x: 0,
    //         y: 0
    //     }
    // );
    const buttonHandler = (value) => {
        if (value === 'accept') {
            const image = new Image()
            image.src = props.original
            image.onload = () => {
                getCroppedImg(image, props.crop, 'name');
            }

            // save
        } else if (value === 'reset') {
            //reset
            props.resetCropValues({})
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        props.setInitialImage(base64Image)
        return base64Image

        // As a blob
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         blob.name = fileName;
        //         resolve(blob);
        //     }, 'image/jpeg', 1);
        // });
    }

    //   async test() {
    //     const croppedImg = await getCroppedImg(image, crop, fileName);
    //   }

    return (
        <div className="crop__wrap">
            <Input
                title='ширина'
                value={props.crop.width}
                range={{ min: 0, max: props.params.width }}
                dimension={props.crop.unit}
                inputHandler={(e) => props.setCropValues({ ...props.crop, width: +e.target.value })}
            />
            <Input
                title='висота'
                value={props.crop.height}
                range={{ min: 0, max: props.params.height }}
                dimension={props.crop.unit}
                inputHandler={(e) => props.setCropValues({ ...props.crop, height: +e.target.value })}
            />
            <InputButtons settings={settingsButtons} clickHandler={buttonHandler} />
            <pre>
                {JSON.stringify(props.crop, null, 2)}
            </pre>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { original } = state.file.links
    const { params } = state.file
    const { crop } = state
    return { original, crop, params }
}

const mapDispatchToProps = dispatch => {
    return {
        setCropValues: crop => dispatch(setCropValues(crop)),
        resetCropValues: crop => dispatch(resetCropValues(crop)),
        setInitialImage: file => dispatch(setInitialImage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CropSettings)
