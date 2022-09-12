 const dev  = {
    API_URL : "http://localhost:8080/api"
};

const prod  = {
    API_URL : "http://localhost:8080/api"
};

module.exports  = process.env.NODE_ENV=== 'development'? dev:prod;

   