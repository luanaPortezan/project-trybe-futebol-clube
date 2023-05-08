import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/team.model';

import { Response } from 'superagent';
import { teamById, teamsSqlResponse } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testes de teams', () => {
  afterEach(sinon.restore);
  it('Se retorna um array com todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsSqlResponse as Team[])
    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamsSqlResponse);
  });
  it('Se retorna um time dado o seu id', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamById as Team)
    const response = await chai.request(app).get('/teams/3')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamById);
  });
  it('Se retorna um erro e status 404 caso não encontre o time por id', async () => {
    sinon.stub(Team, 'findByPk').resolves(null)
    const response = await chai.request(app).get('/teams/999')
    expect(response.status).to.be.eq(404);
  });
  it('Seu sub-teste', function() {
    expect(false).to.be.eq(true);
  });
});