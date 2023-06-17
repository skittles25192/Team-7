const baseURL = import.meta.env.VITE_SERVER_URL;

// var responseClone; // 1
// fetch(baseURL + `products/search/tents`)
// .then(function (response) {
//     responseClone = response.clone(); // 2
//     return response.json();
// })
// .then(function (data) {
//     // Do something with data
// }, function (rejectionReason) { // 3
//     console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
//     responseClone.text() // 5
//     .then(function (bodyText) {
//         console.log('Received the following instead of valid JSON:', bodyText); // 6
//     });
// });

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    let jsonResponse = res.json();
    throw { name: 'servicesError', message: jsonResponse };
    //throw new Error('Bad Response');
  }
}

export async function getProductsByCategory(category) {
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function findProductById(id) {
  return fetch(baseURL + `product/${id}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + 'checkout/', options).then(convertToJson);
}

export async function loginRequest(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + 'login', options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: 'GET',
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + 'orders', options).then(convertToJson);
  console.log(response);
  return response;
}