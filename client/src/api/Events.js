const getToken = () =>{
    return localStorage.getItem('token');
}

/*
async function addEventAJAX(event) {
    $.ajax({
        method: "POST",
        url: '/events/event',
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(event),
        success: (response) => {
            return response.json();
        },
        error: (err) => {
            throw new Error(response.status);

        }

    });
}
*/

async function addEvent(event) {
    let response = await fetch("/events/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(event)
    })

    if (response.status === 200) {
        let json = await response.json(); 
        console.log(response.json());
        return json;
    }

    throw new Error(response.status);
}

async function addEventWithParticipants(event) {
    let response = await fetch("/events/eventpar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(event)
    })

    if (response.status === 200) {
        let json = await response.json(); 
        console.log(response.json());
        return json;
    }

    throw new Error(response.status);
}



async function getEvent(id) {
    return fetch(`/events/event/${id}`, {
        headers: {
          Accept: 'application/json',
          Authentication: `Bearer ${getToken()}`,
        }})
    .then(
        (response) => {
            if (!response.ok) {
                throw new Error("tato chyba");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return [];
        });
        
}

async function getEventByDate(id_of_user, id_of_owner, date) {
    return fetch(`/events/event-date?param1=${id_of_user}&param2=${id_of_owner}&param3=${date}`, {
        headers: {
          Accept: 'application/json',
          Authentication: `Bearer ${getToken()}`,
        }}).then(
        (response) => {
            if (!response.ok) {
                throw new Error("Error getting event");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting event");
            return [];
        });
}

async function getEventForCalendar(id_of_user) {
    return fetch(`/events/calendar/${id_of_user}`, {
        headers: {
          Accept: 'application/json',
          Authentication: `Bearer ${getToken()}`,
        }}).then(
        (response) => {
            if (!response.ok) {
                throw new Error("Error getting event");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting event");
            return [];
        });
}

async function updateEvent(id_event, body) {
    return fetch(`/events/update/${id_event}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
            if (!response.ok) {
                throw new Error("tato chyba");
            }
            console.log(response.json());
            return response.json();
        });
}

//upravit na vymazanie, spytat sa
async function deleteEvent(id) {
    fetch(`/events/event/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authentication: `Bearer ${getToken()}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data was successfully deleted:', data);
      })
      .catch(error => {
        console.error('There was a problem deleting the data:', error);
      });
      
}



function addParticipant(body) {
    return fetch("/events/participant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body)
    });
}

function addObserver(event) {
    return fetch("/events/observer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(event)
    });
}

async function getComment(id) {
    return fetch(`/events/comments/${id}`, {
        headers: {
          Accept: 'application/json',
          Authentication: `Bearer ${getToken()}`,
        }}).then(
        (response) => {
            if (!response.ok) {
                throw new Error("tato chyba");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return [];
        });
}

function addComment(comment) {
    return fetch("/events/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authentication: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(comment)
    });
}

export {addEvent, getEvent, getEventByDate, addObserver, updateEvent,
        addParticipant, deleteEvent, getComment, addComment, addEventWithParticipants, getEventForCalendar};