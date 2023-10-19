export const formatDate = (dt) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dt);
  return date.toLocaleDateString("id-ID", options);
};

export const getQueryParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

export const TOKEN = "token";
export const NAME = "name";

export const MIN_CHAR_PASSWORD = 8;
