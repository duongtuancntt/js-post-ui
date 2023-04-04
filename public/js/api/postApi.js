import axiosCLient from "./axiosClient";

const postApi = {
  getAll(params) {
    const url = "/posts";
    return axiosCLient.get(url, { params });
  },

  getById(id) {
    const url = `/posts/${id}`;
    return axiosCLient.get(url);
  },

  add(data) {
    const url = "/posts";
    return axiosCLient.post(url, data);
  },

  remove(id) {
    const url = `/posts${id}`;
    return axiosCLient.delete(url);
  },

  updateFromData(data) {
    const url = `/posts/${data.id}`;
    return axiosCLient.patch(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  update(data) {
    const url = `/posts/${data.id}`;
    return axiosCLient.patch(url, data);
  },
};

export default postApi;
