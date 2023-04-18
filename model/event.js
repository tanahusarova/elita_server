const { response, query } = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});


const getEventById = (id) => {
    return pool.query('SELECT * FROM events WHERE event_id = $1;', [id]);
}

//potrebujem overit ci ma dany clovek pravo vidiet dany plan a ci chce svoje alebo spolocne
const getEventByDate = (id_of_user, id_of_owner, date) => {

 // let string = 'SELECT * FROM events e, participants p '
 // + 'WHERE e.date_time = \'' + date +'\' AND p.event_id = e.event_id AND p.user_id = '+ id_of_owner +';';

    let string = 'SELECT *' 
         +' FROM events e, observers o, participants p' 
         +' WHERE e.date_time = \''+ date +'\' AND o.event_id = e.event_id'
         +' AND o.user_id = \''+ id_of_user +'\'  AND o.event_id = p.event_id'
          +' AND p.user_id = \''+ id_of_owner +'\';';


  return pool.query(string);

}

const getEventForCalendar = (id_of_user) => {

  // let string = 'SELECT * FROM events e, participants p '
  // + 'WHERE e.date_time = \'' + date +'\' AND p.event_id = e.event_id AND p.user_id = '+ id_of_owner +';';
  
   return pool.query('SELECT e.date_time, e.colour FROM events e, participants p WHERE p.user_id = $1 AND e.event_id = p.event_id;', [id_of_user]);
 
 }

//spytat sa ci viem vratit id
const addEvent = (body) => {
  const {id_of_type, name, from, to, date, colour } = body;
  return pool.query('INSERT INTO events (type_id, name, from_time, to_time, date_time, colour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [id_of_type, name, from, to,  date, colour ]);
}


async function executeQueries(body) {
  // Get a client from the pool
  const client = await pool.connect();
  const{event, participants, observers, comments} = body;
  const {id_of_type, name, from, to, date, colour } = event;
  const {user_id_c, comment} = comments;

  try {
    await client.query('BEGIN');
    console.log('idem generovat');

    var event_id;

    await client.query('INSERT INTO events (type_id, name, from_time, to_time, date_time, colour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING event_id;', [id_of_type, name, from, to,  date, colour ])
    .then((res) => {
      event_id = res.rows[0].event_id;
      console.log(event_id);

    }
    ).catch(e => {
      console.log('padlo');
    })

    participants.forEach(async participant => {
      const{user_id_p} = participant;
      await client.query('INSERT INTO participants (event_id, user_id) VALUES ($1, $2) RETURNING *;', [event_id, user_id_p]);
    });

    observers.forEach(async observer => {
      const{user_id_o, visible} = observer;
      await client.query('INSERT INTO observers (event_id, user_id, visible) VALUES ($1, $2, $3) RETURNING *;', [event_id, user_id_o, visible]);
    });

    if(comment)
       await client.query('INSERT INTO comments (event_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *;', [event_id, user_id_c, comment]);


    // Commit the transaction
    await client.query('COMMIT');
  } catch (e) {
    // Rollback the transaction on error
    await client.query('ROLLBACK');
    throw e;
  } finally {
    // Release the client back to the pool
    client.release();
  }
}



async function updateEvent(event_id, body) {
  const {id_of_type, name, from, to, date, colour, comment, user_id} = body;
  let string = 'UPDATE events SET type_id = ' + id_of_type + ', name = \'' + name + '\', from_time = \''+ from +
                '\', to_time = \''+ to +'\', date_time =\''+ date +'\', colour =\'' + colour + '\' WHERE event_id = '+ event_id + ';';
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(string);
    await client.query('DELETE FROM comments WHERE event_id = '+ event_id + ';');
    if(comment)
        await client.query('INSERT INTO comments (event_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *;' , [event_id, user_id, comment]);
        

    await client.query('COMMIT');

  } catch (e) {
    // Rollback the transaction on error
    await client.query('ROLLBACK');
    throw e;
  } finally {
    // Release the client back to the pool
    client.release();
  }
}


const addParticipant = (body) => {
    const {event_id, user_id} = body;
    return pool.query('INSERT INTO participants (event_id, user_id) VALUES ($1, $2) RETURNING *;', [event_id, user_id]);

}

const addObserver = (body) => {
    const {event_id, user_id, visible} = body;
    return pool.query('INSERT INTO observers (event_id, user_id, visible) VALUES ($1, $2, $3) RETURNING *;', [event_id, user_id, visible]);
}


const deleteEvent = (id) => {
  return pool.query('DELETE FROM events WHERE event_id = $1;', [id]);
}

const getComment = (id) => {
  let string = 'SELECT c.comment, u.nickname, u.user_id FROM comments c, users u WHERE c.user_id = u.user_id AND c.event_id = ' + id + ';'
  return pool.query(string);
}

const addComment = (body) => {
  const {event_id, user_id, comment} = body;
  return pool.query('INSERT INTO comments (event_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *;', [event_id, user_id, comment ]);
}



module.exports = {
  addEvent,
  deleteEvent,
  getEventById,
  updateEvent,
  getEventByDate,
  addParticipant,
  addObserver,
  getComment,
  addComment,
  executeQueries,
  getEventForCalendar
}
