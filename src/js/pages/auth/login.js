import CheckUserAuth from "../../lib/check-user-auth";

const Login = {
  init() {
    CheckUserAuth.checkLoginState();
  },
};

export default Login;
