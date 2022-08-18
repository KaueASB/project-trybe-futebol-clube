import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon'

import { app } from '../app'
import Team from '../database/models/Team';

const { expect } = chai;

chai.use(chaiHttp)

const teamMock = [
  {
    id: 1,
    teamName: 'Palmeiras',
  },
  {
    id: 2,
    teamName: 'Flamengo',
  }
];

describe('Testando a rota /teams', async () => {
  beforeEach(() => {
    Sinon.restore();
  })
  describe('GET /teams', () => {
    it('retorna um array de times ', async () => {
      Sinon.stub(Team, 'findAll').resolves(teamMock as Team[])
      const response = await chai.request(app)
        .get('/teams')
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(2)
      expect(response.body[0]).to.have.property('id')
    })
  })

  describe('GET /teams:id', () => {
    it('retorna um erro se não passar um id válido no req.params', async () => {
      const team = teamMock[0]
      Sinon.stub(Team, 'findOne').resolves(team as Team)
      const response = await chai.request(app)
        .get('/teams/1.1')
      
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Id Invalid')
    })

    it('retorna um erro se o time não existir no db', async () => {
      Sinon.stub(Team, 'findOne').resolves(null)
      const response = await chai.request(app)
        .get('/teams/454654')
      
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Team not exists')
      // expect(response.body).to.have.property('teamName')
    })

    it('retorna o time caso exista no db ', async () => {
      const team = teamMock[0]
      Sinon.stub(Team, 'findOne').resolves(team as Team)
      const response = await chai.request(app)
        .get('/teams/1')
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('teamName')
    })
  })
})