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
})