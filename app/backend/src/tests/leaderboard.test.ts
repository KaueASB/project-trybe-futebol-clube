import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';

import { app } from '../app';

import { ILeaderboard } from '../interfaces/Interfaces';

import {mockHomeLeaderboard, mockAwayLeaderboard, mockLeaderboard} from '../mocks/mock.leaderboard'

const { expect } = chai;

chai.use(chaiHttp);

describe('testando a rota /leaderboard', () => {
  describe('GET /leaderboard/home', () => {

    it('deve retornar a tabela de classificação referente aos jogos em casa', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')
      
      expect(response.status).to.be.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body[0]).to.be.deep.eq(mockHomeLeaderboard)
    })
  })

  describe('GET /leaderboard/away', () => {
    it('deve retornar a tabela de classificação referente aos jogos fora de casa', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')
      
      expect(response.status).to.be.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body[0]).to.be.deep.eq(mockAwayLeaderboard)
    })
  })

  describe('GET /leaderboard', () => {
    it('deve retornar a tabela de classificação completa', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')
      
      response.body.forEach((item: ILeaderboard, index: number) => {
        expect(item).to.deep.equal(mockLeaderboard[index])
      } )
      
      expect(response.status).to.be.eq(200)
      expect(response.body).to.be.an('array')
    })
  })
})