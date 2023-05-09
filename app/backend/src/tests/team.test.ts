import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Team from '../database/models/team.model';
import { app } from '../app';
import { teamById, teamsSqlResponse } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Teams test', () => {
  afterEach(sinon.restore);
  it('If it returns an array with all the times', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsSqlResponse as Team[])
    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamsSqlResponse);
  });

  it('If it returns a team given its id', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamById as Team)
    const response = await chai.request(app).get('/teams/3')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamById);
  });

  it('if it does not find the team by id, it returns the correct error', async () => {
    sinon.stub(Team, 'findByPk').resolves(null)
    const response = await chai.request(app).get('/teams/999')
    expect(response.status).to.be.eq(404);
  });

  it('My sub-test of test', function() {
    expect(false).to.be.eq(false);
  });
});