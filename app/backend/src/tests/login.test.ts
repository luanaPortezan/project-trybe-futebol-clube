import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bycrypt from "bcryptjs";
import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/user.model';
import { login, loginInvalidPassword, loginIvalidEmail, tokenMock, user }  from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', () => {
  afterEach(sinon.restore);
	it('If you perform a login correctly, it returns the token', async () => {
		sinon.stub(User, 'findOne').resolves(user)
		sinon.stub(bycrypt, 'compareSync').returns(true)
		const signMock = sinon.mock(jwt);
		signMock.expects('sign').returns(tokenMock);
		const response = await chai.request(app).post('/login').send(login)
		expect(response.status).to.be.eq(200);
		expect(response.body).to.be.deep.equal({token:tokenMock});
	});
	it('If the perform a login with the wrong password, it returns the correct error', async () => {
		sinon.stub(User, 'findOne').resolves(user)
		sinon.stub(bycrypt, 'compareSync').returns(false)
		const response = await chai.request(app).post('/login').send(login)
		expect(response.status).to.be.eq(401);
		expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
	});

	it('If the login with an invalid email, it returns the correct error', async () => {
		const response = await chai.request(app).post('/login').send(loginIvalidEmail)
		expect(response.status).to.be.eq(401);
		expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
	});

	it('If the perform a login with an invalid password, it returns the correct error', async () => {
		const response = await chai.request(app).post('/login').send(loginInvalidPassword)
		expect(response.status).to.be.eq(401);
		expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
  });
});
