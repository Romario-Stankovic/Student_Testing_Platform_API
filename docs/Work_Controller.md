# **Work Controller**

## **Requests**

<br>

### **Get single or multiple works**
<br>

```GET: /api/work?by=[default | test | student]&id=[number]```

Response (default):
```
{
    "workId": 1,
    "studentId": 1,
    "testId": 1,
    "startedAt": "1970-01-01T00:00:00.000Z",
    "endedAt": "1970-01-01T00:00:00.000Z",
    "points": 100
}
```

Response (test):

```
[
    {
        "workId": 1,
        "studentId": 1,
        "testId": 1,
        "startedAt": "1970-01-01T00:00:00.000Z",
        "endedAt": "1970-01-01T00:00:00.000Z",
        "points": 100,
        "student": {
            "studentId": 1,
            "firstName": "firstName",
            "lastName": "lastName",
            "indexNumber": "0000000001",
            "imagePath": "students/0000000001.png"
        }
    },
    {
        "workId": 2,
        "studentId": 2,
        "testId": 1,
        "startedAt": "1970-01-01T00:00:00.000Z",
        "endedAt": "1970-01-01T00:00:00.000Z",
        "points": 100,
        "student": {...}
    },
    ...
]
```

Response (student):

```
[
    {
        "workId": 1,
        "studentId": 1,
        "testId": 1,
        "startedAt": "1970-01-01T00:00:00.000Z",
        "endedAt": "1970-01-01T00:00:00.000Z",
        "points": 100,
        "test": {
            "testId": 1,
            "professorId": 1,
            "testName": "Test",
            "duration": 300,
            "questionCount": 20,
            "startAt": "1970-01-01T00:00:00.000Z",
            "endAt": "1970-01-01T00:00:00.000Z"
        }
    },
    {
        "workId": 2,
        "studentId": 1,
        "testId": 2,
        "startedAt": "1970-01-01T00:00:00.000Z",
        "endedAt": "1970-01-01T00:00:00.000Z",
        "points": 100,
        "test": {...}
    },
    ...
]
```

Response (error):

```
{
    "status": "Controller Error",
    "statusCode": 2001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 400 | Bad Request | "by" query is missing or incorrect |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 2001 | Controller Warning | There are no works matching this query |

<br>

---

<br>

### **Get single work question**
<br>

```GET: /api/work/question?workId=[number]&questionId=[number]```

Response (valid):
```
{
    "questionId": 1,
    "questionText": "Text",
    "imagePath": null,
    "multichoice": false,
    "duration": 0,
    "answers": [
        {
            "answerId": 1,
            "answerText": "Text",
            "imagePath": null,
            "isChecked": false,
            "isCorrect": null
        },
        {
            "answerId": 2,
            "answerText": "Text",
            "imagePath": null,
            "isChecked": true,
            "isCorrect": null
        },
        ...
    ]
}
```

Response (error):

```
{
    "status": "Controller Error",
    "statusCode": 2001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 2001 | Controller Warning | There are no work questions matching this query |

<br>

---

<br>

### **Get finished work questions**
<br>

```GET: /api/work/questions?id=[number]```

Response (valid):
```
[
  {
    "questionId": 1,
    "questionText": "Text",
    "imagePath": null,
    "multichoice": false,
    "duration": 0,
    "answers": [
      {
        "answerId": 1,
        "answerText": "Text",
        "imagePath": null,
        "isChecked": false,
        "isCorrect": false
      },
      ...
    ]
  },
  ...
]
```

Response (error):

```
{
    "status": "Controller Error",
    "statusCode": 2001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 2001 | Controller Warning | There are no work questions matching this query |

<br>

---

<br>

### **Start work**
<br>

```POST /api/work/start```

Body:
```
{
    "studentId": number,
    "testId": number
}
```

Response (valid):
```
{
    "workId": 1,
    "testName": "Name",
    "startedAt": "1970-01-01T00:00:00.000Z",
    "endsAt": "1970-01-01T00:00:00.000Z",
    "questions": [
        1,
        2,
        3,
        ...
    ]
}
```

Response (error):

```
{
    "status": "Controller Error",
    "statusCode": 2001,
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
| 3001 | Application Error | There are not enough questions for the work to start |

<br>

---

<br>

### **Finish work**
<br>

```POST /api/work/finish```

Body:
```
{
    "workId": number
}
```

Response (valid):
```
{
    "workId": 1,
    "studentId": 1,
    "testId": 1,
    "startedAt": "1970-01-01T00:00:00.000Z",
    "endedAt": "1970-01-01T00:00:00.000Z",
    "points": 0
}
```

Response (error):

```
{
    "status": "Controller Error",
    "statusCode": 2001,
    "message": null
}
```

Response Codes:
| Response code | Response status | Reason |
|---|---|---|
| 400 | Bad Request | Field validation failed |
| 401 | Unauthorized | The user accessing this resource is not authorized |
| 403 | Forbidden | Wrong user is accessing this resource |
| 2001 | Controller Warning | Work does not exist |
| 3002 | Application Error | The work has already ended |

<br>

---

<br>

### **Update work answers**
<br>

```PATCH /api/work/question```

Body:
```
{
    "workId": number,
    "duration": number,
    "answers": {
        "id": number,
        "isChecked": boolean
    }[]
}
```

Response (status / error):
```
{
    "status": "Controller Error",
    "statusCode": 2001,
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
| 2001 | Controller Warning | Work does not exist |
| 3002 | Application Error | The work has ended, can't update answers anymore |