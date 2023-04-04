import postApi from "./api/postApi";
import {
  initPagination,
  renderPostList,
  renderPagination,
  initSearchInput,
} from "./untils";

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

    if (filterName === "title_like") url.searchParams.set("_page", 1);

    history.pushState({}, "", url);

    const { data, pagination } = await postApi.getAll(url.searchParams);

    renderPostList("postsList", data);
    renderPagination("pagination", pagination);
  } catch (error) {
    console.log("failed to fetch post list", error);
  }
}

function getDefaultParams() {
  const url = new URL(window.location);

  if (!url.searchParams.get("_page")) url.searchParams.set("_page", 1);
  if (!url.searchParams.get("_limit")) url.searchParams.set("_limit", 9);

  history.pushState({}, "", url);

  return url.searchParams;
}

(async () => {
  try {
    const queryParams = getDefaultParams();
    const { data, pagination } = await postApi.getAll(queryParams);

    initPagination({
      elementId: "pagination",
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange("_page", page),
    });

    initSearchInput({
      elementId: "search",
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange("title_like", value),
    });

    renderPostList("postsList", data);
    renderPagination("pagination", pagination);
  } catch (error) {
    console.log(error);
  }
})();
