db_queries_authors = {
    getAllAuthors: `SELECT * FROM authors`,
    getAuthorsByEmail: `SELECT * FROM authors
    WHERE email = $1`,
    createAuthor: `INSERT INTO authors(name, surname, email, image)
        VALUES ($1, $2, $3, $4);`,
    updateAuthor: `UPDATE authors
    SET name=$1, surname=$2, id_author=(SELECT id_author FROM authors WHERE email=$3), image=$4
    WHERE email = $5`,
    deleteAuthor: `DELETE FROM authors as e
    WHERE e.email = $1`
}

module.exports = db_queries_authors;