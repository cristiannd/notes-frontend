describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cristian Donalicio',
      username: 'cristiannd',
      passwordHash: 'test123',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app from Cristian Donalicio ')
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('cristiannd')
    cy.get('#password').type('test123')
    cy.get('#login-button').click()

    cy.contains('Cristian Donalicio logged-in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cristiannd', password: 'test123' })
    })

    it('a new note can be created', function () {
      cy.contains('New note').click()
      cy.get('#newNote').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('other of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click().should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('cristiannd')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Cristian Donalicio logged in')
  })
})
