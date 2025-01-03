import * as tf from '@tensorflow/tfjs';

const video = document.getElementById('camera');
const captureButton = document.getElementById('capture-btn');
const canvas = document.getElementById('snapshot');
const output = document.getElementById('output');
const timeTaken = document.getElementById('time-taken');

// Caminho do modelo treinado (substitua pelo correto)
const MODEL_URL = '/path/to/your/model/model.json';

let model;

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

function captureImage() {
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function loadModel() {
  console.log('Carregando modelo...');
  model = await tf.loadGraphModel(MODEL_URL);
  console.log('Modelo carregado com sucesso!');
}

async function processImage(canvas) {
  const startTime = performance.now();

  // Pré-processar a imagem para o modelo
  const tensor = tf.browser.fromPixels(canvas)
    .resizeNearestNeighbor([224, 224]) // Ajuste ao tamanho esperado pelo modelo
    .toFloat()
    .expandDims(0); // Adiciona batch dimension

  // Inferência do modelo
  const predictions = await model.predict(tensor);
  const result = predictions.dataSync(); // Obtenha os dados do tensor

  tensor.dispose(); // Libere a memória do tensor
  const endTime = performance.now();
  return { result, time: endTime - startTime };
}

captureButton.addEventListener('click', async () => {
  const canvasImage = captureImage();
  const { result, time } = await processImage(canvasImage);

  output.textContent = `Documento identificado: ${result}`;
  timeTaken.textContent = `Tempo para inferência: ${time.toFixed(2)} ms`;
});

(async () => {
  await setupCamera();
  await loadModel();
})();
