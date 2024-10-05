# User API
## Register User API
- Endpoint : POST /api/users
- Request Body : 
```json
{
    "username": "wandi",
    "password": "wandi",
    "name": "wandi",
}
```
- Response Body Success :
```json
{
    "data": {
        "username": "wandi",
        "name": "wandi",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Username already registed"
}
```

## Login User API
- Endpoint : POST /api/users/login
- Request Body : 
```json
{
    "username": "wandi",
    "password": "wandi",
}
```
- Response Body Success :
```json
{
    "data": {
        "token": "unique-token"
    }
}
```
- Response Body Error :
```json
{
    "errors": "Username or Password wrong"
}
```

## Update User API
<!-- PATCH tidak harus mengirimkan semua data sedangkan Update harus mengirimkan semua data -->
- Endpoint : PATCH /api/users/:id
- Headers : 
    - Authorization : token
- Request Body : 
```json
{
    "name": "wandi", // optional
    "password": "wandi", // optional
}
```
- Response Body Success :
```json
{
    "data": {
        "username": "wandi",
        "name": "wandi",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Name length max 100"
}
```

## Get User API
- Endpoint : GET /api/users/:id
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
    "data": {
        "username": "wandi",
        "name": "wandi",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Unauthorized"
}
```

## Logout User API
- Endpoint : DELETE /api/users/logout
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
    "errors": "Unauthorized"
}
```