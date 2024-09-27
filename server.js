const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Define la ruta donde quieres guardar los archivos
const storagePath = path.join('G:', 'Archivos_iPhone');

// Crear carpetas si no existen
const photosDir = path.join(storagePath, 'fotos');
const videosDir = path.join(storagePath, 'videos');
const filesDir = path.join(storagePath, 'archivos');

// Verificar las carpetas
console.log(`Ruta de almacenamiento: ${storagePath}`); // Verificación

if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
}

if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
}

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

// Configuración de multer para el almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, photosDir); // Guardar en 'fotos'
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, videosDir); // Guardar en 'videos'
        } else {
            cb(null, filesDir); // Guardar en 'archivos'
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Timestamp para evitar conflictos
    },
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Ruta para subir archivos
app.post('/upload', upload.array('files'), (req, res) => {
    res.status(200).send('Archivos subidos correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
