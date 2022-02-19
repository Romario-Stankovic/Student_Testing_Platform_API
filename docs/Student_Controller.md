# **Student Controller**

## **Requests:**

### **Get single or multiple students**

```GET: /api/student?by=[default | all]&id=[number]```

**When getting by "all", id does not need to be specified*

Response (default):

```
{
    "studentId": 1,
    "firstName": "firstName",
    "lastName": "lastName",
    "indexNumber": "0000000001",
    "imagePath": "students/0000000001.png"
}
```

Response (all):

```
[
    {
        "studentId": 1,
        "firstName": "firstName",
        "lastName": "lastName",
        "indexNumber": "0000000001",
        "imagePath": "students/0000000001.png"
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
| 2001 | Controller Warning | There are no students matching this query |

---

### **Add student**

```POST: /api/student```

Body:
```
{
    "firstName": string,
    "lastName": string,
    "indexNumber" : string
}
```

Response (valid):
```
{
    "studentId": 1
    "firstName": "firstName",
    "lastName": "lastName",
    "indexNumber": "0000000000",
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
| 2002 | Controller Error | Index Number is already taken |

---

### **Update student**

``` PATCH: /api/student ```

**NULL fields do not need to be specified*

Body:
```
{
    "studentId" : number,
    "firstName": string | null,
    "lastName": string | null,
    "indexNumber": string | null
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
| 2002 | Controller Error | Index Number is already taken |

---

### **Delete student**

``` DELETE: /api/student ```

Body: 
```
{
    "studentId": number
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