/* const { Pool } = require('pg');
const queries = require('./queries')
const pool = new Pool({
    host: 'localhost',
    user: 'alex',
    database: 'postgres',
    password: '1234'
}) */

const pool = require('../utils/db_pgsql'); // Conexión a la BBDD
const queries = require('../queries/author.queries'); // Queries SQL
// const { deleteAuthor } = require('../controllers/authorsApiController');

// GET
const getAuthorsByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorsByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE

const updateAuthor = async (author) => {
    const { name, surname, email, image, new_email } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor,[name, surname, email, image, new_email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE

const deleteAuthor = async (author) => {
    const { email } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteAuthor,[email])
        result = data.rowCount
        console.log(email);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const authors = {
    getAuthorsByEmail,
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authors;


// Pruebas
/*
    getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))
*/

/*
getAllEntries()
.then(data=>console.log(data))
*/


// let dataUpdateEntry = {
//     title: "Se suspende primavera sound",
//     new_title: "Se suspende primavera sound por lluvia",
//     content: "Corren rumores de que no habrá fiestón",
//     email: "alejandru@thebridgeschool.es",
//     category: "conciertos"
// }

// updateEntry(dataUpdateEntry)
//     .then(data => console.log(data))

// deleteAuthor({email: "santilemao@thebridgeschool.es"})
//     .then(val => console.log(val))

// let newAuthor = {
//     "name": "LMAOOO",
//     "surname": "LemaGFEH",
//     "email":"santilemao@thebridgeschool.es",
//     "image":"https://w7.pngwing.com/pngs/313/346/png-transparent-handsome-sign-illustration-agar-io-kuso-miso-technique-internet-meme-t-shirt-know-your-meme-thinking-man-face-manga-orange-thumbnail.png",
//     "new_email": "santilemao@thebridgeschool.es"}

// updateAuthor(newAuthor)
//     .then(val => console.log(val))