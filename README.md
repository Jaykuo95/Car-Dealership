# CarCar

Team:

* Jerry Kuo - Sales
* Alvin Mach - Service

## How to Run The Project

1. Both members will clone the same repository to their local computers accessing through this link
    https://gitlab.com/machalvin02/project-beta.git
2. Use the command in your terminal
    ```
    git clone https://gitlab.com/machalvin02/project-beta.git
    ```
3. Change your working directory to newly clone directory
    ```
    cd project-beta
    ```
4. For the next set up you will need to have docker installed onto your computer
    https://docs.docker.com/engine/install/
5. Select the right platform for your setup.
6. Once you have docker configured, both partner will run the following command
    ```
    docker volume create beta-data
    docker-compose build
    docker-compose up
    ```
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


## Design

![Alt text](image.png)

## Service microservice
I created 3 models which are Technician, AutomobileVO, and Appointment.
The Technician model hold information of each technicians, including their first name, last name, and their own unique employee ID. The employee ID is important because we use it to identify a specific employee.
The AutomobileVO model represents all of the vehicles in our system, which can be identified by their unique vehicle identification number which is known as vin. It will also let us know whether a vehicle has been sold or not.
The Appointment model is used to schedule appointments. Appointment model stores the date and time of the appointment, the reason for service, its current status, their vin, reason for service, and whether or not they are VIP customers. This connects to the Technician model using a foreign key. With the Foreign key I am amble to connect each appointment to any technician I pick.
For the functionality side of the inventory microservice, the microservice keeps track of technicians, service appointments, and vehicles. Overall, it makes the inventory system very organized.

## Service poller

For my poller.py file I wanted to retrieve automobile data. I created a function called get_auto that sends a gret request to a specific URL that has the automobile information. For each automobile, I use update_or_create to update an entry that exist already or create a new one based on the vin. The polling will keeping looping to retrieve any data process. I added a 60 second pause between the iteration.

## Sales microservice

For the sales microservice, in the back-end I added the app 'sales_rest.apps.SalesRestConfig' and 'corsheaders' and 'corsheaders.middleware.CorsMiddleware' to the settings.py of 'sales_project' to ensure the app runs and to make sure no CORS errors were encountered. Next I created models for Salesperson (which has properties: first name, last name, employee ID), Customer (properties: first name, last name, address, phone number), AutomobileVO (properties: vin, sold), and Sale (properties: price, automobile, salesperson, customer) with Sale needing foreign keys to acces Salesperson, Customer, and AutomobileVO. In Docker, under containers, I navigated to the terminal of sales-api-1 and ran my migrations. Since automobiles are located inside of the inventory api, I needed an automobile value object to grab data from there, thus the AutomobileVO was created. To grab that data however, I needed to implement a poller to get said data. Next the views were created to get, post, and delete salespeople, customers, and sales. To test if these are working, Insomnia was used using the following RESTful API calls:

#### RESTful API calls:

| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|


###### Salespeople
| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|List Salesperson   | GET    | http://localhost:8090/api/salespeople/ |

JSON Response:
```
{
    "salesperson": [
		{
			"id": 1,
			"first_name": "Salesperson",
			"last_name": "One",
			"employee_id": "1st"
		}
    ]
}
```

| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|Create Salesperson | POST   | http://localhost:8090/api/salespeople/ |

JSON Body:
```
{
	"first_name": "Salesperson",
	"last_name": "Two",
	"employee_id": "Salesperson2"
}
```
JSON Response:
```
{
	"id": 2,
	"first_name": "Salesperson",
	"last_name": "Two",
	"employee_id": "2nd"
}
```

| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|Delete Salesperson | DELETE | http://localhost:8090/api/salespeople/ |

JSON Response:
```
{
	"deleted": true
}
```

###### Customers
| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|List Customer   | GET    | http://localhost:8090/api/customers/ |

JSON Response:
```
{
	"customer": [
		{
			"id": 1,
			"first_name": "Customer",
			"last_name": "One",
			"address": "1 One Lane, First City, CA 11111",
			"phone_number": 1111111111
		}
	]
}

```

| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|Create Cusotmer | POST   | http://localhost:8090/api/customers/ |

JSON Body:
```
{
	"first_name": "Second",
	"last_name": "Two",
	"address": "2 Two Lane, Second City, CA 22222",
	"phone_number": "2222222222"
}
```

JSON Response:
```
{
	"id": 2,
	"first_name": "Second",
	"last_name": "Two",
	"address": "2 Two Lane, Second City, CA 22222",
	"phone_number": "2222222222"
}
```

| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|Delete Customer | DELETE | http://localhost:8090/api/customers/ |

JSON Response:
```
{
	"deleted": true
}
```
###### Sales
| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|List Sales  | GET    | http://localhost:8090/api/sales/ |

JSON Response:
```
{
	"sales": [
		{
			"id": 1,
			"price": "$24900.00",
			"salesperson": {
				"id": 1,
				"first_name": "Salesperson",
				"last_name": "One",
				"employee_id": "1st"
			},
			"customer": {
				"id": 1,
				"first_name": "Buyer",
				"last_name": "One",
				"address": "1 One Lane, First City, CA 11111",
				"phone_number": 1111111111
			},
			"automobile": {
				"vin": "HF4NA1261RT055073",
				"sold": true
			}
		}
	]
}
```

| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|Create Sale | POST   | http://localhost:8090/api/sales/ |

JSON Body:
```
{
	"price": "$27000.00",
	"automobile": "1C3CC5FB2AN120174",
	"salesperson": 2,
	"customer": 2
}
```

JSON Response:
```
{
	"sales": {
		"id": 2,
		"price": "$27000.00",
		"salesperson": {
			"id": 1,
			"first_name": "Salesperson",
			"last_name": "One",
			"employee_id": "1st"
		},
		"customer": {
			"id": 2,
			"first_name": "Second",
			"last_name": "Two",
			"address": "2 Two Lane, Second City, CA 22222",
			"phone_number": 2222222222
		},
		"automobile": {
			"vin": "1C3CC5FB2AN120174",
			"sold": false
		}
	}
}
```
| Feature          | Method          | URL          |
|:----------------:|:---------------:|:------------:|
|Delete Sale | DELETE | http://localhost:8090/api/sales/ |

JSON Response:
```
{
	"deleted": true
}
```