const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV == "dev" ? false : {
    rejectUnauthorized: false
  }
  /*
  user: 'postgres',
  host: 'localhost',
  database: 'elitadb',
  password: 'heslo1234',
  port: 5432,
  */

});
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 5; // Number of salt rounds to use in the hashing process
  console.log(password);
  console.log(saltRounds);
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function addUser(body) {
    const {nickname, mail, password} = body
    console.log(nickname);

    console.log('heslo je este ok');
    const hashedPass = await hashPassword(password);
    console.log('narazil na problem');

    console.log('INSERT INTO users (nickname, mail, password) VALUES (\''+ nickname + '\',\''+ mail + '\' , \''+ hashedPass +'\') ON CONFLICT (mail) DO NOTHING;'); 
    return pool.query('INSERT INTO users (nickname, mail, password) VALUES ($1, $2, $3) RETURNING *;', [nickname, mail, hashedPass]);
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
