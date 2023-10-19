import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./home";
import StoryAdd from "./story/add";
import StoryDetail from "./story/detail";
import UserDetail from "./user/detail";

const routes = {
  "/": Home,
  "/auth/login.html": Login,
  "/auth/register.html": Register,
  "/story/add.html": StoryAdd,
  "/story/detail.html": StoryDetail,
  "/user/detail.html": UserDetail,
};

const detectRoute = () => routes[window.location.pathname];

window.addEventListener("DOMContentLoaded", async () => {
  const route = detectRoute();
  route.init();
});
