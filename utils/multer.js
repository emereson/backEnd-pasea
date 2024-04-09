import multer from 'multer';

// Configurar el almacenamiento en memoria
const storage = multer.memoryStorage();

// Función para filtrar los archivos
const fileFilter = (req, file, callback) => {
  // Comprobar si el tipo MIME del archivo es una imagen
  if (file.mimetype.startsWith('image/')) {
    // Aceptar el archivo
    callback(null, true);
  } else {
    // Rechazar el archivo con un mensaje de error
    callback(new Error('Solo se permiten archivos de imagen'), false);
  }
};

// Configurar multer con el almacenamiento y el filtro de archivos
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Exportar el middleware de carga de archivos
export { upload };
