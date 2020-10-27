import React from 'react'
import { connect } from 'react-redux'
import { setInitialImage } from '../../../redux/actions/actions';

const UploadSettings = ({ setInitialImage }) => {
    const inputHandler = (e) => {
        setInitialImage(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <input style={{width: '100%'}} type="file" name="" id="" onChange={(e) => inputHandler(e)} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setInitialImage: file => dispatch(setInitialImage(file))
    }
}

export default connect(null, mapDispatchToProps)(UploadSettings)