/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (typeof options !== "object" || options === null) {
    throw new Error("createRequest ожидает объект options");
  }

  const { url, data = {}, method = "GET", callback } = options;
/*
  if (typeof callback !== "function") {
    throw new Error("createRequest требует функцию callback");
  }

  if (typeof url !== "string") {
    throw new Error("createRequest требует строку url");
  }
*/
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  let requestUrl = url;
  let requestdata = null;

  if (method === "GET") {
    const queryString = new URLSearchParams(data).toString();

    if (queryString) {
      requestUrl = `${url}?${queryString}`;
    }
  } else {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    requestdata = formData;
  }

  xhr.open(method, requestUrl);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      const errorMsg =
        xhr.response?.message || `HTTP error! status: ${xhr.status}`;
      callback(new Error(errorMsg), null);
    }
  };

  xhr.onerror = () => {
    callback(new Error("Network error"), null);
  };

  xhr.send(requestdata);
};
