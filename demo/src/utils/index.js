export function delay(timeout) {
  return new Promise((resolve) => {
    global.setTimeout(resolve, timeout);
  });
}

export function getScript(src) {
  return new Promise((resolve, reject) => {
    const script = global.document.createElement("script");
    global.document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;
  });
}

export function getPagination(opts) {
  return {
    ...opts,
    showQuickJumper: true,
    showTotal: (t, range) =>
      `显示 ${Math.max(0, range[0])}-${range[1]} 条，共 ${t} 条`,
  };
}

export function uploadFile({
  file = null,
  url = "",
  method = "PUT",
  onprogress = () => {},
}) {
  const xhr = new XMLHttpRequest();

  const promise = new Promise((resolve) => {
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.onload = (e) =>
      200 <= xhr.status && 300 > xhr.status
        ? resolve({ data: e })
        : resolve({ errMsg: e });
    xhr.onerror = (e) => resolve({ errMsg: e });
    xhr.upload.onprogress = (e) => e.lengthComputable && onprogress(e);
    xhr.send(file);
  });
  promise.xhr = xhr;
  return promise;
}
