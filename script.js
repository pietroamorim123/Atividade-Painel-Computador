// 1) Função auxiliar para escrever um objeto { rótulo: valor } como linhas de uma tabela
function preencherTabela(id, dados) {
  const tabela = document.getElementById(id);
  if (!tabela) return;
  
  tabela.innerHTML = '';
  for (const [rotulo, valor] of Object.entries(dados)) {
    const linha = tabela.insertRow();
    linha.insertCell().textContent = rotulo;
    linha.insertCell().textContent = valor;
  }
}

// 2) Informações do navegador e sistema
function mostrarSistema() {
  preencherTabela('sistema', {
    'Navegador': navigator.userAgent,
    'Idioma': navigator.language,
    'Núcleos de CPU': navigator.hardwareConcurrency,
    'Memória (GB)': navigator.deviceMemory || 'indisponível neste navegador',
    'Fuso horário': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Online': navigator.onLine ? 'sim' : 'não'
  });
}

// 3) Informações de tela e janela
function mostrarTela() {
  preencherTabela('tela', {
    'Resolução da tela': screen.width + ' x ' + screen.height,
    'Janela do navegador': window.innerWidth + ' x ' + window.innerHeight,
    'Modo escuro': matchMedia('(prefers-color-scheme: dark)').matches ? 'sim' : 'não'
  });
}

// Inicializa as tabelas e adiciona o evento de redimensionamento da janela
mostrarSistema();
mostrarTela();
window.addEventListener('resize', mostrarTela);

// 4) Localização geográfica (pede permissão ao clicar no botão)
const btnLocal = document.getElementById('btn-local');
if (btnLocal) {
  btnLocal.addEventListener('click', function () {
    const saida = document.getElementById('local');
    if (!saida) return;
    
    saida.textContent = 'Buscando...';

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        saida.textContent = 'Latitude: ' + pos.coords.latitude.toFixed(4) + 
          ', Longitude: ' + pos.coords.longitude.toFixed(4);
      },
      function (erro) {
        saida.textContent = 'Não foi possível obter a localização: ' + erro.message;
      }
    );
  });
}

// 5) Arquivos escolhidos pelo usuário

document.getElementById('arquivos').addEventListener('change', function (evento){
    const dados = {};
    for (const arq of evento.target.files){
        dados [arq.name] = (arq.size / 1024).toFixed(1) + ' KB';
    }
    preencherTabela('lista-arquivos', dados);
});