import axiosCLient from "./axiosClient";

const studentApi = {
  getAll(params) {
    const url = "/students";
    return axiosCLient.get(url, { params });
  },

  getById(id) {
    const url = `/students/${id}`;
    return axiosCLient.get(url);
  },

  add(data) {
    const url = "/students";
    return axiosCLient.post(url, data);
  },

  remove(id) {
    const url = `/students${id}`;
    return axiosCLient.delete(url);
  },

  update(data) {
    const url = `/students/${data.id}`;
    return axiosCLient.patch(url, data);
  },
};

export default studentApi;
