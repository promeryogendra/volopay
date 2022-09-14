export const getAuth = () => {
  let auth = {};
  try {
    auth = JSON.parse(localStorage.getItem("auth"));
  } catch (e) {
    auth = {};
  }
  return auth || {};
};
export const setAuth = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const checkScrolledBottom = () => {
  let scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  let scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight;
  let clientHeight =
    document.documentElement.clientHeight || window.innerHeight;
  return scrollHeight - Math.ceil(scrollTop + clientHeight) < 100;
};

export const throttle = (callback, limit) => {
  var wait = false;
  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
};
