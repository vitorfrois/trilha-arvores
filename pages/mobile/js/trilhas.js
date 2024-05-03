function loadYAML(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(xhr.statusText, null);
            }
        }
    };
    xhr.open("GET", file, true);
    xhr.send();
}

function trilhaHtml(info) {
    html = '<a href="trilha.html" class="text-decoration-none">' +
        '<div class="container list-i rounded-5 py-3 d-flex mt-4">' +
        '    <div class="imagem">' +
        '        <img src="' + info.image + '" alt="imagem de arvore">' +
        '    </div>' +
        '    <div class="info ms-3 my-1 my-sm-4 my-md-5 row">' +
        '        <div class="info-i col-12">' +
        '            <h2 class="mb-3">' + info.name + '</h2>' +
        '        </div>' +
        '        <div class="info-i col-6">' +
        '            <i class="bi bi-tree-fill"></i>' +
        '            <p> ' + info.trees +' Árvores</p>' +
        '        </div>' + 
        '        <div class="info-i col-6">' +
        '            <i class="bi bi-person-walking"></i>' +
        '            <p>' + info.distance +'Km</p>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</a>'
    return html
}


function renderTrilhas(data) {
    var trilhaList = document.getElementById('trilhas')
    var trilhas = jsyaml.load(data);
    var array = Object.values(trilhas);

    for (let i = 0; i < array.length; i++) {
        
        var card = document.createElement('div')        
        var trilha = array[i];
        var html = trilhaHtml(trilha);
        card.innerHTML = html;
        trilhaList.appendChild(card);
    }
}

loadYAML('/assets/trilhas/trilhas.yaml', function (error, data) {
    if (error) {
        console.error('Error loading YAML file:', error);
    } else {
        renderTrilhas(data);
    }
});