function showModal(modalElement) {
  const modal = new window.bootstrap.Modal(modalElement);
  if (modal) modal.show();
}

export function registerLightbox({
  modalId,
  imgSelector,
  preSelector,
  nextSelector,
}) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;
  //   if (Boolean(dataset.registerd === false)) return;

  //selectors
  const imageElement = modalElement.querySelector(imgSelector);
  const prevButton = modalElement.querySelector(preSelector);
  const nextButton = modalElement.querySelector(nextSelector);

  if (!imageElement || !prevButton || !nextButton) return;

  //lightbox vars
  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  document.addEventListener("click", (e) => {
    const { target } = e;
    if (target.tagName !== "IMG" || !target.dataset.album) return;

    imgList = document.querySelectorAll(
      `img[data-album="${target.dataset.album}"]`
    );
    currentIndex = [...imgList].findIndex((x) => x === target);
    console.log(currentIndex);

    showImageAtIndex(currentIndex);
    showModal(modalElement);
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  modalElement.dataset.registerd = true;
}
