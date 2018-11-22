const expect = require('expect');
const request = require('supertest');

const {app} = require('./server');

it('should return user if authenticated', (done) => {
    request(app)
      .get('/5bf617cce3e5d11f7c58816c')
      .set('x-auth', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmY2MTdjY2UzZTVkMTFmN2M1ODgxNmMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQyODU0NjA2fQ.BIqAJcAqlS-SYLDobI8tkhsS4ducz0JK7YIca4p_XCk")
      .expect(200)
      .end(done);
});

describe('Update', () => {
  it('should  update data with auth', (done) => {
     request(app)
       .patch("/5bf617cce3e5d11f7c58816c")
       .set('x-auth', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmY2MTdjY2UzZTVkMTFmN2M1ODgxNmMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQyODU0NjA2fQ.BIqAJcAqlS-SYLDobI8tkhsS4ducz0JK7YIca4p_XCk")
       .send({
          email:"yashlakhani14@gmail.com"
       })
       .expect(200)
       .expect((res) => {
         expect(res.body.message).toBe("updates");
       })
       .end(done);
   });


     it('should not update data not auth', (done) => {
        request(app)
          .patch("/5bf617cce3e5d11f7c58816c")
          .send({
             email:"yashlakhani14@gmail.com"
          })
          .expect(401)
          .end(done);
      });

      it('401 passing wronng id', (done) => {
         request(app)
           .patch("/5bf617cce5d11f7c58816c")
           .send({
              email:"yashlakhani14@gmail.com"
           })
           .expect(401)
           .end(done);
       });


})


describe('POST login', () => {
    it('should login user and return auth token', (done) => {
      request(app)
        .post('/login')
        .send({
          email: "ankitlakhani522234322@gmail.com",
          password:"123456789"
        })
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toExist();
        })
        .end(done);
    });

    it('invalid user id and password', (done) => {
      request(app)
        .post('/login')
        .send({
          email: "ankitlakhani52322@gmail.com",
          password:"123456789"
        })
        .expect(400)
        .end(done);
    });

    it('invalid password', (done) => {
      request(app)
        .post('/login')
        .send({
          email: "ankitlakhani52322@gmail.com",
          password:"23456789"
        })
        .expect(400)
        .end(done);
    });




  });


describe('POST ', () => {
//   it('should create a new user', (done) => {
//
//
//     request(app)
//       .post('/')
//       .send({
// 	"email":"ankitlakhanip5223322@gmail.com",
// 	"password":"123456789"
// })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.email).toBe("ankitlakhanip5223322@gmail.com");
//       })
//       .end(done)
//   });



  it('return 404 for not passing password', (done) => {
    request(app)
      .post('/')
      .send({
	"email":"ankitlakhani5223322@gmail.com"
})
      .expect(400)
      .end(done)
  });

  it('return 404 for duplicate email id', (done) => {
    request(app)
      .post('/')
      .send({
        "email":"ankitlakhani52222@gmail.com",
      	"password":"123456789"
})
      .expect(400)
      .end(done)
  });

})




describe('GET ', () => {
  it('should Gives list of user', (done) => {


    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(4);
      })
      .end(done)
  });
})
