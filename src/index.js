const express = require('express');
const path = require('path')


const app = express()
app.use(express.static('../public'))


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
})

// Routers
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/archivos', (req, res) => {
    res.send("Archivos")
})