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

const addComment = (comment: string, data: any): void => {
  const { avatarUrl, id } = data;
  const li = document.createElement("li") as HTMLLIElement;
  const avatarSpan = document.createElement("span") as HTMLSpanElement;
  const commentSpan = document.createElement("span") as HTMLSpanElement;
  const iconSpan = document.createElement("span") as HTMLSpanElement;
  const avatarImg = document.createElement("img") as HTMLImageElement;
  const icon = document.createElement("I") as HTMLElement;

  icon.classList.add("fas");
  icon.classList.add("fa-times");
  avatarImg.classList.add("comment__avatar");
  commentSpan.classList.add("comment__text");
  iconSpan.classList.add("comment__icon");

  commentSpan.innerHTML = comment;
  iconSpan.dataset.id = id;
  avatarImg.src = avatarUrl;

  iconSpan.appendChild(icon);
  avatarSpan.appendChild(avatarImg);
  li.appendChild(avatarSpan);
  li.appendChild(commentSpan);
  li.appendChild(iconSpan);
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
    addComment(comment, response.data);
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
