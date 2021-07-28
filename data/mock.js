import Vue from "vue";

var MockAdapter = require("axios-mock-adapter");

// mock testing user accounts
const users = [
  {
    email: "1",
    password: "1",
    token: "mgfi5juf74j",
  },
  {
    email: "admin2@demo.com",
    password: "demo",
    token: "fgj8fjdfk43",
  },
];

const adminList = [
  {
    userType: "한화 토탈",
    authGroup: "관리자",
    id: "userid0",
    userName: "임성빈",
    phoneNumber: "010-1234-5678",
    email: "exam@exam.com",
    lastAccessDate: "2021-07-05",
    CreationDate: "2021-07-05",
    edit: "2021-06-07",
  },
  {
    userType: "한화 토탈",
    authGroup: "관리자",
    id: "userid1",
    userName: "임성빈",
    phoneNumber: "010-1234-5678",
    email: "exam@exam.com",
    lastAccessDate: "2021-07-05",
    CreationDate: "2021-07-05",
    edit: "2021-06-07",
  },
  {
    userType: "한화 토탈",
    authGroup: "관리자",
    id: "userid2",
    userName: "임성빈",
    phoneNumber: "010-1234-5678",
    email: "exam@exam.com",
    lastAccessDate: "2021-07-05",
    CreationDate: "2021-07-05",
    edit: "2021-06-07",
  },
  {
    userType: "한화 토탈",
    authGroup: "관리자",
    id: "userid3",
    userName: "임성빈",
    phoneNumber: "010-1234-5678",
    email: "exam@exam.com",
    lastAccessDate: "2021-07-05",
    CreationDate: "2021-07-05",
    edit: "2021-06-07",
  },
];

const MockService = {
  init() {
    // this sets the mock adapter on the default instance
    var mock = new MockAdapter(Vue.axios);

    // mock login request
    mock.onPost("/login").reply((data) => {
      const credential = JSON.parse(data.data);
      const found = users.find((user) => {
        return (
          credential.email === user.email &&
          credential.password === user.password
        );
      });
      if (found) {
        return [200, found];
      }
      return [404, { errors: ["The login detail is incorrect"] }];
    });

    // mock to verify authentication
    mock.onGet(/\/verify\/?/).reply((data) => {
      const token = data.headers.Authorization.replace("Token ", "");
      if (token !== "undefined") {
        const found = users.find((user) => {
          return token === user.token;
        });
        return [200, found];
      }
      return [401, { errors: ["Invalid authentication"] }];
    });

    //auth list mock
    mock.onGet(/\/adminList\/?/).reply((data) => {
      const list = adminList;
      data.data = list;
      return [200, list];
    });
  },
};

export default MockService;
