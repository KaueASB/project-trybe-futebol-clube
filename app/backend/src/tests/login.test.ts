import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { describe } from 'mocha';
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

describe('Testando a rota login', () => {
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
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message', 'Incorrect email or password');
    })

    it('retorna um erro se o password estiver incorreto', async () => {
      login.password = '1234';
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
})