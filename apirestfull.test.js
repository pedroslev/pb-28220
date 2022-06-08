import supertest from "supertest"
import chai from "chai"

const request = supertest('http://localhost:8080')
const expect = chai.expect

describe('test de api rest full', () => {
    describe(`GET`, () => {
        it('deberia retornar o vacio o un valor')
        let response = await request.get('/api/test')
        expect(response).to.be.an('string')
    })

    describe('INSERT OR MODIFY', () => {
    it(`deberia devolver un status 200`)
    let response = await request.post('/api/test/insert?value=pedro')
    expect(response.status).to.eql(200)
    })

    describe('DELETE', () => {
    it(`deberia devolver un status 200`)
    let response = await request.post('/api/test/delete')
    expect(response.status).to.eql(200)
    })


})