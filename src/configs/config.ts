export const DatabaseConfiguration = {
    hostname: "localhost",
    port: 3306,
    username: "app",
    password: "app",
    database: "testing_platform"
}

// JSON Web Token
export const JWTSecret : string = "this is a secret";

export const StorageConfiguration = {
    storage: "storage/",
    images: "storage/images/",

    maxImageSize: 1024 * 1024 * 3 //Bytes => 3MB
}