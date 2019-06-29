import axios from "axios";

const addCommentForm = document.getElementById(
  "jsAddComment"
) as HTMLFormElement;

const sendComment = async (comment: string): Promise<void> => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    data: {
      comment
    },
    method: "POST",
    url: `/api/${videoId}/comment`
  });
  console.log(response);
};

const handleSubmit = (event: Event): void => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector(
    "input"
  ) as HTMLInputElement;
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const addCommentInit = (): void => {
  addCommentForm.addEventListener("submit", handleSubmit);
};

if (addCommentForm) {
  addCommentInit();
}
