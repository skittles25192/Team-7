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
  const product = urlParams.get(item);
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

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span><i class="fa-regular fa-circle-xmark"></i></span>`;

  alert.addEventListener('click', function (event) {
    if (event.target.tagName == 'I') { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
  //Add , duration = 3000 as a parameter
}

export function alertMessageDuration(message, scroll = true, duration = 3000) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span><i class="fa-regular fa-circle-xmark"></i></span>`;

  alert.addEventListener('click', function (event) {
    if (event.target.tagName == 'I') { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
  //Fade out effect
  alert.style.opacity = 1;
  alert.style.transition = 'opacity ' + '0.5' + 's ease';
  
  setTimeout(function () {
    alert.classList.add('fade-out');
    document.querySelector('.fade-out').style.opacity = 0;
  }, 2500);
  
  // left this here to show how you could remove the alert automatically after a certain amount of time.
  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
  //Add , duration = 3000 as a parameter
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}