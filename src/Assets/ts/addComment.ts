import axios from "axios";

const addCommentForm = document.getElementById(
  "jsAddComment"
) as HTMLFormElement;
const commentList = document.getElementById(
  "jsCommentList"
) as HTMLUListElement;
const commentNumber = document.getElementById(
  "jsCommentNumber"
) as HTMLSpanElement;

const increaseNumber = () => {
  commentNumber.innerHTML = String(parseInt(commentNumber.innerHTML, 10) + 1);
};

const addComment = (comment: string): void => {
  const li = document.createElement("li") as HTMLLIElement;
  const span = document.createElement("span") as HTMLSpanElement;
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment: string): Promise<void> => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    data: {
      comment
    },
    method: "POST",
    url: `/api/${videoId}/comment`
  });
  if (response.status === 200) {
    addComment(comment);
  }
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
