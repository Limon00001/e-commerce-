# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

### Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Responses:**

- `201` - User created
- `400` - Invalid input
- `409` - Email already exists

### Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**

- `200` - Success with JWT token
- `401` - Invalid credentials

## Products

### Get All Products

```http
GET /api/products
```

**Query Parameters:**

- `page` (optional) - Page number
- `limit` (optional) - Items per page
- `sort` (optional) - Sort field
- `category` (optional) - Filter by category
- `search` (optional) - Search term

**Responses:**

- `200` - Success
- `500` - Server error

### Get Product Details

```http
GET /api/products/:id
```

**Responses:**

- `200` - Success
- `404` - Product not found

### Create Product (Admin)

```http
POST /api/products
```

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "stock": "number",
  "images": "file[]"
}
```

**Responses:**

- `201` - Product created
- `400` - Invalid input
- `401` - Unauthorized

## Cart

### Get Cart

```http
GET /api/cart
```

**Headers:**

```
Authorization: Bearer {token}
```

**Responses:**

- `200` - Success
- `401` - Unauthorized

### Add to Cart

```http
POST /api/cart
```

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "productId": "string",
  "quantity": "number"
}
```

**Responses:**

- `200` - Success
- `400` - Invalid input
- `404` - Product not found

## Orders

### Create Order

```http
POST /api/orders
```

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentMethod": "string"
}
```

**Responses:**

- `201` - Order created
- `400` - Invalid input
- `401` - Unauthorized

### Get Order History

```http
GET /api/orders
```

**Headers:**

```
Authorization: Bearer {token}
```

**Responses:**

- `200` - Success
- `401` - Unauthorized

## User Profile

### Get Profile

```http
GET /api/users/profile
```

**Headers:**

```
Authorization: Bearer {token}
```

**Responses:**

- `200` - Success
- `401` - Unauthorized

### Update Profile

```http
PUT /api/users/profile
```

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

**Responses:**

- `200` - Success
- `400` - Invalid input
- `401` - Unauthorized

## Reviews

### Add Product Review

```http
POST /api/products/:id/reviews
```

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "rating": "number",
  "comment": "string"
}
```

**Responses:**

- `201` - Review added
- `400` - Invalid input
- `401` - Unauthorized
- `404` - Product not found

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

## Success Responses

All success responses follow this format:

```json
{
  "success": true,
  "data": {} // Response data
}
```
