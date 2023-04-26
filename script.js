const verificaCheck = () => {
  const checado = document.getElementById('agreement');
  if (checado) {
    const botao = document.createElement('button');
    const formulario = document.querySelector('#main-form');
    formulario.appendChild(botao);
    botao.id = 'submit-btn';
    botao.innerText = 'Enviar';
    botao.type = 'submit';
  }
  const btnSubmit = document.querySelector('#submit-btn');
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
  });
};

verificaCheck();
