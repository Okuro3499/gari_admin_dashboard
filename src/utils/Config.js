// config.js
const environments = {
    development: 'http://localhost:3001/api/',
    staging: 'https://staging.example.com/api/',
    production: 'https://example.com/api/'
  } 
  
  const ENV = process.env.REACT_APP_STAGE || 'development' 
  
  const baseURL = environments[ENV] 
  
  export default baseURL 
  