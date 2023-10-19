import CheckUserAuth from "../../lib/check-user-auth";

const StoryAdd = {
  init() {
    CheckUserAuth.checkLoginState();
  },
};

export default StoryAdd;
