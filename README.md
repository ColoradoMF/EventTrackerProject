# EventTrackerProject

## Endpoints

| HTTP Verb | URI                                 | Request Body        | Response Body                 | Status                       |
|-----------|-------------------------------------|---------------------|-------------------------------|------------------------------|
| GET       | `/api/items`                        | _None_              | JSON array of all items       | 200 OK                       |
| GET       | `/api/items/{id}`                   | _None_              | JSON of single item           | 200 OK <br> 404 Not Found    |
| POST      | `/api/items?storeId={storeId}`      | JSON of new item    | JSON of created item          | 201 Created <br> 400 Bad Request |
| PUT       | `/api/items/{id}?storeId={storeId}` | JSON of updated item| JSON of updated item          | 200 OK <br> 404 Not Found    |
| DELETE    | `/api/items/{id}`                   | _None_              | _None_                        | 204 No Content <br> 404 Not Found |

