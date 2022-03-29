const testUser = {
  username: 'test_username',
  name: 'Test User',
  password: '123456789'
};
const testUser2 = {...testUser, username: '2nd_test_username'}
const note = {
  title: 'CSS is nice',
  author: 'Test Author',
  url: 'http://testurl.com'
};
describe('BlogList app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
  });
  it('shows login form by default', function() {
    cy.contains('Log in to application');
  });

  describe('Login', function() {

    it('fails with wrong details', function() {
      cy.get('#username').type(testUser.username);
      cy.get('#password').type('wrong password');
      cy.contains('Login').click();

      cy.contains('Invalid login details');
    });

    it('succeeds with correct details', function() {
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password);
      cy.contains('Login').click();

      cy.contains(testUser.name);
    });

  });
});


describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
    cy.request('POST', 'http://localhost:3003/api/users', testUser2)
    cy.login(testUser);

    cy.reload();
  });

  it('user can create note', function() {
    cy.contains('New note').click();

    cy.get('#title').type(note.title);
    cy.get('#author').type(note.author);
    cy.get('#url').type(note.url);

    cy.contains('Create').click();
  });

  it('user can like a blog', function() {
    cy.contains('New note').click();

    cy.get('#title').type(note.title);
    cy.get('#author').type(note.author);
    cy.get('#url').type(note.url);

    cy.contains('Create').click();
    cy.contains('a new blog')

    cy.contains('view').click();
    cy.contains('Like').click().parent().should('contain', 0);
  });

  it('user cannot delete another user\'s post', function() {
    cy.contains('New note').click();

    cy.get('#title').type(note.title);
    cy.get('#author').type(note.author);
    cy.get('#url').type(note.url);

    cy.contains('Create').click();
    cy.contains('a new blog')

    cy.contains('Logout').click();
    testUser.username = '2nd_test_sername'
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.get('#username').type(testUser2.username);
    cy.get('#password').type(testUser2.password);
    cy.contains('Login').click();
    cy.contains('view').click()
    cy.contains('Remove').click()
    cy.contains('Permission denied')
  })

  it('user can delete their own post', function() {
    cy.contains('New note').click();

    cy.get('#title').type(note.title);
    cy.get('#author').type(note.author);
    cy.get('#url').type(note.url);

    cy.contains('Create').click();
    cy.contains('a new blog')

    cy.contains('view').click()
    cy.contains('Remove').click()
    cy.contains('deleted successfully')
  })

  it('sorts blog entries according to likes', function() {
    const $1st = { title: 'lowest', likes: 1 }
    const $2nd = { title: 'highest', likes: 31 }
    const $3rd = { title: 'mid', likes: 12 }
    cy.createBlog($1st);
    cy.wait(500)
    cy.createBlog($2nd);
    cy.wait(500)
    cy.createBlog($3rd);
    cy.wait(2000)

    cy.get('.blog').contains('highest').parent()
      .contains('view').click().parent().parent()
      .contains('Like').as('likeHighest').click()
      .parent().should('contain', '1')
    cy.get('@likeHighest').click().parent().should('contain', '2');
    cy.get('@likeHighest').click().parent().should('contain', '3');
    cy.get('@likeHighest').click().parent().should('contain', '4');
    cy.get('@likeHighest').click().parent().should('contain', '5');

    cy.get('.blog').contains('mid').parent()
      .contains('view')
      .click()
      .parent()
      .parent()
      .contains('Like')
      .as('likeMid')
      .click()
      .parent()
      .should('contain', '1')
    cy.get('@likeMid').click().parent().should('contain', '2');
    cy.get('@likeMid').click().parent().should('contain', '3');

    cy.get('.blog').then(blogList => {
      blogList.map((i, $el) => {
        if(i === 0) {
          expect($el).to.contain('highest')
        }
        if(i === 2) {

        }
      })
    })
  })
});

