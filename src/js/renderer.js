window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/')
    .then(response => {
      if (response.ok) {
        console.log('Connected to the server!');
        // 추가적인 작업 수행
      } else {
        console.error('Failed to connect to the server');
      }
    })
    .catch(error => {
      console.error('An error occurred during the connection:', error);
    });
});