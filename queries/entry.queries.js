db_queries_entries = {
    getAllEntries: `SELECT *
    FROM entries
    ORDER BY id_entry ASC`,
    getEntriesByEmail: `
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.title;`,
    updateEntry: `UPDATE entries
	SET title=$1, content=$2, date= NOW(), id_author=(SELECT id_author FROM authors WHERE email=$3), category=$4
	WHERE title = $5;`,
    deleteEntry: `DELETE FROM entries as e
    WHERE e.title = $1`,
    createEntry: `INSERT INTO entries(title, content, date, id_author, category)
        VALUES ($1, $2, (NOW()), (SELECT authors.id_author FROM authors WHERE authors.email = $3), $4);`
}

module.exports = db_queries_entries;