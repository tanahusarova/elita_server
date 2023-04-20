const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
    console.log('INSERT INTO users (nickname, mail, password) VALUES (\''+ nickname + '\',\''+ mail + '\' , \''+ hashedPass +'\') ON CONFLICT (mail) DO NOTHING;'); 
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
