## Instructions

Follow this steps to get this template working properly.

### Step 1

Configure the .env file, replacing the default paths with the right one in your computer.

### Step 2

Run the ./up.sh file to get the docker compose stack do its job, until the stack is up and running.

note: Apply the right permission to the .sh file for execution.

### Step 3

Check if all the services are running properly.

Website
http://localhost

Exchange
http://localhost/exchange

File Handler
http://localhost/filehandler

MS Sql Server
host: localhost
user: sa
pass: (Check the docker compose file)
port: 1443 (default)

Mongo DB
host: localhost
port: default
user and password: not required

Rabbit MQ Management
host: http://localhost:15672
user: guest
password: guest

### Extra Details

The Website is using the zFrameworkWeb template and the other nodejs projects are using the zFrameworkApi template