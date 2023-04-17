const TRYBE_TRAVEL_TITLE = 'h1#title';
const TRYBE_TRAVEL_FORM = 'form#main-form';
const TRYBE_TRAVEL_NAME = 'input#fullName';
const TRYBE_TRAVEL_EMAIL = 'input#email';
const TRYBE_TRAVEL_QUESTION = 'textarea#question';
const TRYBE_TRAVEL_SUBMIT_BUTTON = 'button#submit-btn';
const TRYBE_TRAVEL_CLEAR_BUTTON = 'button#clear-btn';
const TRYBE_TRAVEL_CHECKBOX = 'input#agreement';
const TRYBE_INPUT_DATE = 'input#date';
const TRYBE_INPUT_CHECKBOX = 'input#promo';
const TRYBE_TEXTAREA_TEXT = 'Digite sua resposta vencedora aqui';
const TRYBE_TRAVEL_NUMBER = Math.floor(Math.random() * 500);
const TRYBE_TRAVEL_NEWINPUT = 'p#test' + TRYBE_TRAVEL_NUMBER;

before(() => {
  cy.configureLayoutInspector({
    excludePadding: true,
    threshold: 5,
  });
});

describe('travel-form', () => {
  beforeEach(() => {
    cy.visit('./form.html');
  });

  describe('1 - Crie um título para seu formulário com a tag `h1`', () => {
    it('O título deve possuir a tag `h1` e o id `title`', () => {
      cy.get(TRYBE_TRAVEL_TITLE).should('exist');
    });
    it('Verifica se o texto do título é "Formulário Trybe Travel"', () => {
      cy.get(TRYBE_TRAVEL_TITLE).should('have.text', 'Formulário Trybe Travel');
    });
    it('O formulário deve possuir o id `main-form`', () => {
      cy.get(TRYBE_TRAVEL_FORM).should('exist');
    });
  });

  describe('2 - Implemente o conteúdo do formulário `form`', () => {
    it('Existe um elemento com o id `fullName`', () => {
      cy.get(TRYBE_TRAVEL_NAME).should('exist');
    });
    it('Existe um elemento com o id `email`', () => {
      cy.get(TRYBE_TRAVEL_EMAIL).should('exist');
    });
    it('Existem quatro elementos com o name `destinations`', () => {
      cy.get(TRYBE_TRAVEL_FORM).find('[name="destinations"]').its('length').should('be.gte', 4);
    });
    it('Existe um elemento com o id `question`', () => {
      cy.get(TRYBE_TRAVEL_QUESTION).should('exist');
    });
    it('Existe um elemento com o id `date`', () => {
      cy.get(TRYBE_INPUT_DATE).should('exist');
    });
    it('Existe um elemento com o id `promo`', () => {
      cy.get(TRYBE_INPUT_CHECKBOX).should('exist');
    });
    it('Existe um elemento com o id `agreement`', () => {
      cy.get(TRYBE_TRAVEL_CHECKBOX).should('exist');
    });
  });

  describe('3 - Crie botões para o formulário `form`', () => {
    it('Existe um elemento com a tag `button`', () => {
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).should('exist');
    });
    it('Verifica se o texto do botão é "Enviar"', () => {
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).should('have.text', 'Enviar');
    });
    it('Existe um elemento com o id `submit-btn`', () => {
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).should('exist');
    });
    it('Existe um elemento com o id `clear-btn`', () => {
      cy.get(TRYBE_TRAVEL_CLEAR_BUTTON).should('exist');
    });
  });

  describe('4 - Manipule as informações via javascript', () => {
    it('Verifica o uso do eventPreventDefault()', () => {
      cy.window().then((win) => {
        win.document.erro = 'Erro: A página não pode se atualizar ao clicar no botão Enviar.';
      })
      cy.get(TRYBE_TRAVEL_NAME).type('Teste');
      cy.get(TRYBE_TRAVEL_EMAIL).type('teste@gmail.com');
      cy.get(TRYBE_TRAVEL_QUESTION).type('teste');
      cy.get(TRYBE_INPUT_DATE).type('2023-01-30');
      cy.get(TRYBE_INPUT_CHECKBOX).check();
      cy.get(TRYBE_TRAVEL_CHECKBOX).check();
      cy.get(TRYBE_TRAVEL_SUBMIT_BUTTON).click();
      cy.window().then((win) => {
        expect('Erro: A página não pode se atualizar ao clicar no botão Enviar.').to.equal(win.document.erro);
      })
    })

    it('Verifica se ao clicar no botão limpar os campos limpam.', () => {
      cy.get(TRYBE_TRAVEL_NAME).type('clear Teste');
      cy.get(TRYBE_TRAVEL_EMAIL).type('teste@gmail.com');
      cy.get(TRYBE_TRAVEL_QUESTION).type('teste');
      cy.get(TRYBE_INPUT_DATE).type('2023-01-30');
      cy.get(TRYBE_INPUT_CHECKBOX).check();
      cy.get(TRYBE_TRAVEL_CHECKBOX).check()
      cy.get(TRYBE_TRAVEL_CLEAR_BUTTON).click();
      cy.get(TRYBE_TRAVEL_NAME).should('have.value', '')
    })
  });

  describe('5 - Faça a validação de imagem ao clicar no checkbox correspondente.', () => {
    it('Existe um elemento do tipo checkbox com o id `agreement`', () => {
      cy.get('input#agreement[type="checkbox"]')
        .should('exist');
    });
    it('Antes de marcar o campo de confirmação, o botão de Enviar deve estar desabilitado', () => {
      cy.get('button#submit-btn')
        .should('be.disabled');
    });
    it('Ao marcar o campo de confirmação, o botão de Enviar deve ser habilitado', () => {
      cy.get('input#agreement')
        .check();
      cy.get('button#submit-btn')
        .should('not.be.disabled');
    });
  });

  describe('6 - Faça a validação dos campos do formulário.', () => {
    it('o input "Nome Completo" teve ter no máximo 40 caracteres', () => {
      cy.get(TRYBE_TRAVEL_NAME).type('text'.repeat(11));
      cy.get(TRYBE_TRAVEL_NAME).invoke('val').should((value) => {
        expect(value).to.match(/^[a-z]{40}$/);
      });
    });
    it('o input "E-mail" teve ter no máximo 50 caracteres', () => {
      cy.get(TRYBE_TRAVEL_EMAIL).type('text'.repeat(13));
      cy.get(TRYBE_TRAVEL_EMAIL).invoke('val').should((value) => {
        expect(value).to.match(/^[a-z]{50}$/);
      });
    });
    it('O textarea deve ter no máximo 500 caracteres', () => {
      cy.get(TRYBE_TRAVEL_QUESTION).type('text'.repeat(200));
      cy.get(TRYBE_TRAVEL_QUESTION).invoke('val').should((value) => {
        expect(value).to.match(/^[a-z]{500}$/);
      });
    });
  })
});
