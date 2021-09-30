const expect = require("chai").expect;
const supertest = require("supertest");
const resolveEndpoint = require('../../utils/resolveEndpoint');
const faker = require('faker');

const endpoint = resolveEndpoint(process.env.TEST_ENV) + '/api/user';

const api = supertest(endpoint);

const generateRandomUser = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        gender: faker.name.gender(),
        middleInitial: faker.name.middleName().substr(0,1).toUpperCase()
    }
}


describe('User Service - CRUD Operations', () => {

    it('Can create a user with appropriate payload', (done) => {
        const userPayload = generateRandomUser();

        api.post('/user')
            .send(userPayload)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userPayload.firstName);
                expect(res.body).to.have.property('userId');
                done();
            })
    })

    // Important to see how validation errors are reported
    it('Will reject user creation if payload not formatted correctly', (done) => {
        const userPayload = generateRandomUser();
        userPayload.firstName = 1234;

        api.post('/user')
            .send(userPayload)
            .end((err, res) => {
                expect(res.status).to.equal(422);
                expect(res.body).to.have.property('validationErrors');
                expect(res.body.validationErrors[0].instancePath).to.equal('/firstName');
                expect(res.body.validationErrors[0].message).to.equal('must be string');
                done();
            })
    })

})
