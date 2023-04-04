export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);
  if (!pagination || !ulPagination) return;

  //calc totalPages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  //save page and total
  ulPagination.dataset.page = _page;
  ulPagination.dataset.total = totalPages;

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

export function initPagination({ elementId, defaultParams, onChange }) {
  //bind click event for prev/next link
  const ulPagination = document.getElementById(elementId);
  if (!ulPagination) return;
  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild;

  if (prevLink) {
    prevLink.addEventListener("click", (e) => {
      e.preventDefault();
      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      if (page > 2) onChange?.(page - 1);
    });
  }

  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener("click", (e) => {
      e.preventDefault();
      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      const totalPages = ulPagination.dataset.total;
      if (page < totalPages) {
        onChange?.(page + 1);
      }
    });
  }
}
