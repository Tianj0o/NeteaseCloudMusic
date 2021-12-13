import { request } from "./";

export const getBannerData = () => {
  return request.get({
    url: "/banner",
  });
};
