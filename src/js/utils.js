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

export const getStories = async () => {
  const stories = await new Promise(async (resolve) => {
    const fetchStories = await fetch("/data/data.json");
    const res = await fetchStories.json();
    setTimeout(() => {
      resolve(res.listStory);
    }, 1000);
  });
  return stories;
};
