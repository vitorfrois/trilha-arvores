import { load } from 'js-yaml';

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

function imgHtml(path) {
    html = '<img src="' + path + '" class="rounded-circle"' +
        'style="border-radius:50% !important; width: 100%; aspect-ratio : 1 / 1;">'
    return html
    
}

function descriptionHtml(name, trees, lenght) {
    html = '<div class="text-center justify-content-center p-2">' +
            '<h3 class="fw-bold fs-6">' + name + '</h3>' +
            '<p> <i class="bi bi-tree-fill"></i>' + trees + ' Árvores <i class="bi bi-person-walking"></i>' + lenght + ' km</p> </div>'
    return html
}


function renderTrilhas(data) {
    var trilhaList = document.getElementById('trilhas')
    var trilhas = load(data);
    var array = Object.values(trilhas);

    for (let i = 0; i < array.length; i++) {
        var trilha = trilhas[i];
        
        var card = document.createElement('div')
        card.className = "grid-card card m-2 p-2"
        card.style = "max-width: 100%; background-color: whitesmoke;"
        
        var html = "";
        html += imgHtml(trilha.path)
        html += descriptionHtml(trilha.name, trilha.trees, trilha.lenght);
        card.innerHTML = html;
        trilhaList.appendChild(card);
    }
}

loadYAML('trilhas.yaml', function (error, data) {
    if (error) {
        console.error('Error loading YAML file:', error);
    } else {
        renderTrilhas(data);
    }
});