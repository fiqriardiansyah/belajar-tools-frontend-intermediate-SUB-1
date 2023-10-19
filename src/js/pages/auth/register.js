import CheckUserAuth from "../../lib/check-user-auth";

const Register = {
  init() {
    CheckUserAuth.checkLoginState();
  },
};

export default Register;
