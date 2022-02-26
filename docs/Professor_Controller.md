# **Professor Controller**

## **Requests:**

### **Get single or multiple professors**

```GET: /api/professor?by=[default | all]&id=[number]```

**When getting by "all", id does not need to be specified*

Response (default):

```
{
    "professorId": 1,
    "firstName": "firstName",
    "lastName": "lastName",
    "username": "username",
    "passwordHash": "CGFZC3DVCMQ",
    "imagePath": "professors/image.png"
}
```

Response (all):

```
[
    {
        "professorId": 1,
        "firstName": "firstName",
        "lastName": "lastName",
        "username": "username",
        "passwordHash": "CGFZC3DVCMQ",
        "imagePath": "professors/image.png"
    },
    ...
]
```

Response (error):

```
{
    "status": "Controller Warning",
    "statusCode": 2001,
    "message": null
}
```

Response codes:

| Response code | Response status | Reason |
|---|---|---|
| 400 | Bad Request | "by" query is missing or is incorrect |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 2001 | Controller Warning | There are no professors matching this query |

---

### **Add professor**

```POST: /api/professor```

Body:
```
{
    "firstName": string,
    "lastName": string,
    "username": string,
    "password": string
}
```

Response (valid):
```
{
    "professorId": 1
    "firstName": "firstName",
    "lastName": "lastName",
    "username": "username",
    "passwordHash": "CGFZC3DVCMQ",
    "imagePath": null,
}
```

Response (error):

```
{
    "status": "Controller Error",
    "statusCode": 2002,
    "message": null
}
```

Response Codes:

| Response code | Response status | Reason |
|---|---|---|
| 400 | Bad Request | Field validation failed |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 1001 | Service Error | Saving to the database failed |
| 2002 | Controller Error | Username is already taken |

---

### **Update professor**

``` PATCH: /api/professor ```

**NULL fields do not need to be specified*

Body:
```
{
    "professorId" : number,
    "firstName": string | null,
    "lastName": string | null,
    "username": string | null,
    "password": string | null
}
```

Response (status / error):

```
{
    "status": "OK!",
    "statusCode": 0,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 0 | OK! | Update successful |
| 400 | Bad Request | Field validation failed |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 1001 | Service Error | Saving to the database failed |
| 2002 | Controller Error | Username is already taken |

---

### **Delete professor**

``` DELETE: /api/professor ```

Body: 
```
{
    "professorId": number
}
```

Response (status / error):

```
{
    "status": "OK!",
    "statusCode": 0,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 0 | OK! | Delete successful |
| 400 | Bad Request | Field validation failed |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 1002 | Service Error | Deleting from the database failed |

### **Upload professor photo**

```POST: /api/professor/image?id=[number]```

Body:

Multipart/form-data: image=...

Response:

```
{
    "status": "OK!",
    "statusCode": 0,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 0 | OK! | Upload successful |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 413 | Payload Too Large | Image exceeds 3MB |
| 415 | Unsupported Media Type | File is not an image |
| 1001 | Service Error | Failed to update professor entry |
| 2001 | Controller Warning | Professor does not exist |
| 2003 | Controller Error | Failed to save image |