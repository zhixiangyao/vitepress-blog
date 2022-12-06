function loadExternalResource(url: string, type: 'css' | 'js') {
  return new Promise((resolve, reject) => {
    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
    }
    if (tag) {
      tag.onload = () => resolve(url)
      tag.onerror = () => reject(url)
      document.head.appendChild(tag)
    }
  })
}

function utf8ToB64(str: string) {
  return window.btoa(encodeURIComponent(str))
}

function b64ToUtf8(str: string) {
  return decodeURIComponent(window.atob(str))
}

export { loadExternalResource, utf8ToB64, b64ToUtf8 }
