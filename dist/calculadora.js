// Variável que armazena o valor atual do visor da calculadora
var valorVisor = '';
function adicionarNumero(numero) {
    valorVisor += numero; // Adiciona o número ao valor atual do visor
    atualizarVisor();
}
function adicionarOperador(operador) {
    valorVisor += operador; // Adiciona o operador ao valor atual do visor
    atualizarVisor();
}
function calcular() {
    try {
        valorVisor = eval(valorVisor).toString(); // Avalia a expressão matemática e converte para string
        atualizarVisor();
        // Falar o resultado
        falarTexto(valorVisor);
    }
    catch (e) {
        valorVisor = ''; // Limpa o valorVisor
        atualizarVisor();
        // Falar o erro
        falarTexto('Erro');
    }
}
function limparVisor() {
    valorVisor = ''; // Limpa o valor armazenado
    atualizarVisor();
}
function atualizarVisor() {
    var visor = document.getElementById('visor'); // Obtém o campo do visor
    visor.value = valorVisor; // Atualiza o visor com o novo valor
}
function falarTexto(texto) {
    var utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; // Define o idioma para português
    window.speechSynthesis.speak(utterance);
}
// Função para gerar flocos de neve
function createSnowflake() {
    var snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; // Símbolo de floco de neve
    // Definir posição e tamanho aleatórios
    snowflake.style.left = "".concat(Math.random() * window.innerWidth, "px");
    snowflake.style.fontSize = "".concat(Math.random() * 20 + 10, "px");
    // Adicionar floco de neve ao body
    document.body.appendChild(snowflake);
    // Remover o floco de neve após a animação (5 segundos)
    setTimeout(function () {
        snowflake.remove();
    }, 5000);
}
// Função para iniciar a neve
function startSnow() {
    for (var i = 0; i < 100; i++) {
        setTimeout(createSnowflake, i * 100); // Intervalo entre os flocos
    }
}
// Adiciona flocos de neve ao clicar no botão
var snowButton = document.getElementById('snowButton');
if (snowButton) {
    snowButton.addEventListener('click', startSnow);
}
// Adicionar eventos de fala para os botões
document.querySelectorAll('button').forEach(function (button) {
    button.addEventListener('click', function () {
        var label = button.getAttribute('aria-label');
        if (label) {
            falarTexto(label);
        }
    });
});
