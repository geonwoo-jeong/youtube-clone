// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Uploads
const UPLOADS = "/uploads";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

const userDetail = (id?: string) => {
  if (id) {
    return `/users/${id}`;
  } else {
    return USER_DETAIL;
  }
};

const videoDetail = (id?: string) => {
  if (id) {
    return `/videos/${id}`;
  } else {
    return VIDEO_DETAIL;
  }
};

const editVideo = (id?: string) => {
  if (id) {
    return `/videos/${id}/edit`;
  } else {
    return EDIT_VIDEO;
  }
};

const deleteVideo = (id?: string) => {
  if (id) {
    return `/videos/${id}/delete`;
  } else {
    return DELETE_VIDEO;
  }
};

const routes = {
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
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  upload: UPLOAD,
  uploads: UPLOADS,
  userDetail,
  users: USERS,
  videoDetail,
  videos: VIDEOS
};

export default routes;
