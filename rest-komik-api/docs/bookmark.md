# Bookmark API
## Create
- Endpoint : POST /api/comic/bookmarks
- Headers : 
    - Authorization : token
- Request Body :
```json
{
    "user_id": 1,
    "comic_id": 1,
    "last_chapter": 100,
    "updated_at": "2024-18-10",
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "last_chapter": 100,
        "updated_at": "2024-18-10",
        "user_id": {
            "username": "test1"
        },
        "comic_id": {
            "name": "test comic",
            "image": "image test",
            "type": "test",
            "genre_id": {
                "name": "test genre"
            }
        }
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Comic Is Requred"
}
```

#
## Update
- Endpoint : PUT /api/comic/bookmarks/:id
- Headers : 
    - Authorization : token
- Request Body :
```json
{
    "user_id": 1,
    "comic_id": 1,
    "last_chapter": 110,
    "updated_at": "2024-18-10",
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "last_chapter": 110,
        "updated_at": "2024-18-10",
        "user_id": {
            "username": "test1"
        },
        "comic_id": {
            "name": "test comic",
            "image": "image test",
            "type": "test",
            "genre_id": {
                "name": "test genre"
            }
        }
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Comic Is Not Found"
}
```

#
## Get
- Endpoint : GET /api/comic/bookmarks/:id
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "id": 1,
        "last_chapter": 110,
        "updated_at": "2024-18-10",
        "user_id": {
            "username": "test1"
        },
        "comic_id": {
            "name": "test comic",
            "image": "image test",
            "type": "test",
            "genre_id": {
                "name": "test genre"
            }
        }
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Comic Is Not Found"
}
```

#
## Get All
- Endpoint : GET /api/comic/bookmarks
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "last_chapter": 110,
            "updated_at": "2024-18-10",
            "user_id": {
                "username": "test1"
            },
            "comic_id": {
                "name": "test comic",
                "image": "image test",
                "type": "test",
                "genre_id": {
                    "name": "test genre"
                }
            }
        },
        {
            "id": 2,
            "last_chapter": 55,
            "updated_at": "2024-18-10",
            "user_id": {
                "username": "test1"
            },
            "comic_id": {
                "name": "test comic 2",
                "image": "image test",
                "type": "test",
                "genre_id": {
                    "name": "test genre"
                }
            }
        }
    ]
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Comic Is Not Found"
}
```

#
## Delete
- Endpoint : DELETE /api/comic/bookmarks/:id
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
    "error": "Comic Is Not Found"
}
```