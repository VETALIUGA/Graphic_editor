import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './styles/Global.scss';
import './babel.js';
import imageForEdit from '@/assets/test-photo.jpg';
import MainWindow from './containers/MainWindow/MainWindow';
import { store } from './redux/store';
import {
    BrowserRouter as Router,
  } from "react-router-dom";

const App = () => {
    // const isFirst = useRef(true);
    // const canvasRef = useRef(null);
    // const [value, setValue] = useState({
    //     blur: 0,
    //     saturation: 100,
    //     brightness: 100
    // });
    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const image = new Image();
    //     image.src = imageForEdit;
        
    //     if (isFirst.current) {
    //         isFirst.current = false;
    //         image.onload = function () {
    //             canvas.height = image.height;
    //     canvas.width = image.width;
    //             ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    //         }
    //     } else {
    //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //     }


    //     ctx.filter = `blur(${value.blur}px) brightness(${value.brightness}%) saturate(${value.saturation}%)`;
    //     // ctx.filter = ``;
    //     // ctx.filter = ``;
    //     // ctx.fillStyle = `rgba(0, 0, 0, ${value / 100})`;
    //     // ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    // }, [value])
    // const inputHandler = (e) => {setValue({
    //         ...value,
    //         [e.target.name]: e.target.value
    //     });

    // }
    return (
        <>
        <MainWindow />
        {/* <section className="section canvas__section">
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
                    <input type="range" name="saturation" onChange={(e) => inputHandler(e)} defaultValue={value.saturation} max="200"/>
                    <span>{value.saturation}</span>
                </label>
                <label>
                    <input type="range" name="brightness" onChange={(e) => inputHandler(e)} defaultValue={value.brightness} />
                    <span>{value.brightness}</span>
                </label>
            </div>
        </section> */}
        </>
    )
};

render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('app'));