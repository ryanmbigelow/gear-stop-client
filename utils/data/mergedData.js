import { getCartByCustomerId } from './orderData';
import { getOrderProductsByOrderId } from './orderProductData';

const getOrderDetails = (customerId) => new Promise((resolve, reject) => {
  getCartByCustomerId(customerId).then((order) => {
    getOrderProductsByOrderId(order.id)
      .then((orderProducts) => resolve({ ...order, orderProducts }));
  }).catch(reject);
});

const getCartDetails = (customerId) => new Promise((resolve, reject) => {
  getCartByCustomerId(customerId).then((orders) => {
    orders.find((order) => order.isOpen === true).then((openOrder) => {
      getOrderProductsByOrderId(openOrder.id)
        .then((orderProducts) => resolve({ ...openOrder, orderProducts }));
    });
  }).catch(reject);
});

export { getOrderDetails, getCartDetails };
