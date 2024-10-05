# Contact API
## Create Contact API
- Endpoint : POST /api/contacts
- Headers : 
    - Authorization : token
- Request Body : 
```json
{
    "first_name": "wandi",
    "last_name": "wandi",
    "email": "wandi",
    "phone": "123123123",
}
```
- Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "wandi",
        "last_name": "wandi",
        "email": "wandi",
        "phone": "123123123",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Email is not valid format"
}
```

## Update Contact API
<!-- PATCH tidak harus mengirimkan semua data sedangkan PUT harus mengirimkan semua data -->
- Endpoint : PUT /api/contacts/:id
- Headers : 
    - Authorization : token
- Request Body : 
```json
{
    "first_name": "wandi",
    "last_name": "wandi",
    "email": "wandi",
    "phone": "123123123",
}
```
- Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "wandi",
        "last_name": "wandi",
        "email": "wandi",
        "phone": "123123123",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Email is not valid format"
}
```

## Get Contact API
- Endpoint : GET /api/contacts/:id
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
   "data": {
        "id": 1,
        "first_name": "wandi",
        "last_name": "wandi",
        "email": "wandi",
        "phone": "123123123",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Contact Is Not Found"
}
```

## Search Contact API
- Endpoint : POST /api/contacts
- Headers : 
    - Authorization : token
- Query Params :
    - name : Search by first_name or last_name, using like, optional
    - email : Search by email, using like, optional
    - phone : Search by phone, using like, optional
    - page : number of page, default 1
    - size : size per page, default 10
- Response Body Success :
```json
{
    "data": [
        {
            "id": 2,
            "first_name": "wandi",
            "last_name": "wandi",
            "email": "wandi",
            "phone": "123123123",
        },
        {
            "id": 1,
            "first_name": "wandi",
            "last_name": "wandi",
            "email": "wandi",
            "phone": "123123123",
        }
    ],
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```
- Response Body Error :
```json
{
    "errors": "Contact Not Found"
}
```

## Delete/Remove Contact API
- Endpoint : DELETE /api/contacts/:id
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
    "data": "OK"
}
```
- Response Body Error :
```json
{
    "errors": "Contact Is Not Found"
}
```