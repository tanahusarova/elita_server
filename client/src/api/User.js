function addUser(user) {
    return fetch("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}


function loginUser(user) {
    return fetch("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}

async function checkUser(mail) {
    return fetch(`/users/user/${mail}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error("Error getting user");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting user");
            return [];
        });
}

const getToken = () =>{
    return localStorage.getItem('token');
}

async function getNicknames() {
    return fetch("/users/nicknames", {
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


//upravit na vymazanie, spytat sa
async function deleteEvent(body) {
    return 0;
}



export {getNicknames, addUser, checkUser, loginUser};