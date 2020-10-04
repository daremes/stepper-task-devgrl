import { basePrices, periods } from './mockData';

function mockApi(method, payload) {
  if (method === 'GET') {
    const data = { basePrices, periods };
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
  if (method === 'POST') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ status: 'OK', payload });
      }, 1000);
    });
  }
}
export default mockApi;
