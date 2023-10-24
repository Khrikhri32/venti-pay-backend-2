const request = require('supertest');
const app = require('../../app');
const { create, getAll, checkLogin, getUserData } = require('../services/users.service');
jest.mock('../services/users.service');

const { decode } = require('../helpers/jwtEncoder');

const { TOKEN_TEST } = process.env;

describe('User Register and login', () => {
    
  it('should create a user', async () => {
    const newUser = {
      name: "Eric",
      email: "eric@mail.cl",
      phone: "+56949586879",
      address: "Los Olivos 365",
      pass: "testing123"
    };
  
  
    create.mockImplementation((data, callback) => {
      expect(data).toEqual(expect.objectContaining({
        name: expect.stringMatching(/^[\w\s]+$/),
        email: expect.stringMatching(/^[\w.-]+@[a-z]+[.][a-z]+$/),
        phone: expect.stringMatching(/^\+\d{11}$/),
        address: expect.stringMatching(/^[\w\s\d]+$/),
        pass: expect.stringMatching(/^[\w\s]+$/),
      }))
  
      callback(null, {
        data: {
          insertId: 3,
        }
      });
    });
  
    const response = await request(app)
      .post('/api/users/create')
      .send(newUser);
  
    expect(response.status).toBe(200);
    expect(create).toHaveBeenCalledWith(newUser, expect.any(Function));
  });
  

  it('should login user', async () => {
    const user = {
      user: "Eric",
      pass: "holamundo"
    }
  
    const expectedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyaWMiLCJpZCI6NSwiaWF0IjoxNjk4MTYxMDc5LCJleHAiOjE2OTgxNjQ2Nzl9.6Luy-00gE1IZtw45EW_gsHIruTLwmFcSp7AxGg2GfaY";
  
    checkLogin.mockImplementation((data, callBack) => {
      callBack(null, {
          message: "Login successful",
          token: expectedToken,
          status: 200
        }
      );
    });
  
    const response = await request(app)
      .post('/api/users/login')
      .send(user);
      
    let token_decoded = decode(response.body.data.token);

    expect(response.status).toBe(200);
    expect(response.body.data.message).toBe('Login successful');
    expect(token_decoded.username).toBe("Eric");
  });
});

describe('User request', () => {

  it('should get all users', async () => {
    getAll.mockImplementation((callback) => {
      callback(null, 
        [
          {
            name: "Pedro",
            email: "pedor@mail.cl",
            phone: "+56949586879",
            address: "Los Olivos 365",
            usersID: 1,
          },
          {
            name: "Eric",
            email: "eric@mail.cl",
            phone: "+56949586878",
            address: "Los Olivos 366",
            usersID: 2,
          },
          {
            name: "Christian",
            email: "christian@mail.cl",
            phone: "+56949586877",
            address: "Los Olivos 367",
            usersID: 3,
          },
        ]
      );
    });
    const response = await request(app)
      .get('/api/users/getAll')
      .set('Authorization', TOKEN_TEST);
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });  
  it('should not get data getAll', async () => {
    const response = await request(app)
    .get('/api/users/getAll')
  
    expect(response.status).toBe(401);
  });
});
