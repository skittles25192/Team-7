// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParameter(item){

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get(item)
return product;
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);

}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = true) {

  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings =  list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = 'afterbegin', clear = true) {
  const template = await templateFn(data);

  if (clear) {
      parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, template);
  if(callback) {
      callback(data);
  }
}

function loadTemplate(path) {
  return async function() {
    return fetch(path)
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error('Network response was not ok.');
        }
      });
  };
} 

export async function loadHeaderFooter() {
  return new Promise((resolve, reject) => {
    const headerTemplateFn = loadTemplate('/partials/header.html');
    const footerTemplateFn = loadTemplate('/partials/footer.html');
    const headerElement = document.querySelector('#main-header');
    const footerElement = document.querySelector('#main-footer');

    renderWithTemplate(headerTemplateFn, headerElement)
      .then(() => renderWithTemplate(footerTemplateFn, footerElement))
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}