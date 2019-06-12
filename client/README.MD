# Introduction to the application

The application was created using [Vue](https://vuejs.org)&[Vuex](https://vuex.vuejs.org) framework. Responsive layout was designed with [Tailwind.css](https://tailwindcss.com). \
Application gets needed data in response from REST API provided by [JSON-server](https://github.com/typicode/json-server).

### Application's capabilities

* products are paginated in manner set by json-server 
* the cart persists page refreshes

_User can_:
* filter out products by name, id, description and brand
* add desired number of products to the cart
* remove products from the cart
* display single product's details

### Usage guide

Make sure the json-server is started, then in command line run following commands:
```
cd client 
npm install
npm run dev
```
