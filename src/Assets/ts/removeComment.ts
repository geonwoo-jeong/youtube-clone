import axios from "axios";

const commentList = document.getElementById(
  "jsCommentList"
) as HTMLUListElement;

const reduceCount = (): void => {
  const numberSpan = document.getElementById(
    "jsCommentNumber"
  ) as HTMLSpanElement;
  const currentNumber = +numberSpan.innerHTML;

  numberSpan.innerHTML = String(currentNumber - 1);
};

const removeComment = (target: HTMLElement): void => {
  const { parentElement } = target;
  if (parentElement) {
    parentElement.remove();
  }
};

const sendRemoveRequest = async (
  commentId: string,
  target: HTMLElement
): Promise<void> => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    data: {
      commentId
    },
    method: "POST",
    url: `/api/${videoId}/comments/${commentId}/delete`
  });
  if (response.status === 200) {
    removeComment(target);
    reduceCount();
  } else {
    console.log("something wrong");
  }
};

const handleClick = (event: any) => {
  const {
    target,
    target: {
      parentNode,
      parentNode: {
        dataset: { id: commentId }
      },
      classList,
      tagName,
      dataset: { id }
    }
  } = event;
  if (tagName === "I" && classList.contains("fa-times")) {
    const answer = confirm("Do you want to remove comment?");
    if (answer) {
      sendRemoveRequest(commentId, parentNode);
    }
  } else if (tagName === "SPAN" && classList.contains("comment__icon")) {
    const answer = confirm("Do you want to remove comment?");
    if (answer) {
      sendRemoveRequest(id, target);
    }
  }
};

const removeCommentInit = () => {
  commentList.addEventListener("click", handleClick);
};

if (commentList) {
  removeCommentInit();
}
