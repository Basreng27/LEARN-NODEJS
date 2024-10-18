# User API
## Register
- Endpoint : POST /api/comic/regist
- Request Body:
```json
{
    "username": "test",
    "password": "test",
    "password_confirm": "test",
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "username": "test"
    }
}
```
- Response Body Error Registered :
```json
{
    "status": false,
    "error": "Username already registered"
}
```
- Response Body Error Not Match Password :
```json
{
    "status": false,
    "error": "Password does not match"
}
```

#
## Login
- Endpoint : POST /api/comik/login
- Request Body : 
```json
{
    "username": "test",
    "password": "test",
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "token": "unique-token"
    }
}
```
- Respone Body Error :
```json
{
    "status": false,
    "error": "Wrong Username or password"
}
```

## Update
- Endpoint : PATCH /api/comic/users/:id
- Headers :
    - Authorization : token
- Request Body :
```json
{
    "username": "test2" // Optional
}
```
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "username": "test2"
    }
}
```
- Response Body Error :
```json
{
    "status": false,
    "error": "Username already exist"
}
```

#
## Get
- Endpoint: GET /api/comic/users/:id
- Headers:
    - Authorization : token
- Response Body Success :
```json
{
    "status": true,
    "data": {
        "username": "test2"
    }
}
```
- Respone Body Error :
```json
{
    "status": false,
    "error": "Unauthorized"
}
```

#
## Logout
- Endpoint : DELETE /api/comic/logout
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
    "error": "Unauthorized"
}
```