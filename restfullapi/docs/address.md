# Address API
## Create Address API
- Endpoint : POST /api/contacts/:contactId/addresses
- Headers : 
    - Authorization : token
- Request Body : 
```json
{
    "street": "jln",
    "city": "city",
    "province": "province",
    "country": "country",
    "postal_code": "postal code",
}
```
- Response Body Success :
```json
{
    "data": {
        "id": 1,
        "street": "jln",
        "city": "city",
        "province": "province",
        "country": "country",
        "postal_code": "postal code",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Country is required"
}
```

## Update Address API
<!-- PATCH tidak harus mengirimkan semua data sedangkan PUT harus mengirimkan semua data -->
- Endpoint : PUT /api/contact/:contactId/addresses/:addressId
- Headers : 
    - Authorization : token
- Request Body : 
```json
{
    "street": "jln",
    "city": "city",
    "province": "province",
    "country": "country",
    "postal_code": "postal code",
}
```
- Response Body Success :
```json
{
    "data": {
        "id": 1,
        "street": "jln",
        "city": "city",
        "province": "province",
        "country": "country",
        "postal_code": "postal code",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Country is required"
}
```

## Get Address API
- Endpoint : GET /api/contact/:contactId/addresses/:addressId
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
   "data": {
        "id": 1,
        "street": "jln",
        "city": "city",
        "province": "province",
        "country": "country",
        "postal_code": "postal code",
    }
}
```
- Response Body Error :
```json
{
    "errors": "Address Is Not Found"
}
```

## List Addresses API
- Endpoint : GET /api/contact/:contactId/addresses
- Headers : 
    - Authorization : token
- Response Body Success :
```json
{
    "data": [
        {
            "id": 2,
            "street": "jln",
            "city": "city",
            "province": "province",
            "country": "country",
            "postal_code": "postal code",
        },
        {
            "id": 1,
            "street": "jln",
            "city": "city",
            "province": "province",
            "country": "country",
            "postal_code": "postal code",
        }
    ],
}
```
- Response Body Error :
```json
{
    "errors": "Contact Not Found"
}
```

## Delete/Remove Address API
- Endpoint : DELETE /api/contact/:contactId/addresses/:addressId
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
    "errors": "Address Is Not Found"
}
```