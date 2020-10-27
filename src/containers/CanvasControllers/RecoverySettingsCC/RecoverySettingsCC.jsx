import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setModifiedImage } from '../../../redux/actions/actions';

const RecoverySettingsCC = ({ original, median, setModifiedImage }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        console.log(original);
        const image = new Image()
        image.src = original
        image.onload = async () => {
            console.log('loaded');
            let src = await cv.imread(image);
            console.log('src', src);
            let dst = await new cv.Mat();
            console.log('dst', dst);
            // You can try more different parameters
            await cv.medianBlur(src, dst, +median);
            console.log('median blur');
            await cv.imshow('canvasOutput', dst);
            await src.delete(); dst.delete();
            console.log('finished');
        }
        return () => {setModifiedImage(canvasRef.current.toDataURL('image/png', 1))}
    }, [median])
    return (
        <section className="section canvas__section">
            <div className="container canvas__container">
                <div className="canvas__wrap">
                    <canvas ref={canvasRef} id="canvasOutput"></canvas>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    const { file: { links: { original } } } = state
    const { recovery: { filters: { median } } } = state
    return {
        original,
        median
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModifiedImage: file => dispatch(setModifiedImage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverySettingsCC)