# Genre API
## Create
- Endpoint : POST /api/comic/genres
- Headers : 
    - Authorization : token
- Request Body :
```json
{
    "name": "test genre"
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "test genre"
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Unauthorized"
}
```

#
## Update
- Endpoint : PUT /api/comic/genres/:id
- Headers :
    - Authorization : token
- Request Body :
```json
{
    "name": "test genre 2"
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "test genre 2"
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Genre is not found"
}
```

#
## Get
- Endpoint : GET /api/comic/genres/:id
- Headers :
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "test genre"
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Genre is not found"
}
```

#
## Get ALL
- Endpoint : GET /api/comic/genres
- Headers :
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "test genre"
        },
        {
            "id": 2,
            "name": "test genre 3"
        },
    ]
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Genre is not found"
}
```

#
## Search
- Endpoint : POST /api/comic/genres
- Headers :
    - Authorization : token
- Query Params :
    - name : 
        - Search By name
        - Using Like
        - Optional
    - page : 
        - Number Of Page
        - Default 1
    - size/limit : 
        - Size Perpage
        - Default 10
- Response Body Success :
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "test genre"
        },
        {
            "id": 2,
            "name": "test genre 3"
        },
        {
            "id": 3,
            "name": "test genre 4"
        },
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Genre is not found"
}
```

#
## Delete
- Endpoint : DELETE /api/comic/genres/:id
- Headers :
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": "OK"
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Genre is not found"
}