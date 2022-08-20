import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';

import { app } from '../app';
import User from '../database/models/User';

import { ILogin } from '../interfaces/Interfaces';

const { expect } = chai;

chai.use(chaiHttp);

const userMock = {
  id: 2,
  username: "User",
  role: "user",
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

describe('Testando a rota /login', () => {
  describe('POST /login', () => {
    let login: ILogin

    beforeEach(() => {
      login = {
        email: 'user@user.com',
        password: 'secret_user',
      }
      Sinon.restore();
    })

    it('retorna um erro se o e-mail não existir no db', async () => {
      login.email = 'email';
      const response = await chai.request(app)
        .post('/login')
        .send(login);
      
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Incorrect email or password');
    })

    it('retorna um erro se o email não for passado', async () => {
      login.email = '';
      const response = await chai.request(app)
        .post('/login')
        .send(login);
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'All fields must be filled');
    })

    it('retorna um erro se o email não existir', async () => {
      login.email = 'dafsdf';
      const response = await chai.request(app)
        .post('/login')
        .send(login);
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message', 'Incorrect email or password');
    })

    it('retorna um erro se o password não for passado', async () => {
      login.password = '';
      const response = await chai.request(app)
        .post('/login')
        .send(login);
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'All fields must be filled');
    })

    it('retorna um erro se o password estiver incorreto', async () => {
      login.password = '1234567';
      const response = await chai.request(app)
        .post('/login')
        .send(login);
      
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Incorrect email or password');
    })

    it('retorna um token se as informações de login estiverem corretas', async () => {
      Sinon.stub(User, 'findOne').resolves(userMock as User);
      const response = await chai.request(app)
        .post('/login')
        .send(login);
      
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token');
    })

    it('retorna um erro 500 caso o erro não esteja sendo tratado', async () => {
      Sinon.stub(User, 'findOne').rejects();
      const response = await chai.request(app)
        .post('/login')
        .send(login)
      
      expect(response.status).to.eq(500)
    })
  })

  describe('GET /login', () => {
    let login: ILogin

    beforeEach(() => {
      login = {
        email: 'user@user.com',
        password: 'secret_user',
      }
      Sinon.restore();
    })

    it('retorna um erro se o token não for passado', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Token must be a valid token');
    })

    it('retorna um erro se o token não for válido', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .auth('token', { type: 'bearer' })
        
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Token must be a valid token');
    })

    it('retorna a role do usuário caso o token esteja correto', async () => {
      Sinon.stub(User, 'findOne').resolves(userMock as User);
      const res = await chai.request(app)
        .post('/login')
        .send(login);
    
      const response = await chai.request(app)
        .get('/login/validate')
        .auth(res.body.token, { type: 'bearer' })
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('role');
    })
  })
})