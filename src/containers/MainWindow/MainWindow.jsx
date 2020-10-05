import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import imageForEdit from '@/assets/test-photo.jpg';
import Header from '../Header/Header';
import SettingsSidebar from '../SettingsSidebar/SettingsSidebar';
import ToolsSidebar from '../ToolsSidebar/ToolsSidebar';
import './MainWindow.scss';
import { setGammaValue } from '../../redux/actions/actions';

const MainWindow = (props) => {
    const isFirst = useRef(true);
    const canvasRef = useRef(null);
    const [value, setValue] = useState({
        blur: 0,
        saturation: 100,
        brightness: 100
    });
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imageForEdit;

        if (isFirst.current) {
            isFirst.current = false;
            image.onload = function () {
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            }
        } else {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        setTimeout(() => {
            // html2canvas(canvasRef.current).then(function(canvas) {
            //     document.body.appendChild(canvas);
            // });
            const img = canvasRef.current.toDataURL('image/png');
            const imgNode = document.createElement('img')
            imgNode.src = img;
            document.body.appendChild(imgNode)
        }, 2000)

        ctx.filter = `blur(${value.blur}px) brightness(${props.brightness}%) saturate(${value.saturation}%)`;
        // ctx.filter = ``;
        // ctx.filter = ``;
        // ctx.fillStyle = `rgba(0, 0, 0, ${value / 100})`;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [value])
    const inputHandler = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
        if(e.target.name === 'brightness') {
            props.onChangeGammaValue(e.target.value)
        }
        

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
                <section className="section canvas__section">
                    <div className="container canvas__container">
                        <div className="canvas__wrap">
                            <canvas
                                ref={canvasRef}
                                width="600px"
                                height="500px"
                                className="canvas"
                            ></canvas>
                        </div>
                        <label>
                            <input type="range" name="blur" onChange={(e) => inputHandler(e)} defaultValue={value.blur} min="0" max="10" />
                            <span>{value.blur}</span>
                        </label>
                        <label>
                            <input type="range" name="saturation" onChange={(e) => inputHandler(e)} defaultValue={value.saturation} max="200" />
                            <span>{value.saturation}</span>
                        </label>
                        <label>
                            <input type="range" name="brightness" onChange={(e) => inputHandler(e)} defaultValue={value.brightness} />
                            <span>{value.brightness}</span>
                        </label>
                    </div>
                </section>
            </main>
            <div className="main-window--right-sidebar">
                <SettingsSidebar brightness = {props.brightness} />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeGammaValue: value => dispatch(setGammaValue(value))
    }
}

const mapStateToProps = (state) => {
    const {brightness} = state.color;
    return { brightness }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);