export const DatabaseConfiguration = {
    hostname: "localhost",
    port: 3306,
    username: "app",
    password: "app",
    database: "testing_platform"
};

// JSON Web Token
export const JWTSecret: string = "this is a secret";

export const StorageConfiguration = {
    mainDestination: "storage/",

    image: {
        destination: "storage/images",
        urlPrefix: "/assets/images",
        maxSize: 1024 * 1024 * 3,//(Bytes) 3 MB
        maxAge: 1000 * 60 * 60 * 24, //(ms) 1 Day, keep in browser cache for 1 day
    }

};