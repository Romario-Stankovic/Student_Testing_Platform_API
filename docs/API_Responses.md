# **API Responses**


This is a generalized list of response codes which can be received when making a request to the API.

---

## **Generic**

Generic responses are used when the API does not need to return any relevant data, but some sort of response is needed to inform the end user of the outcome.

| Response code | Response status | Reason |
|---|---|---|
|0|OK!|Everything is fine!|

---

## **Service**

Service responses are low level responses where the intended interaction with the database did not result in a positive response.

| Response code | Response status | Reason |
|---|---|---|
| 1001 | Service Error | Saving to the database failed |
| 1002 | Service Error | Deleting from the database failed |

---

## **Controllers**

Controller responses are higher level responses caused before or after a service interaction.

| Response code | Response status | Reason |
|---|---|---|
| 2001 | Controller Warning | There are no entries in the database |
| 2002 | Controller Error | Insertion with a duplicate unique value |
| 2003 | Controller Error | Failed to save uploaded asset |

---

## **Application**

Application responses are application specific and are usually caused by the end users.

| Response code | Response status | Reason |
|---|---|---|
| 3001 | Application Error | Cannot generate work because the test doesn't have enough questions |
| 3002 | Application Error | Cannot edit/end work because it has already ended |

---

## **Authentication**

Authentication is used to register the user to the API and allowing him to make requests. In case the user cannot authenticate with the API, these responses will be given.

| Response code | Response status | Reason |
|---|---|---|
| 4001 | Authentication Error | The user does not exist in the database |
| 4002 | Authentication Error | Passwords do not match |
| 4003 | Authentication Error | Refresh token does not exist |
| 4004 | Authentication Error | Expired or invalid token |
| 4005 | Authentication Error | Bad token received |

---

## **HTTP**

These are default HTTP responses that can be received from the API

| Response code | Response status | Reason |
|---|---|---|
| 200 | OK | The request succeeded and a response was given |
| 201 | Created | The resource was successfully created |
| 400 | Bad Request | The request was rejected due to bad data |
| 401 | Unauthorized | The client is not authorized to the API |
| 403 | Forbidden | The client does not have access to this resource |
| 404 | Not Found | The server cannot find the requested resource |
| 413 | Payload Too Large | The sent payload exceeds size limits |
| 415 | Unsupported Media Type | The server does not accept this type of media |
| 500 | Internal Server Error | The server did not fair well with this request |