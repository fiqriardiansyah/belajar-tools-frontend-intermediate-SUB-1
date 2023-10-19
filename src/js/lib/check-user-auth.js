import { TOKEN } from "./utils";
import Cookies from "js-cookie";

const CheckUserAuth = {
  excludeRedirectPage: ["login.html", "register.html"],

  isLogin() {
    return !!Cookies.get(TOKEN);
  },

  checkLoginState() {
    const userToken = Cookies.get(TOKEN);
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = "/";
      }
    } else {
      if (!isUserOnAuthPage) {
        window.location.href = "/auth/login.html";
      }
    }
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.includes(item));
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
