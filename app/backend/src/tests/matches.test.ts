import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon'

import { app } from '../app'
import Match from '../database/models/Match';

import mockMatches from '../mocks/mock.matches'

const { expect } = chai;

chai.use(chaiHttp)


describe('Testando a rota /teams', async () => {
  beforeEach(() => {
    Sinon.restore();
  })
  describe('GET /matches', () => {
    it('retorna um array de times ', async () => {
      Sinon.stub(Match, 'findAll').resolves(mockMatches as unknown as Match[])
      const response = await chai.request(app)
        .get('/matches')
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.an('array')
      expect(response.body[0]).to.have.property('id')
      expect(response.body[0]).to.have.property('teamHome')
      expect(response.body[0]).to.have.property('teamAway')
    })
  })

    it('retorna somente as partidas finalizadas quando passar inProgress=true na URL', async () => {
      const matchFilter = mockMatches.filter((match) => match.inProgress === true)
      Sinon.stub(Match, 'findAll').resolves(matchFilter as unknown as Match[])
      const response = await chai.request(app)
        .get('/matches?inProgress=true')
      
      const matchFinish = response.body.every((match: { inProgress: boolean; }) => match.inProgress === true )
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.an('array')
      expect(matchFinish).to.be.true
    })
  
    it('retorna somente as partidas em andamento quando passar inProgress=false na URL', async () => {
      const matchFilter = mockMatches.filter((match) => match.inProgress === false)
      Sinon.stub(Match, 'findAll').resolves(matchFilter as unknown as Match[])
      const response = await chai.request(app)
        .get('/matches?inProgress=false')
      
      const matchInProgress = response.body.every((match: { inProgress: boolean }) => match.inProgress === false )
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.an('array')
      expect(matchInProgress).to.be.true
    })

    // it('retorna um erro se o time não existir no db', async () => {
    //   Sinon.stub(Match, 'findOne').resolves(null)
    //   const response = await chai.request(app)
    //     .get('/teams/454654')
      
    //   expect(response.status).to.eq(401);
    //   expect(response.body).to.have.property('message', 'Team not exists')
    // })

    // it('retorna o time caso exista no db ', async () => {
    //   const team = mocks[0]
    //   Sinon.stub(Match, 'findAll').resolves(team as Match)
    //   const response = await chai.request(app)
    //     .get('/teams/1')
      
    //   expect(response.status).to.eq(200);
    //   expect(response.body).to.have.property('id')
    //   expect(response.body).to.have.property('teamName')
    // })
})