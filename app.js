const express = require('express')
const cowsay = require('cowsay')

const morgan = require('./utils/morgan')
const error404 = require('./middlewares/error404')

// Módulos de Rutas
const entriesApiRoutes = require('./routes/entriesApiRoutes')
const authorsApiRoutes = require('./routes/authorsApiRoutes')

const app = express()
const port = 3000

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

app.get('/', (req, res) => {
    res.json({msg: "Estas en la home"})
})

//Rutas 
// app.use('/books',booksRoutes); // Books
// app.use('/products',productsRoutes); // Rutas web products
// app.use('/api/products',productsApiRoutes); // Rutas web API products
app.use('/api/entries',entriesApiRoutes); // Rutas API entries
app.use('/api/authors',authorsApiRoutes); // Rutas API authors

app.use(error404); // Middleware Para ruta no encontrada (404)

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e: "oO",
            T: "U "
        }))
})