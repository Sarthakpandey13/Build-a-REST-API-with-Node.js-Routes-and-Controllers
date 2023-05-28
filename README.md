# Build-a-REST-API-with-Node.js-Routes-and-Controllers
Create a Node.js application with a MongoDB .Database has three collections defines APIs to perform various CRUD operations on these collections

To summarize the code you provided:

The code aims to create a Node.js application with a MongoDB database named "nodeJSDemo." The database has three collections: "users," "products," and "orders." It defines APIs to perform various operations on these collections.

For the "users" collection, the APIs include:

POST /users/createUser - Creates a new user by accepting user information in the request body.
POST /users/updateUser - Updates an existing user by accepting updated user information in the request body.
GET /users/deleteUser/:id - Deletes a user based on their ID.
GET /users/getUser/:id - Retrieves a user's information based on their ID.
For the "products" collection, the APIs include:

POST /products/createProduct - Creates a new product by accepting product information in the request body.
POST /products/updateProduct - Updates an existing product by accepting updated product information in the request body.
GET /products/deleteProduct/:id - Deletes a product based on its ID.
GET /products/getProduct/:id - Retrieves a product's information based on its ID.
For the "orders" collection, the APIs include:

POST /orders/createOrder - Creates a new order by accepting customer and product information in the request body.
POST /orders/updateOrder - Updates an existing order by accepting updated order information in the request body.
GET /order/getOrder/:id - Retrieves an order's information based on its ID.
GET /order/deleteOrder/:id - Deletes an order based on its ID.
These APIs allow users to perform CRUD (Create, Read, Update, Delete) operations on the respective collections.
