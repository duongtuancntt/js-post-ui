import postApi from "./api/postApi";
import { initPostForm } from "./untils/post-form";

// MAIN
(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get("id");

    const defaultValues = postId
      ? await postApi.getById(postId)
      : {
          title: "",
          description: "",
          atuhor: "",
          imageUrl: "",
        };

    initPostForm({
      formId: "postForm",
      defaultValues,
      onSubmit: (formValues) => console.log(formValues),
    });
  } catch (error) {
    console.log("failed to fetch post details", error);
  }
})();
