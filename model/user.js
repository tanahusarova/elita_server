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
    return pool.query('INSERT INTO users (nickname, mail, password) VALUES ($1, $2, $3) RETURNING *;', [nickname, mail, password])
}

const checkUser = (mail) => {
  let tmp = 'SELECT u.password FROM users u WHERE u.mail = \'' + mail + '\';';
  return pool.query(tmp);
}

const getNicknames = (body) => {
    return pool.query('SELECT u.user_id, u.nickname FROM users u; ');
}

module.exports = {
  addUser,
  checkUser,
  getNicknames
}
