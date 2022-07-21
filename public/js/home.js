import postApi from "./api/postApi";
import { setTextContent } from "./untils";

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

    const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
    if (thumbnailElement) thumbnailElement.src = post.imageUrl;
    //attach event
    return liElement;
  } catch (error) {
    console.log("failed to create post item", error);
  }
}

function renderPostList(postList) {
  console.log({ postList });
  if (!Array.isArray(postList) || postList.length === 0) return;

  const ulElement = document.getElementById("postsList");
  if (!ulElement) return;
  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}

async function main() {
  try {
    const params = {
      _page: 2,
      _limit: 9,
    };
    const { data, pagination } = await postApi.getAll(params);
    renderPostList(data);
  } catch (error) {
    console.log(error);
  }
}

main();
