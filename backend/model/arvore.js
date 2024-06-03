class Arvore {
    constructor(id, name, specie, latitude, longitude, photo, created_at) {
        this.id = id, 
        this.name = name, 
        this.specie = specie, 
        this.latitude = latitude, 
        this.longitude = longitude, 
        this.photo = photo, 
        this.created_at = created_at
    }
}

const arvores = [];

function create(name, specie, latitude, longitude, photo){
    const id = arvores.lenght + 1;
    const arvore = new Arvore(name, specie, latitude, longitude, photo);
    arvores.push(arvore);
    return arvore;
}

function findById(id) {
    const arvore = arvores.find(
        function(arvore) { 
            return id == arvore.id;
        }
    );
    return arvore;
}