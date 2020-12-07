import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { initLinkGeneration} from '../../../redux/actions/actions';
import './CompressSettings.scss'

const CompressSettings = (props) => {
    const [link, setLink] = useState('#')
    const [compressedImage, setCompressedImage] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [compressInfo, setCompressInfo] = useState('')
    const sendImageToOptimaizer228 = async () => {
        setLoading(true)
        const image = props.modified || props.link
        const data = { image: image.replace(/data:image\/(jpeg|png);base64,/, '') }
        const response = await fetch('https://diploma-backend-compressor.herokuapp.com/api/saveImage', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
            },
        })
        const prepareData = await response.json()
        console.log(prepareData.data)
        setLoading(false)
        setCompressInfo(prepareData.data)
        setCompressedImage(`data:image/png;base64,${prepareData.data.compressImage}`)
    }
    useEffect(() => {
        props.initLinkGeneration()
    }, [])
    const downloadHandler = () => {
        setLink(props.link)
    }
    return (
        <>
        <div className="compress__wrap">
            <button className="button button--success compress__button" disabled={isLoading} onClick={sendImageToOptimaizer228}>Мінімізація</button>
       {isLoading ?<FontAwesomeIcon icon={faSpinner} spin className='input-buttons__spinner icon--xsm' /> : null}
            <a
                download={props.fileName}
                onClick={downloadHandler}
                href={link}
                className="link text--md compress__link"
            >Завантажити</a>
            {compressedImage ?
                <a
                    download={props.fileName}
                    href={compressedImage}
                    className="link text--md compress__link"
                >Завантажити мінімізовану версію</a>
                : null}
        </div>
        {compressedImage?
        <div className="compress__wrap">
            <ul className="text--md">
        <li>Ефективність: {compressInfo.compressPercent} %</li>
        <li>До: {Number.parseFloat(compressInfo.sizeBefore/1024).toFixed(2)} кБайт</li>
        <li>Після: {Number.parseFloat(compressInfo.sizeAfter/1024).toFixed(2)} кБайт</li>
            </ul>
        </div>: null}
        </>
    )
}

const mapStateToProps = state => {
    const { file: { links: { original, modified }, fileName, generated: { link } } } = state
    return {
        original,
        modified,
        fileName,
        link
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initLinkGeneration: () => dispatch(initLinkGeneration())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompressSettings)
