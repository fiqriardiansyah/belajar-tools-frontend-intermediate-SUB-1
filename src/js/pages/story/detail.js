import CheckUserAuth from "../../lib/check-user-auth";

const StoryDetail = {
  init() {
    CheckUserAuth.checkLoginState();
  },
};

export default StoryDetail;
