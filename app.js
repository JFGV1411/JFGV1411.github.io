const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar la imagen con una marca de tiempo
  },
});

const upload = multer({ storage: storage });

// Ruta para mostrar la página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la carga de imágenes
app.post('/upload', upload.single('imagen'), (req, res) => {
  res.send('Imagen subida correctamente');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

