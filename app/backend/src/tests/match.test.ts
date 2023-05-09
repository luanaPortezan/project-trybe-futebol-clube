import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');
import Token from '../auth/jwt.token';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import Team from '../database/models/team.model';

import { user} from './mocks/login.mock';
import Match from '../database/models/match.model';
import {
  finishedMatches,
  inProgressMatches,
  matches,
  newMatchMock,
  newMatchReturnMock,
  tokenMock, updateMatchesMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;
const tokenJWT = new Token()
describe('Match tests', () => {
  afterEach(sinon.restore);
  it('If it returns an array with all the times', async () => {
    sinon.stub(Match, 'findAll').resolves(matches)
    const response = await chai.request(app).get('/matches')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(matches);
  });

  it('If it returns an array with all the teams in play', async () => {
    sinon.stub(Match, 'findAll').resolves(matches)
    const response = await chai.request(app).get('/matches?inProgress=true')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(inProgressMatches);
  });

  it('If it returns an array with all the teams that the matches ended', async () => {
    sinon.stub(Match, 'findAll').resolves(matches)
    const response = await chai.request(app).get('/matches?inProgress=false')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(finishedMatches);
  });

  it('If it is possible to end a game by its id', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);
    const response = await chai.request(app).patch('/matches/1/finish').send().auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ "message": "Finished" });
  });

  it('If it is not possible to finish a game by its id without the token', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);
    const response = await chai.request(app).patch('/matches/1/finish')
    expect(response.status).to.be.eq(401);
    expect(response.body).to.be.deep.eq({ "message": "Token not found" });
  });

  it('If when passing an id error, it generates the correct error', async () => {
    sinon.stub(Match, 'update').resolves([0])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);
    const response = await chai.request(app).patch('/matches/999/finish').send().auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({ "message": "Match not found or already finished" });
  });

  it('Is it possible to update a match', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);
    const response = await chai.request(app).patch('/matches/1').send(updateMatchesMock).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ "message": "Updated" });
  });

  it('If you do not send the data to update the match, it generates the correct error', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);
    const response = await chai.request(app).patch('/matches/1').send({}).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({ "message": "All fields must be filled correctly" });
  });

  it('Whether it is possible to insert a new match', async () => {
    sinon.stub(Match, 'create').resolves(newMatchReturnMock)
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);
    const response = await chai.request(app).post('/matches').send(newMatchMock).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(201);
    expect(response.body).to.be.deep.eq(newMatchReturnMock);
  });
});