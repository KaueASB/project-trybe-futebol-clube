import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon'

import { app } from '../app'
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ILogin, ITeam } from '../interfaces/Interfaces';

import { addMatch, createdMatch, mockMatches, mockTeamsExists } from '../mocks/mock.matches'

const { expect } = chai;

chai.use(chaiHttp)


describe('Testando a rota /matches', async () => {
  let login: ILogin

  beforeEach(() => {
    login = {
      email: 'user@user.com',
      password: 'secret_user',
    }
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
  })
  
  describe('/POST matches' , () => {
    it('retorna um erro se o time não existir no db', async () => {
      Sinon.stub(Team, 'findByPk').resolves(null)
      const res = await chai.request(app)
        .post('/login')
        .send(login)
      
      const response = await chai.request(app)
        .post('/matches')
        .auth(res.body.token, { type: 'bearer' })
        .send(addMatch)
      
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Team(s) Invalid(s)')
    })

    it('retorna um erro se os homeTeam não for válido ou enviado', async () => {
      const {homeTeam, ...rest} = addMatch

      const res = await chai.request(app)
        .post('/login')
        .send(login)
      
      const response = await chai.request(app)
        .post('/matches')
        .auth(res.body.token, { type: 'bearer' })
        .send(rest)
      
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'All fields are mandatory and must be filled in with numbers')
    })

    it('retorna um erro se os homeTeamGoals não for válido ou enviado', async () => {
      const {homeTeamGoals, ...rest} = addMatch

      const res = await chai.request(app)
        .post('/login')
        .send(login)
      
      const response = await chai.request(app)
        .post('/matches')
        .auth(res.body.token, { type: 'bearer' })
        .send(rest)
      
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'All fields are mandatory and must be filled in with numbers')
    })

    it('retorna um erro se os awayTeam não for válido ou enviado', async () => {
      const {awayTeam, ...rest} = addMatch

      const res = await chai.request(app)
        .post('/login')
        .send(login)
      
      const response = await chai.request(app)
        .post('/matches')
        .auth(res.body.token, { type: 'bearer' })
        .send(rest)
      
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'All fields are mandatory and must be filled in with numbers')
    })

    it('retorna um erro se os awayTeamGoals não for válido ou enviado', async () => {
      const {awayTeamGoals, ...rest} = addMatch

      const res = await chai.request(app)
        .post('/login')
        .send(login)
      
      const response = await chai.request(app)
        .post('/matches')
        .auth(res.body.token, { type: 'bearer' })
        .send(rest)
      
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'All fields are mandatory and must be filled in with numbers')
    })

    it('retorna a partida criada se os dados estiverem corretos', async () => {
      Sinon.stub(Team, 'findByPk').resolves(mockTeamsExists as unknown as Team)
      Sinon.stub(Match, 'create').resolves(createdMatch as Match)
      const res = await chai.request(app)
        .post('/login')
        .send(login)
      
      const response = await chai.request(app)
        .post('/matches')
        .auth(res.body.token, { type: 'bearer' })
        .send(addMatch)
      
      expect(response.status).to.eq(201);
      expect(response.body).to.have.an('object')
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('inProgress', true)
    })
  })
})