const { default: axios } = require("axios");
async function getCacheData (cacheName,endpoint){
    
    const cache = await caches.open(cacheName);
    const response = cache.match(endpoint);
    if(response){
        const cachedData = await response.json();
        return  cachedData
    }
    return null;

}

async function putCacheData(cacheName , endpoint , data) {
    const cache = await caches.open(cacheName);
    const response = new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
    await cache.put(endpoint, response);
}


module.exports = async function apiClient({ BASE_URL , methodType , endpoint , payload,cacheName = 'api-cache', useCache = true}){
    try {

        if (useCache) {
            const cachedData = await getCacheData(cacheName, endpoint);
            if (cachedData) {
              console.log("Using cached data for:", endpoint);
              return cachedData;
            }
          }


        let response;
        switch (methodType) {
          case "POST":
            response = await axios.post(BASE_URL,`${endpoint}`, payload);
            break;
          case "GET":
            response = await axios.get(BASE_URL,`${endpoint}`);
            break;
          case "PUT":
            response = await axios.put(BASE_URL,`${endpoint}`, payload);
            break;
          default:
            throw new Error(`Unsupported method type: ${methodType}`);
        }
        if(useCache && response && response.data){
            await putCacheData(cacheName, endpoint, response.data)
        }
        return response.data;
      } catch (error) {
        console.error('API call failed:',endpoint,methodType,payload);
        throw error; 
      }

}
