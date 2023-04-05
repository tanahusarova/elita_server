const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'elitadb',
  password: 'heslo1234',
  port: 5432,
});

const addUser = (body) => {
    const {nickname, mail, password} = body
    return pool.query('INSERT INTO users (nickname, mail, password) VALUES ($1, $2, $3) RETURNING *', [nickname, mail, password])
}

const checkUser = (body) => {
  const {mail} = body
  return pool.query('SELECT u.password FROM users u WHERE u.mail = $1', [mail]);
}

const getNicknames = (body) => {
    return pool.query('SELECT u.nickname FROM users u; ');
}

module.exports = {
  addUser,
  checkUser,
  getNicknames
}
