let container = document.getElementById('coutainer_main')
let nombres = [];
let lista = document.createElement('ul');
let indice = 0;
const colores = [
    '#FAD2E1',
    '#F9B7FF',
    '#FBD3E9',
    '#F8B195',
    '#F5D5CB',
    '#F2D7EE',
    '#E6D5C2',
    '#F9E79F',
    '#FCF3CF',
    '#D1F2A5',
    '#AED6F1',
    '#A2D9CE',
    '#FDEDEC',
    '#D6EAF8',
    '#EBDEF0',
    '#FAD7A0',
    '#EDBB99',
    '#E8DAEF',
    '#EAECEE',
    '#F2D7D5'];
const jsConfetti = new JSConfetti()


fetch('names.txt')
    .then(response => response.text())
    .then(data => {
        nombres = data.split('\n').filter(Boolean);
        nombres.forEach(nombre => {
            let elemento = document.createElement('li');
            let texto = document.createTextNode(nombre);
            elemento.appendChild(texto);
            lista.appendChild(elemento);
        });
        container.appendChild(lista);
    })
    .catch(error => console.error(error));

function rotarNombres() {
    indice = (indice + nombres.length - 1) % nombres.length;
    nombres.forEach((nombre, i) => {
        let elemento = lista.children[i];
        elemento.textContent = nombres[(indice + i) % nombres.length];
    });
}

let intervalId = null;
function empezarRotacion() {
    // Si ya hay una rotación en progreso, detenerla antes de comenzar otra
    detenerRotacion();

    nombres.sort(() => Math.random() - 0.5);

    intervalId = setInterval(rotarNombres,100);
    // Detener la rotación después de 10 segundos
    setTimeout(detenerWinner, 10000);
}

function detenerRotacion() {
    clearInterval(intervalId);
    intervalId = null;
}
function detenerWinner() {
    clearInterval(intervalId);
    intervalId = null;
    jsConfetti.addConfetti({
        emojis: ['🍉', '👺', '💩', '🧠', '🙇‍♀️', '❤️‍🩹', '🐕‍🦺', '🪱', '🦚', '🥟', '🍦', '🏄', '🎿', '⚽', '🚡', '🚤', '🔍', '🖥', '🏳️‍🌈', '🏳️‍🌈', '🏳️‍🌈', '🏳️‍🌈', '🔝', '💾', '💿', '📷', '💻', '📲', '😛', '😝', '🐼', '🐻‍❄️'],
        confettiRadius: 10,
        confettiNumber: 120,
        emojiSize: 50,
    })
}



document.getElementById("rotar").addEventListener("click", empezarRotacion);

let elementos = document.querySelectorAll('ul li');
