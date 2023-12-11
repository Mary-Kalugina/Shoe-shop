export const baseUrl = 'http://localhost:7070/api/';

export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Ошибка при запросе данных');
    }

    const data = await response.json();

    if (data.length > 0) {
      return data;
    } else if (Object.keys(data).length > 0) {
      return data;
    }
     else {
      console.log('Нет данных для отображения');
      return [];
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error; 
  }
}

export function topSales() {
  return fetchData(`${baseUrl}top-sales`);
}

export function categoryItems(type, offset) {
  return fetchData(`${baseUrl}items?categoryId=${type}&offset=${offset}`);
}

export function items(offset) {
  return fetchData(`${baseUrl}items?offset=${offset}`);
}

export function category(type) {
  return fetchData(`${baseUrl}items?categoryId=${type}`);
}

export function find(text) {
  return fetchData(`${baseUrl}items?q=${text}`);
}

export function categories() {
  return fetchData(`${baseUrl}categories`)
}

export function itemData(id) {
  return fetchData(`${baseUrl}items/${id}`)
}

export default function postOrder(data) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(data => {
        console.log('Order submitted successfully:', data);
        resolve(data);
      })
      .catch(error => {
        console.error('Error while submitting order:', error);
        console.error('URL:', `${baseUrl}order`);
        reject(error);
      });
  });
}





