// test.js
const apiClient = require('../index')
async function testPostRequest() {
  const response = await apiClient({
    BASE_URL: 'https://api.example.com',        
    methodType: 'POST',
    endpoint: '/users',
    payload: { name: 'John Doe' }
  });

  console.log('POST request result:', response);
  if (response.id !== 1 || response.name !== 'John Doe') {
    console.error('POST test failed');
  } else {
    console.log('POST test passed');
  }
}

// Test GET request
async function testGetRequest() {
  const response = await apiClient({
    BASE_URL: 'https://api.example.com',
    methodType: 'GET',
    endpoint: '/users/1',
    payload: {}
  });

  console.log('GET request result:', response);
  if (response.id !== 1 || response.name !== 'John Doe') {
    console.error('GET test failed');
  } else {
    console.log('GET test passed');
  }
}

// Test unsupported method type
async function testUnsupportedMethod() {
  try {
    await apiClient({
      BASE_URL: 'https://api.example.com',
      methodType: 'DELETE',  // Unsupported method
      endpoint: '/users/1',
      payload: {}
    });
    console.error('Unsupported method test failed (no error thrown)');
  } catch (error) {
    console.log('Unsupported method test passed');
  }
}

// Run the tests
testPostRequest();
testGetRequest();
testUnsupportedMethod();
