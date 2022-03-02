export const DatabaseConfiguration = {
    hostname: "mysql",
    port: 3306,
    username: "app",
    password: "app",
    database: "student_testing_platform"
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