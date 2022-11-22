 const dev  = {
    API_URL : "http://localhost:8080/api/v1"
};

const prod  = {
    API_URL : "https://nftspaces.com/api/v1"
};

module.exports  = process.env.NODE_ENV === 'development'? dev:prod;

   