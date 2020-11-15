self.importScripts('./opencv.js');
self.addEventListener('message', function (e) {
  console.log('Initial data inside worker', e.data[0]);
  let option = e.data[1];
  let filterValues = e.data[2];
  console.log(filterValues);
  switch (option) {
    case 'bilateral': {
      console.log('bilateral filter');
      return doBilateralFiltration(e.data[0], filterValues.bilateral)
    }
    case 'median': {
      console.log('median filter');
      return doMedianFiltration(e.data[0], filterValues.median)
    }
    default: return self.postMessage(0)
  }

}, false);


function doMedianFiltration(imgData, value) {
  let src = cv.matFromImageData(imgData)
  let dst = new cv.Mat();
  cv.medianBlur(src, dst, +value);
  console.log(dst,src);
  cv.cvtColor(dst, dst, cv.COLOR_RGB2RGBA, 0)
  const arr = new Uint8ClampedArray(dst.data);
  let finalImageData = new ImageData(arr, dst.cols, dst.rows);
  self.postMessage(finalImageData)
  src.delete(); dst.delete();
}

function doBilateralFiltration(imgData, value) {
  let src = cv.matFromImageData(imgData)

  let dst = new cv.Mat()
  let p = 0.1

  let temp1 = new cv.Mat(), temp2 = new cv.Mat(), temp3 = new cv.Mat(), temp4 = new cv.Mat()

  // You can try more different parameters

  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0)
  cv.bilateralFilter(src, temp1, +value, 37.5, 37.5)
  let temp22 = new cv.Mat();
  cv.subtract(temp1, src, temp22);
  cv.add(temp22, new cv.Mat(src.rows, src.cols, src.type(), new cv.Scalar(128, 128, 128, 128)), temp2)
  cv.medianBlur(temp2, temp3, 3);

  let temp44 = new cv.Mat();
  temp3.convertTo(temp44, temp3.type(), 2, -255);
  //2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 256

  cv.add(src, temp44, temp4);

  cv.addWeighted(src, p, temp4, 1 - p, 0.0, dst);

  //Src * (100 - Opacity)
  cv.add(dst, new cv.Mat(src.rows, src.cols, src.type(), new cv.Scalar(10, 10, 10, 0)), dst);
  // src.convertTo(dst, cv.CV_8U, 0, 255)
  // cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB)
  // cv.imshow('canvasOutput', dst);
  cv.cvtColor(dst, dst, cv.COLOR_RGB2RGBA, 0)
  const arr = new Uint8ClampedArray(dst.data);
  let finalImageData = new ImageData(arr, dst.cols, dst.rows);
  // dst.convertTo()
  self.postMessage(finalImageData)
  src.delete(); dst.delete();
}