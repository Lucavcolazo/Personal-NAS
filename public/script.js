document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();

    for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('files', fileInput.files[i]);
    }

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        // Mostrar mensaje de éxito
        document.getElementById('message').innerText = 'Archivos subidos correctamente';
        
        // Limpiar el input de archivos
        document.getElementById('fileInput').value = '';
        
        // Limpiar la vista previa
        document.getElementById('previewContainer').innerHTML = '';
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error al subir archivos';
        console.error('Error:', error);
    });
});
