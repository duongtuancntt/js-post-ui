import dayjs from "dayjs";
import postApi from "./api/postApi";
import { setTextContent, registerLightbox } from "./untils";

function renderPostDetail(post) {
  const divElementPost = document.querySelector(".post-detail-main");
  console.log(divElementPost);

  setTextContent(divElementPost, "#postDetailTitle", post.title);
  setTextContent(divElementPost, "#postDetailAuthor", post.author);
  setTextContent(divElementPost, "#postDetailDescription", post.description);
  setTextContent(
    divElementPost,
    "#postDetailTimeSpan",
    dayjs(post.updateAt).format(" - DD/MM/YYYY - HH:mm")
  );
  const heroImage = document.getElementById("postHeroImage");
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;

    heroImage.addEventListener("error", () => {
      heroImage.src = `https://via.placeholder.com/960x400?text=${post.title}`;
    });
  }

  //   const thumbnailDetailPost = document.querySelector(".post-image");
  //   thumbnailDetailPost.src = post.imageUrl;

  const linkPost = document.getElementById("goToEditPageLink");
  if (linkPost) {
    linkPost.href = `/add-edit-post.html?id=${post.id}`;
  }
}

async function main() {
  registerLightbox({
    modalId: "lightbox",
    imgSelector: 'img[data-id="lightboxImg"]',
    preSelector: 'button[data-id="lightboxPre"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  });
  try {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    const post = await postApi.getById(postId);
    if (!post) return;
    renderPostDetail(post);
  } catch (error) {
    console.log("Failed!", error);
  }
}

main();
