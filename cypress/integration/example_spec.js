import 'cypress-react-selector'

before(() => {
    cy.visit('https://andy-mastermind.netlify.app/');
    cy.waitForReact(1000, '#root'); 
  });

describe('renders application', () => {
    it('renders the page from URL', () => {
        cy.visit('https://andy-mastermind.netlify.app/')
    })

    it('increases state on column when clicked', () => {
        cy.react('f')
        cy.waitForReact(1000, '#root'); 
    })
})

describe('renders application', () => {
    it('renders the page from URL', () => {
        cy.visit('https://andy-mastermind.netlify.app/')
    })
})
