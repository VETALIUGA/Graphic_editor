import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import { connect } from 'react-redux'
import 'react-image-crop/dist/ReactCrop.css'

const CropSettings = (props) => {
    const [crop, setCrop] = useState();
    return (
        <div>
            <pre>
            {JSON.stringify(crop, null, 2)}
            </pre>
            <ReactCrop src={props.original} crop={crop} onChange={newCrop => setCrop(newCrop)}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { original } = state.file.links
    return { original }
}

export default connect(mapStateToProps)(CropSettings)
