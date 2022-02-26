export const DatabaseConfiguration = {
    hostname: "localhost",
    port: 3306,
    username: "app",
    password: "app",
    database: "testing_platform"
};

export const JWTSecret: string = "this is a secret";

export const StorageConfiguration = {
    mainDestination: "storage/",
    urlPrefix: "/assets/",
    
    images: {
        destination: "images/",
        maxSize: 1024 * 1024 * 3
    }

};