# **Authentication Controller**

## **Requests**

### **Administrator Login**

```POST: /auth/login/admin```

Body:
```
{
    "username": string,
    "password": string
}
```

Response (valid):

```
{
    "id": 1,
    "identity": "username",
    "token": "DG9RZW4",
    "refreshToken": "CMVMDG9RZW4",
    "refreshTokenExpiresAt": "1970-01-01T00:00:00.000Z"
}
```

Response (error):

```
{
    "status": "Authentication Error",
    "statusCode": 4001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 0 | OK! | Delete successful |
| 400 | Bad Request | Field validation failed |
| 1001 | Service Error | Saving token to database failed |
| 4001 | Authentication Error | Username not found |
| 4002 | Authentication Error | Password does not match |

### **Professor Login**

```POST: /auth/login/professor```

Body:
```
{
    "username": string,
    "password": string
}
```

Response (valid):

```
{
    "id": 1,
    "identity": "username",
    "token": "DG9RZW4",
    "refreshToken": "CMVMDG9RZW4",
    "refreshTokenExpiresAt": "1970-01-01T00:00:00.000Z"
}
```

Response (error):

```
{
    "status": "Authentication Error",
    "statusCode": 4001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 0 | OK! | Delete successful |
| 400 | Bad Request | Field validation failed |
| 1001 | Service Error | Saving token to database failed |
| 4001 | Authentication Error | Username not found |
| 4002 | Authentication Error | Password does not match |

### **Student Login**

```POST: /auth/login/student```

Body:
```
{
    "indexNumber" : string
}
```

Response (valid):

```
{
    "id": 1,
    "identity": "indexNumber",
    "token": "DG9RZW4",
    "refreshToken": "CMVMDG9RZW4",
    "refreshTokenExpiresAt": "1970-01-01T00:00:00.000Z"
}
```

Response (error):

```
{
    "status": "Authentication Error",
    "statusCode": 4001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 0 | OK! | Delete successful |
| 400 | Bad Request | Field validation failed |
| 1001 | Service Error | Saving token to database failed |
| 4001 | Authentication Error | Index number not found |

### **Refreshing the token**

``` POST: /auth/token/refresh```

Body:
```
{
    "refreshToken": string
}
```

Response (valid):
```
{
    "id": 1,
    "identity": "identifier",
    "token": "DG9RZW4",
    "refreshToken": "CMVMDG9RZW4",
    "refreshTokenExpiresAt": "1970-01-01T00:00:00.000Z"
}
```

Response (error):

```
{
    "status": "Authentication Error",
    "statusCode": 4001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 400 | Bad Request | Field validation failed |
| 4001 | Authentication Error | Token user was not found |
| 4003 | Authentication Error | Token was not found in the body |
| 4004 | Authentication Error | Token has expired or is no longer valid |
| 4005 | Authentication Error | Token is bad |

### **Getting token holder identity**

``` POST: /auth/token/identity```

Response (admin):
```
{
    "id": 1,
    "role": "administrator",
    "firstName": "firstName",
    "lastName": "lastName",
    "username": "username"
}
```

Response (professor):

```
{
    "id": 1,
    "role": "professor",
    "firstName": "firstName",
    "lastName": "lastName",
    "username": "username",
    "imagePath": "professors/image.png"
}
```

Response (student):

```
{
    "id": 1,
    "role": "student",
    "firstName": "firstName",
    "lastName": "lastName",
    "indexNumber": "0000000001",
    "imagePath": "students/0000000001.png"
}
```

Response (error):

```
{
    "status": "Authentication Error",
    "statusCode": 4001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 4001 | Authentication Error | Token user was not found |