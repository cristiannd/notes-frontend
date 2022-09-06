Cypress.Commands.add('login', ({ username, password }) => {
  // Inicio de sesión con el formulario html
  // cy.contains('log in').click()
  // cy.get('#username').type('cristiannd')
  // cy.get('#password').type('test123')
  // cy.get('#login-button').click()

  // Inicio de sesión con petición al backend
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedNoteappUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})