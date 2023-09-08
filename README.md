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

Explain your models and integration with the inventory
microservice, here.
