# Comic API
## Create
- Endpoint : POST /api/comic/comics
- Headers : 
    - Authorization : token
- Request Body :
```json
{
    "name": "test comic",
    "image": "image test",  // Optional
    "type": "test",
    "genre_id": 1
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "test comic",
        "image": "image test",
        "type": "test",
        "genre_id": {
            "name": "test genre"
        }
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Type must match : Manga, Manhua, Manhwa"
}
```

#
## Update
- Endpoint : PATCH /api/comic/comics/:id
- Headers : 
    - Authorization : token
- Request Body :
```json
{
    "name": "test comic 2",
    "image": "image test 2",  // Optional
    "type": "test 2",
    "genre_id": 1
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "test comic",
        "image": "image test",
        "type": "test",
        "genre_id": {
            "name": "test genre"
        }
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Comic is not found"
}
```

#
## Get
- Endpoint : GET /api/comic/comics/:id
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "test comic",
        "image": "image test",
        "type": "test",
        "genre_id": {
            "name": "test genre"
        }
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Comic is not found"
}
```

#
## Search
- Endpoint : POST /api/comic/comics
- Headers :
    - Authorization : token
- Query Params :
    - name : 
        - Search By name
        - Using Like
        - Optional
    - type : 
        - Search By type
        - Using Where
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
            "name": "test comic",
            "image": "image test",
            "type": "test",
            "genre_id": {
                "id": 1,
                "name": "test genre"
            }
        },
        {
            "name": "test comic 2",
            "image": "image test 2",
            "type": "test 2",
            "genre_id": {
                "id": 2,
                "name": "test genre 2"
            }
        }
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
    "error": "Comic is not found"
}
```

#
## Delete
- Endpoint : DELETE /api/comic/comics/:id
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
    "error": "Comic is not found"
}
```