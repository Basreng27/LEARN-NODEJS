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
## Search
- Endpoint : POST /api/comic/bookmarks
- Headers :
    - Authorization : token
- Query Params :
    - name (comic) : 
        - Search By name (comic)
        - Using Like
        - Optional
    - type (comic) : 
        - Search By type (comic)
        - Using Where
        - Optional
    - name (genre) : 
        - Search By name (genre)
        - Using Like
        - Optional
    - last_chapter : 
        - Search By last_chapter
        - Using Where for Less Than or Greater Than
        - Optional
    - updated_at : 
        - Search By updated_at
        - Using Beetwen
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