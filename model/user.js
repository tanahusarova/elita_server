const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 5; // Number of salt rounds to use in the hashing process
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function addUser(body) {
    const {nickname, mail, password} = body
    const hashedPass = await hashPassword(password);
    return pool.query('INSERT INTO users (nickname, mail, password) VALUES ($1, $2, $3) ON CONFLICT (mail) DO NOTHING;', [nickname, mail, hashedPass]);
}

const checkUser = (mail) => {
  let tmp = 'SELECT u.password, u.user_id FROM users u WHERE u.mail = \'' + mail + '\';';
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
