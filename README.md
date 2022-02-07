
# Food Delivery Application

This application form a bridge between restaurants and consumers .

### Problem Statement

- Users must be able to sign up, view the restaurants nearby once the restaurant is selected,the corresponding menu should be rendered and the user should be able to order the food items from selected restaurants.
- Restaurants should accept the order and the orders should be shown as a listing page. 
- The cart must be unique across the full application.
- There is no requirement of maintaining a db the restaurant List and food items can be maintained in Json format and for the UI any JS framework like angular, react, etc can be used.

### Solution

- Developed a 2 Tier Web Application which forms a bridge between restaurants and consumers using React.js for Frontend and Flask for Backend.
- Maintained data in JSON format at the Server Side. 
- Created Authentication Functionality with all the necessary Validations.
- Maintained data for Restaurants, Users, Orders, Menu.
- Developed a Orders Listing Page which is Unique for every User in Frontend.
- Applied necessary Validations on both the ends.
- Provided the option to remove the Menu Dishes(for the Restaurants) and Cart items(for the consumers).

 


## API Reference

#### Registration

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Name of the Owner/Consumer |
| `email` | `string` | Email of the Owner/Consumer |
| `password` | `string` | password of the Owner/Consumer |
| `is_restro` | `string` | Value to Check if user is Owner/Consumer |

#### SignIn

```http
  POST /signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | Email of the Owner/Consumer |
| `password` | `string` | password of the Owner/Consumer |
| `is_restro` | `string` | Value to Check if user is Owner/Consumer |


#### Get Restaurants

```http
  GET /restaurants
```

 Description                       |
:-------------------------------- |
Fetching All Restaurants |

#### Adding Items to Menu

```http
  POST /additems
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Name of the Owner |
| `cost` | `string` | Cost of the Item  |
| `restoId` | `string` | Id of Restaurant|

#### Getting Items by Id

```http
  GET /getitems?{restoId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `restoId` | `string` | Id of Restaurant|


#### Order Items

```http
  GET /orderitems
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | Id of Consumer|
| `Items` | `string` | Array of Items Purchased|
| `totalCost` | `int` | Total Cost of Items|
| `createdAt` | `string` | Time of Purchase|

#### Getting Orders by Id

```http
  GET /getorders?{userId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | Id of Consumer|

#### Deleting Items by Id

```http
  Patch /deleteitem
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `restoId` | `string` | Id of Restaurants|
| `ItemId` | `string` | Id of Item|

## Run Locally

Clone the project

```bash
  git clone https://github.com/lavishgupta029/Food-Delivery-App.git
```
#### for Frontend Setup

Go to the project directory

```bash
  cd Client
```

Install dependencies for Frontend

```bash
  npm install
```

Start the server

```bash
  npm start
```
#### for Backend Setup
Go to the project directory

```bash
  Activate your Virtual Enviroment
```

Install dependencies for Backend

```bash
  pip install -r requirements.txt
```

Start the Flask server

```bash
  python main.py
```

## Authors

- [@lavishgupta029](https://github.com/lavishgupta029)

