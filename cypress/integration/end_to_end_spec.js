describe('renders columns that updates state when up and down arrows are clicked', () => {

    before(() => {
        cy.visit('https://andy-mastermind.netlify.app/');
        cy.waitForReact(1000, '#root');
    });

    it('renders the page from URL', () => {
        cy.visit('https://andy-mastermind.netlify.app/')
    })

    it('renders all four columns with zero initially', () => {
        cy.get('[data-CombinationColumn="0"]').contains('0')
        cy.get('[data-CombinationColumn="1"]').contains('0')
        cy.get('[data-CombinationColumn="2"]').contains('0')
        cy.get('[data-CombinationColumn="3"]').contains('0')
    })

    it('increases state on column when up arrow is clicked', () => {
        cy.get('[data-UpArrow="0"]').click()
        cy.get('[data-UpArrow="1"]').click()
        cy.get('[data-UpArrow="2"]').click()
        cy.get('[data-UpArrow="3"]').click()

        cy.get('[data-CombinationColumn="0"]').contains('1')
        cy.get('[data-CombinationColumn="1"]').contains('1')
        cy.get('[data-CombinationColumn="2"]').contains('1')
        cy.get('[data-CombinationColumn="3"]').contains('1')
    })

    it('goes back to zero if the value is increased past 7', () => {

        for (let i = 0; i <= 7; i++) {
            cy.get('[data-UpArrow="0"]').click()
            cy.get('[data-UpArrow="1"]').click()
            cy.get('[data-UpArrow="2"]').click()
            cy.get('[data-UpArrow="3"]').click()
        }

        cy.get('[data-CombinationColumn="0"]').contains('1')
        cy.get('[data-CombinationColumn="1"]').contains('1')
        cy.get('[data-CombinationColumn="2"]').contains('1')
        cy.get('[data-CombinationColumn="3"]').contains('1')
    })

    it('decreases state on column when down arrow is clicked', () => {
        cy.get('[data-DownArrow="0"]').click()
        cy.get('[data-DownArrow="1"]').click()
        cy.get('[data-DownArrow="2"]').click()
        cy.get('[data-DownArrow="3"]').click()

        cy.get('[data-CombinationColumn="0"]').contains('0')
        cy.get('[data-CombinationColumn="1"]').contains('0')
        cy.get('[data-CombinationColumn="2"]').contains('0')
        cy.get('[data-CombinationColumn="3"]').contains('0')
    })

    it('goes back to zero if the value is increased past 7', () => {

        cy.get('[data-DownArrow="0"]').click()
        cy.get('[data-DownArrow="1"]').click()
        cy.get('[data-DownArrow="2"]').click()
        cy.get('[data-DownArrow="3"]').click()


        cy.get('[data-CombinationColumn="0"]').contains('7')
        cy.get('[data-CombinationColumn="1"]').contains('7')
        cy.get('[data-CombinationColumn="2"]').contains('7')
        cy.get('[data-CombinationColumn="3"]').contains('7')
    })
})

describe('gives user information about each guess', () => {

    it('renders loading to the screen while secret code is being generated', () => {
        cy.waitForReact(1000, '#root');
        cy.getReact('OpenButton');
    })

    it('generates a secret code', () => {
        cy.getReact('Vault').getProps('secretCode')
    })

    it('renders a hint when a guess is submitted', () => {
        cy.get('[data-cy="OpenButton"]').click()

        cy.getReact('Hint')
    })
})

describe('the toggle mode button toggles the mode', () => {

    it('renders mode toggle button to the screen', () => {
        cy.waitForReact(1000, '#root');
        cy.get('[data-cy="SwitchModeButton"')
    })

    it('starts out in hard mode then toggles to classic when pressed', () => {
        cy.getReact('Vault').getProps('classicMode').should('eq', false)
        cy.get('[data-cy="SwitchModeButton"').click()
        cy.wait(500)
        cy.getReact('Vault').getProps('classicMode').should('eq', true)
    })

    it('toggles back to hard mode when pressed again', () => {
        cy.getReact('Vault').getProps('classicMode').should('eq', true)
        cy.get('[data-cy="SwitchModeButton"').click()
        cy.wait(500)
        cy.getReact('Vault').getProps('classicMode').should('eq', false)
    })
})

describe('new game button begins a new game', () => {

    it('renders new game button to the screen', () => {
        cy.waitForReact(1000, '#root');
        cy.get('[data-cy="NewGameButton"')
    })

    it('sets loading to true after clicking then returns to false when loaded', () => {
        cy.get('[data-cy="NewGameButton"').click()
        cy.getReact('Vault').getProps('loading').should('eq', true)
        cy.wait(1000)
        cy.getReact('Vault').getProps('loading').should('eq', false)
    })
})

