/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Assets/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/get-blob-duration/dist/getBlobDuration.js":
/*!****************************************************************!*\
  !*** ./node_modules/get-blob-duration/dist/getBlobDuration.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(u,o){try{var i=t[u](o),a=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(a).then(function(e){r("next",e)},function(e){r("throw",e)});e(a)}("next")})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.createElement("video"),r=new Promise(function(e){return n.addEventListener("loadedmetadata",function(){n.duration===1/0?(n.currentTime=Number.MAX_SAFE_INTEGER,n.ontimeupdate=function(){n.ontimeupdate=null,e(n.duration),n.currentTime=0}):e(n.duration)})}),n.src=window.URL.createObjectURL(t),e.abrupt("return",r);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();
//# sourceMappingURL=getBlobDuration.js.map


/***/ }),

/***/ "./src/Assets/scss/styles.scss":
/*!*************************************!*\
  !*** ./src/Assets/scss/styles.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/Assets/ts/main.ts":
/*!*******************************!*\
  !*** ./src/Assets/ts/main.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../scss/styles.scss */ "./src/Assets/scss/styles.scss");
__webpack_require__(/*! ./videoPlayer.ts */ "./src/Assets/ts/videoPlayer.ts");


/***/ }),

/***/ "./src/Assets/ts/videoPlayer.ts":
/*!**************************************!*\
  !*** ./src/Assets/ts/videoPlayer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_blob_duration_1 = __importDefault(__webpack_require__(/*! get-blob-duration */ "./node_modules/get-blob-duration/dist/getBlobDuration.js"));
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const setTotalTime = () => __awaiter(this, void 0, void 0, function* () {
    if (videoPlayer) {
        try {
            const video = yield fetch(videoPlayer.src);
            const blob = yield video.blob();
            const duration = yield get_blob_duration_1.default(blob);
        }
        catch (error) {
            console.log(error);
        }
    }
});
const handlePlayClick = () => {
    if (videoPlayer && playBtn) {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        else {
            videoPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
};
const handleVolumeClick = () => {
    if (videoPlayer && volumeBtn) {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        else {
            videoPlayer.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }
};
const existFullScreen = () => {
    const Document = document;
    if (Document && fullScreenBtn) {
        fullScreenBtn.addEventListener("click", goFullScreen);
        fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        if (Document.exitFullscreen) {
            Document.exitFullscreen();
        }
        else if (Document.mozCancelFullScreen) {
            Document.mozCancelFullScreen();
        }
        else if (Document.webkitExistFullScreen) {
            Document.webkitExistFullScreen();
        }
        else if (Document.msExistFullScreen) {
            Document.msExistFullScreen();
        }
    }
};
const goFullScreen = () => {
    const VideoContainer = videoContainer;
    if (VideoContainer && fullScreenBtn) {
        fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        fullScreenBtn.removeEventListener("click", goFullScreen);
        fullScreenBtn.addEventListener("click", existFullScreen);
        if (VideoContainer.requestFullscreen) {
            VideoContainer.requestFullscreen();
        }
        else if (VideoContainer.mozRequestFullScreen) {
            VideoContainer.mozRequestFullScreen();
        }
        else if (VideoContainer.webkitRequestFullScreen) {
            VideoContainer.webkitRequestFullScreen();
        }
        else if (VideoContainer.msRequestFullScreen) {
            VideoContainer.msRequestFullScreen();
        }
    }
};
const init = () => {
    if (playBtn && volumeBtn && fullScreenBtn) {
        playBtn.addEventListener("click", handlePlayClick);
        volumeBtn.addEventListener("click", handleVolumeClick);
        fullScreenBtn.addEventListener("click", goFullScreen);
    }
};
if (videoContainer) {
    init();
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map