# CarCar

Team:

* Jerry Kuo - Sales
* Alvin Mach - Service

## Design

7. Access the application at http://localhost:3000/
#### Relevant URLs:

| Feature          | URL          |
|------------------|--------------|

###### Manufacturers
|List Manufacturers   | http://localhost:3000/manufacturers/        |
|Create Manufacturers | http://localhost:3000/manufacturers/create/ |

###### Models
|List Models   | http://localhost:3000/models         |
|Create Models | http://localhost:3000/models/create/ |

###### Automobiles
|List Automobiles   | http://localhost:3000/automobiles/        |
|Create Automobiles | http://localhost:3000/automobiles/create/ |

###### Salespeople
|List Salesperson   | http://localhost:3000/salespeople/        |
|Create Salesperson | http://localhost:3000/salespeople/create/ |

###### Customers
|List Customer   | http://localhost:3000/customers/        |
|Create Cusotmer | http://localhost:3000/customers/create/ |

###### Sales
|List Sales   | http://localhost:3000/sales/        |
|Create Sales | http://localhost:3000/sales/create/ |

###### Salesperson History
|List Salesperson History | http://localhost:3000/sales/history/ |

###### Technician
|List Technician   | http://localhost:3000/technicians/     |
|Create Technician | http://localhost:3000/technicians/new/ |

###### Service Appointments
|List Appointments   | http://localhost:3000/appointments/        |
|Create Appointments | http://localhost:3000/appointments/create/ |

###### Service History
|List Service History | http://localhost:3000/appointments/history/ |


## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

For the sales microservice, in the back-end I added the app 'sales_rest.apps.SalesRestConfig' and 'corsheaders' and 'corsheaders.middleware.CorsMiddleware' to the settings.py of 'sales_project' to ensure the app runs and to make sure no CORS errors were encountered. Next I created models for Salesperson (which has properties: first name, last name, employee ID), Customer (properties: first name, last name, address, phone number), AutomobileVO (properties: vin, sold), and Sale (properties: price, automobile, salesperson, customer) with Sale needing foreign keys to acces Salesperson, Customer, and AutomobileVO. In Docker, under containers, I navigated to the terminal of sales-api-1 and ran my migrations. Since automobiles are located inside of the inventory api, I needed an automobile value object to grab data from there, thus the AutomobileVO was created. To grab that data however, I needed to implement a poller to get said data. Next the views were created to get, post, and delete salespeople, customers, and sales. To test if these are working, Insomnia was used using the following RESTful API calls:

#### RESTful API calls:

| Feature          | Method          | URL          |
|:-----------------|:----------------|:-------------|


###### Salespeople
|List Salesperson   | GET    | http://localhost:8090/api/salespeople/ |
|Create Salesperson | POST   | http://localhost:8090/api/salespeople/ |
|Delete Salesperson | DELETE | http://localhost:8090/api/salespeople/ |


###### Customers
|List Customer   | GET    | http://localhost:8090/api/customers/ |
|Create Cusotmer | POST   | http://localhost:8090/api/customers/ |
|Delete Customer | DELETE | http://localhost:8090/api/customers/ |

###### Sales
|List Sales  | GET    | http://localhost:8090/api/sales/ |
|Create Sale | POST   | http://localhost:8090/api/sales/ |
|Delete Sale | DELETE | http://localhost:8090/api/sales/ |
