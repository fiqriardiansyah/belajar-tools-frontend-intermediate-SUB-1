import CheckUserAuth from "../../lib/check-user-auth";

const Home = {
  init() {
    CheckUserAuth.checkLoginState();
  },
};

export default Home;
