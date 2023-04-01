const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'heslo1234',
  port: 5432,
});

const addUser = (body) => {
  return new Promise(function(resolve, reject) {
    const {nickname, mail, password} = body
    pool.query('INSERT INTO users (nickname, mail, password) VALUES ($1, $2, $3) RETURNING *', [nickname, mail, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new observer ${user_id} has been added`)
    })
  })
}

const checkUser = (body) => {
  return new Promise(function(resolve, reject) {
    const {mail} = body
    pool.query('SELECT u.password FROM users u WHERE u.mail = $1', [mail], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`skuska`)
    })
  })
}



module.exports = {
  addUser,
  checkUser
}
