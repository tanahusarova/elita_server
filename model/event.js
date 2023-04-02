const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'heslo1234',
  port: 5432,
});



const getEventById = (id_of_event) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM events WHERE event_id = $1', [id_of_event], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

//potrebujem overit ci ma dany clovek pravo vidiet dany plan a ci chce svoje alebo spolocne
const getEventByDate = (id_of_user, id_of_owner, date) => {
  if (id_of_user !== id_of_owner) {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT *' 
      +' FROM events e, observers o, participants p' 
      +' WHERE e.date_time = $1 AND o.event_id = e.event_id'
      +' AND o.user_id = $2 AND o.event_id = p.event_id'
      +' AND p.user_id = $3 AND o.visible = TRUE',
          [date, id_of_user, id_of_owner], (error, results) => {
            if (error) {
              reject(error)
            }
            resolve(results.rows);
          })
    }) }

  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM events e, participants p '
    + 'WHERE e.date_time = $1 AND p.event_id = e.event_id AND p.user_id = $2',
        [date, id_of_owner], (error, results) => {
          if (error) {
            reject(error)
          }
          resolve(results.rows);
        })
  })


}

const addEvent = (body) => {
  return new Promise(function(resolve, reject) {
    const {id_of_type, name, from, to, date, colour } = body
    pool.query('INSERT INTO events (type_id, name, from_time, to_time, date_time, colour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id_of_type, name, from, to,  date, colour ], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new event ${name} has been added`)
    })
  })
}

const addParticipant = (body) => {
  return new Promise(function(resolve, reject) {
    const {event_id, user_id} = body
    pool.query('INSERT INTO participants (event_id, user_id) VALUES ($1, $2) RETURNING *', [event_id, user_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new participant ${event_id} has been added`)
    })
  })
}

const addObserver = (body) => {
  return new Promise(function(resolve, reject) {
    const {event_id, user_id, visible} = body
    pool.query('INSERT INTO observers (event_id, user_id, visible) VALUES ($1, $2, $3) RETURNING *', [event_id, user_id, visible], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new observer ${user_id} has been added`)
    })
  })
}


const deleteEvent = (id) => {
  return new Promise(function(resolve, reject) {
//    const id = parseInt(request.params.id)
    pool.query('DELETE FROM events WHERE event_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Event deleted`)
    })
  })
}



module.exports = {
  addEvent,
  deleteEvent,
  getEventById,
  getEventByDate,
  addParticipant,
  addObserver
}
