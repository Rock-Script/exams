const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);


describe('System tests', () => {
    describe('System health test', () => {
        it("System should return OK", (done) => {
            chai.request(server.getServer())
                .get('/system/health')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.health.should.eq('OK');
                    done();
                })
        });
    });
});