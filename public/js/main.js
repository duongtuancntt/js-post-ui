import axios from "axios";
import axiosCLient from "./api/axiosClient";
import postApi from "./api/postApi";
async function main() {
  try {
    const params = {
      _page: 1,
      _limit: 5,
    };
    const response = await postApi.getAll(params);
    console.log(response);
    //   await postApi.updateFromData({
    //     id: "sktwi1cgkkuif36e4",
    //     title: "Maiores adipisci 234",
    //   });
  } catch (error) {
    console.log(error);
  }
}

main();
