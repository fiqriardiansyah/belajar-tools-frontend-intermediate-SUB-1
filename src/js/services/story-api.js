import axiosClient from "../config/axios";

export const StoryApi = {
  _Request: async (request) => {
    try {
      const req = await request();
      const status = req?.status;
      if (status > 299) {
        const msg = (() => {
          if (req.data?.message) return req.data?.message;
          if (status === 500) return "Internal Server Error";
          if (status === 401) return "Unauthorized";
          return "Ooops something went wrong!";
        })();
        throw new Error(msg);
      }
      return req.data;
    } catch (error) {
      const msg = error?.message || "Ooops something went wrong!";
      throw new Error(msg);
    }
  },
  Register: async (data) => {
    return StoryApi._Request(async () => {
      const req = await axiosClient.post("/register", data);
      return req;
    });
  },
  Login: async (data) => {
    return StoryApi._Request(async () => {
      const req = await axiosClient.post("/login", data);
      return req;
    });
  },
  GetAllStories: async () => {
    return StoryApi._Request(async () => {
      const req = await axiosClient.get("/stories", {
        params: {
          size: 40,
        },
      });
      return req;
    });
  },
  AddNewStory: async (data) => {
    return StoryApi._Request(async () => {
      const req = await axiosClient.post("/stories", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return req;
    });
  },
  DetailStory: async (id) => {
    return StoryApi._Request(async () => {
      const req = await axiosClient.get("stories/" + id);
      return req;
    });
  },
};
