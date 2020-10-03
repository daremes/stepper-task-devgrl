import { basePrices, periods } from "./mockData";

function mockApi(method) {
  if (method === "GET") {
    const data = { basePrices, periods };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
  if (method === "POST") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("OK");
      }, 1000);
    });
  }
}
export default mockApi;
