export function setTextContent(parent, selector, text) {
  if (!parent) return;
  const element = parent.querySelector(selector);
  if (element) element.textContent = text;
}

export function setFieldValue(form, selector, value) {
  const field = form.querySelector(selector);
  if (!field) return;
  field.value = value;
}

export function setBackgroudImageUrl(parent, selector, imgUrl) {
  const element = parent.querySelector(selector);
  if (!element) return;
  element.style.backgroundImage = `url("${imgUrl}")`;
}
