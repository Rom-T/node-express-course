const dataListDiv = document.getElementById('dataList');

document.getElementById('fetchData').addEventListener('click', () => {
  fetch('/api/v1/products')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const dataInfo = document.createElement('div');
        dataInfo.innerHTML = `
        <h3>Name: ${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.desc}</p>
        `;
        dataListDiv.appendChild(dataInfo);
      });
    })
    .catch(error => {
      console.error('Error fetch:', error);
    });
});
