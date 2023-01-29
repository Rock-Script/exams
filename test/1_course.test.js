const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chance = require('chance').Chance();
const should = chai.should();
chai.use(chaiHttp);
const TestData = require('../template/contants/test-data').getTestData();

describe('Course tests', () => {
    let payload;
    let _id, child_id;
    describe('Course', () => {
        it("It should create new Course", (done) => {
            payload = {
                institute_id: TestData.institute_id,
                name: chance.company()
            }
            chai.request(server.getServer())
                .post('/courses')
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(201);
                    const data = response.body.data;
                    data.name.should.be.eq(payload.name);
                    _id = data._id;
                    done();
                })
        });

        it("It should get Course", (done) => {
            chai.request(server.getServer())
                .get('/courses/' + _id)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.name.should.be.eq(payload.name);
                    _id = data._id;
                    done();
                })
        });

        it("It should update Course", (done) => {
            payload = {
                name: chance.company()
            }
            chai.request(server.getServer())
                .patch('/courses/' + _id)
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.name.should.be.eq(payload.name);
                    _id = data._id;
                    done();
                })
        });

        it("It should create new course with parent", (done) => {
            payload = {
                institute_id: TestData.institute_id,
                name: chance.city(),
                parent_id: _id
            }
            chai.request(server.getServer())
                .post('/courses')
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(201);
                    const data = response.body.data;
                    data.name.should.be.eq(payload.name);
                    child_id = data._id;
                    done();
                })
        });

        it("It should get child Course", (done) => {
            chai.request(server.getServer())
                .get('/courses/' + child_id)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.name.should.be.eq(payload.name);
                    child_id = data._id;
                    done();
                })
        });

        it("It should update child Course", (done) => {
            payload = {
                name: chance.company()
            }
            chai.request(server.getServer())
                .patch('/courses/' + child_id)
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.name.should.be.eq(payload.name);
                    child_id = data._id;
                    done();
                })
        });

        it("It should get all Courses", (done) => {
            payload = {
            }
            chai.request(server.getServer())
                .get('/courses')
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.should.be.an('array');
                    data.forEach(element => {
                        element.should.include.key("_id");
                        element.should.include.key("name");
                        element.should.include.key("institute");
                        element.should.include.key("institute_id");
                        element.should.include.key("is_active");
                        element.should.include.key("created_at");
                        element.should.include.key("modified_at");
                    });
                    done();
                })
        });

        it("It should get all Courses as tree view", (done) => {
            payload = {
                is_tree_view: true
            }
            chai.request(server.getServer())
                .get('/courses')
                .query(payload)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.should.be.an('array');
                    data.forEach(element => {
                        element.should.include.key("_id");
                        element.should.include.key("name");
                        element.should.include.key("institute");
                        element.should.include.key("institute_id");
                        element.should.include.key("is_active");
                        element.should.include.key("created_at");
                        element.should.include.key("modified_at");
                        should.equal(element.parent_id, null);
                        element.children.should.be.an('array')
                        element.children.forEach(c => {
                            should.equal(c.parent_id, element._id);
                        })
                    });
                    done();
                })
        });

        it("It should filter all Courses on name", (done) => {
            payload = {
                name: 'food'
            }
            chai.request(server.getServer())
                .get('/courses')
                .query(payload)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.should.be.an('array');
                    data.forEach(element => {
                        element.should.include.key("_id");
                        element.should.include.key("name");
                        element.should.include.key("institute");
                        element.should.include.key("institute_id");
                        element.should.include.key("is_active");
                        element.should.include.key("created_at");
                        element.should.include.key("modified_at");
                        element.name.toLowerCase().indexOf(payload.name).should.be.greaterThan(-1);
                    });
                    done();
                })
        });
        

    });
});