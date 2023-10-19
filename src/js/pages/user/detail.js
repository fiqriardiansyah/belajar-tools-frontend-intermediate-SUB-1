import CheckUserAuth from "../../lib/check-user-auth";

const UserDetail = {
  init() {
    CheckUserAuth.checkLoginState();
  },
};

export default UserDetail;
