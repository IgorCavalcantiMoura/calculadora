// Variável que armazena o valor atual do visor da calculadora
let valorVisor: string = '';

function adicionarNumero(numero: string): void {
    valorVisor += numero; // Adiciona o número ao valor atual do visor
    atualizarVisor();
}

function adicionarOperador(operador: string): void {
    valorVisor += operador; // Adiciona o operador ao valor atual do visor
    atualizarVisor();
}

function calcular(): void {
    try {
        valorVisor = eval(valorVisor).toString(); // Avalia a expressão matemática e converte para string
        atualizarVisor();

        // Falar o resultado
        falarTexto(valorVisor);
    } catch (e) {
        valorVisor = ''; // Limpa o valorVisor
        atualizarVisor();

        // Falar o erro
        falarTexto('Erro');
    }
}

function limparVisor(): void {
    valorVisor = ''; // Limpa o valor armazenado
    atualizarVisor();
}

function atualizarVisor(): void {
    const visor = document.getElementById('visor') as HTMLInputElement; // Obtém o campo do visor
    visor.value = valorVisor; // Atualiza o visor com o novo valor
}

function falarTexto(texto: string): void {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; // Define o idioma para português
    window.speechSynthesis.speak(utterance);
}

// Função para gerar flocos de neve
function createSnowflake(): void {
    const snowflake: HTMLDivElement = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; // Símbolo de floco de neve

    // Definir posição e tamanho aleatórios
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;

    // Adicionar floco de neve ao body
    document.body.appendChild(snowflake);

    // Remover o floco de neve após a animação (5 segundos)
    setTimeout((): void => {
        snowflake.remove();
    }, 5000);
}

// Função para iniciar a neve
function startSnow(): void {
    for (let i = 0; i < 100; i++) {
        setTimeout(createSnowflake, i * 100); // Intervalo entre os flocos
    }
}

// Adiciona flocos de neve ao clicar no botão
const snowButton: HTMLElement | null = document.getElementById('snowButton');
if (snowButton) {
    snowButton.addEventListener('click', startSnow);
}

// Adicionar eventos de fala para os botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const label = button.getAttribute('aria-label');
        if (label) {
            falarTexto(label);
        }
    });
});
