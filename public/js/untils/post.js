import { setTextContent } from "../untils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function createPostElement(post) {
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
    //go to post detail
    const divElement = liElement.firstElementChild;
    if (divElement) {
      divElement.addEventListener("click", () => {
        window.location.assign(`/post-detail.html?id=${post.id}`);
      });
    }

    return liElement;
  } catch (error) {
    console.log("failed to create post item", error);
  }
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;
  const alertSearch = document.getElementById("alert-search");
  if (postList.length === 0) {
    alertSearch.classList.remove("d-none");
  } else {
    alertSearch.classList.add("d-none");
  }
  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;
  ulElement.textContent = "";

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
