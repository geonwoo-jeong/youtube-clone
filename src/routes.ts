// Global
const HOME: string = "/";
const JOIN: string = "/join";
const LOGIN: string = "/login";
const LOGOUT: string = "/logout";
const SEARCH: string = "/search";

// Users
const USERS: string = "/users";
const USER_DETAIL: string = "/:id";
const EDIT_PROFILE: string = "/edit-profile";
const CHANGE_PASSWORD: string = "/change-password";

// Videos
const VIDEOS: string = "/videos";
const UPLOAD: string = "/upload";
const VIDEO_DETAIL: string = "/:id";
const EDIT_VIDEO: string = "/:id/edit";
const DELETE_VIDEO: string = "/:id/delete";

// Uploads
const UPLOADS: string = "/uploads";

// Github
const GITHUB: string = "/auth/github";
const GITHUB_CALLBACK: string = "/auth/github/callback";

// Facebook
const FACEBOOK: string = "/auth/facebook";
const FACEBOOK_CALLBACK: string = "/auth/facebook/callback";

// Kakao
const KAKAO: string = "/auth/kakao";
const KAKAO_CALLBACK: string = "/auth/kakao/callback";

// Line
const LINE: string = "/auth/line";
const LINE_CALLBACK: string = "/auth/line/callback";

// API
const API: string = "/api";
const REGISTER_VIEW: string = "/:id/view";
const ADD_COMMENT: string = "/:id/comment";

const userDetail = (id?: string): string => {
  if (id) {
    return `/users/${id}`;
  } else {
    return USER_DETAIL;
  }
};

const videoDetail = (id?: string): string => {
  if (id) {
    return `/videos/${id}`;
  } else {
    return VIDEO_DETAIL;
  }
};

const editVideo = (id?: string) : string => {
  if (id) {
    return `/videos/${id}/edit`;
  } else {
    return EDIT_VIDEO;
  }
};

const deleteVideo = (id?: string) : string => {
  if (id) {
    return `/videos/${id}/delete`;
  } else {
    return DELETE_VIDEO;
  }
};

const routes = {
  addComment: ADD_COMMENT,
  api: API,
  changePassword: CHANGE_PASSWORD,
  deleteVideo,
  editProfile: EDIT_PROFILE,
  editVideo,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  home: HOME,
  join: JOIN,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  line: LINE,
  lineCallback: LINE_CALLBACK,
  login: LOGIN,
  logout: LOGOUT,
  registerView: REGISTER_VIEW,
  search: SEARCH,
  upload: UPLOAD,
  uploads: UPLOADS,
  userDetail,
  users: USERS,
  videoDetail,
  videos: VIDEOS
};

export default routes;
