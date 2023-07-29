import { clientCredentials } from '../client';

const createOrderProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrderProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getOrderProductsByOrderId = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products?orderId=${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateOrderProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const deleteOrderProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  createOrderProduct, getSingleOrderProduct, getOrderProductsByOrderId, updateOrderProduct, deleteOrderProduct,
};
