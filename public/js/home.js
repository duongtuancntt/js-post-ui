import postApi from "./api/postApi";
import { setTextContent } from "./untils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getPaginationElement } from "./untils";
import debounce from "lodash.debounce";
dayjs.extend(relativeTime);

function createPostElement(post) {
  try {
    if (!post) return;
    //find template
    const postTemplate = document.getElementById("postItemTemplate");
    if (!postTemplate) return;
    const liElement = postTemplate.content.firstElementChild.cloneNode(true);
    //update title, description, author, thumbnail
    setTextContent(liElement, '[data-id="title"]', post.title);
    setTextContent(liElement, '[data-id="description"]', post.description);
    setTextContent(liElement, '[data-id="author"]', post.author);

    //timestamp
    // dayjs(post.updateAt).fromNow();
    setTextContent(
      liElement,
      '[data-id="timeSpan"]',
      `- ${dayjs(post.updatedAt).fromNow()}`
    );
    const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
    if (thumbnailElement) {
      thumbnailElement.src = post.imageUrl;
      thumbnailElement.addEventListener("error", () => {
        thumbnailElement.src = `https://via.placeholder.com/960x400?text=${post.title}`;
      });
    }
    //attach event
    return liElement;
  } catch (error) {
    console.log("failed to create post item", error);
  }
}

function renderPagination(pagination) {
  const ulPagination = getPaginationElement();
  if (!pagination || !ulPagination) return;

  //calc totalPages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  //save page and total
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  // check if enable/disable pre next links
  if (_page <= 1) {
    ulPagination.firstElementChild?.classList.add("disabled");
    ulPagination.firstElementChild.style.cursor = "no-drop";
    ulPagination.querySelector(".prev-icon")?.classList.add("text-muted");
  } else {
    ulPagination.firstElementChild?.classList.remove("disabled");
    ulPagination.querySelector(".prev-icon")?.classList.remove("text-muted");
  }

  if (_page >= totalPages) {
    ulPagination.lastElementChild?.classList.add("disabled");
    ulPagination.lastElementChild.style.cursor = "no-drop";
    ulPagination.querySelector(".next-icon").classList.add("text-muted");
  } else {
    ulPagination.lastElementChild?.classList.remove("disabled");
    ulPagination.querySelector(".next-icon").classList.remove("text-muted");
  }
}

function renderPostList(postList) {
  if (!Array.isArray(postList)) return;
  const alertSearch = document.getElementById("alert-search");
  if (postList.length === 0) {
    alertSearch.classList.remove("d-none");
  } else {
    alertSearch.classList.add("d-none");
  }
  const ulElement = document.getElementById("postsList");
  if (!ulElement) return;

  ulElement.textContent = "";

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}

function initSearchInput(params) {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.get("title_like")) {
    searchInput.value = queryParams.get("title_like");
  }
  const debounceSearch = debounce(
    (e) => handleFilterChange("title_like", e.target.value),
    500
  );

  searchInput.addEventListener("input", debounceSearch);
}

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

    if (filterName === "title_like") url.searchParams.set("_page", 1);

    history.pushState({}, "", url);

    const { data, pagination } = await postApi.getAll(url.searchParams);

    renderPagination(pagination);
    renderPostList(data);
  } catch (error) {
    console.log("failed to fetch post list", error);
  }
}

function handlePrevClick(e) {
  e.preventDefault();
  const ulPagination = getPaginationElement();
  if (!ulPagination) return;

  const page = Number.parseInt(ulPagination.dataset.page);
  if (page <= 1) return;

  handleFilterChange("_page", page - 1);
}

function handleNextClick(e) {
  e.preventDefault();
  const ulPagination = getPaginationElement();
  if (!ulPagination) return;

  const page = Number.parseInt(ulPagination.dataset.page);
  const totalPages = ulPagination.dataset.totalPage;
  if (page > totalPages) return;
  handleFilterChange("_page", page + 1);
}

function initPagination() {
  //bind click event for prev/next link
  const ulPagination = getPaginationElement();
  if (!ulPagination) return;

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener("click", handlePrevClick);
  }

  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener("click", handleNextClick);
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
    initPagination();

    const queryParams = getDefaultParams();
    const { data, pagination } = await postApi.getAll(queryParams);

    initSearchInput(queryParams);
    renderPagination(pagination);
    renderPostList(data);
  } catch (error) {
    console.log(error);
  }
})();
