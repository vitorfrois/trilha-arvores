class Admin {
    constructor(id, username, password, created_at) {
        this.id = id,
        this.username = username,
        this.password = password,
        this.created_at = created_at       
    }
}

const admins = [];

function create(username, password) {
    const id = admins.lenght + 1;
    const admin = new Admin(id, username, password);
    admins.push(admin);
    return admin;
}

function findByUser(username) {
    const admin = admins.find(
        function(admin) { 
            return username == admin.username;
        }
    );
    return admin;
}

// function authenticate(username, password) {
//     const admin = findByUser(username);
//     if (admin.password == password)
//         return true;
//     return false;
// }
