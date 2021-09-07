# Containerising a Node application with MySQL and MongoDB as Backend having a Persistent Storage #

**1. Added a Dockerfile as Follows**


```
FROM node:dubnium
ENV NODE_OPTIONS --max-old-space-size=2048
WORKDIR /app

COPY ./package* ./

RUN ls -al

RUN npm install && \
    npm cache clean --force

COPY . .

EXPOSE 51005

CMD ["node", "index.js"]```




>-FROM lets us specify which base image from Docker Hub we want to build from. In our case, we are using the latest version of the official node image.

>-RUN lets us execute a command, which in our case is to create a new directory.

>-WORKDIR sets this newly created directory as the working directory for any COPY, RUN and CMD instructions that follow in the Dockerfile.

>-COPY is pretty straightforward and lets us copy files or a whole directory from a source to a destination. We are going to COPY the package.json file over to our working directory.

>-RUN lets us execute the npm install command which will download all the dependencies defined in package.json.

>-COPY lets us copy our entire local directory into our working directory to bundle our application source code.

>-EXPOSE exposes a port which the container will listen on.

>-CMD sets the default command to execute our container


**2. Then to add the MongoDB and the MySQL as a persistent Storage I ceated a docker-compose file that will pick up our previously built Dockerfile to spin a Node Application Container.
Along with the 2 other containers of MySQL as well as MongoDB**

'''
version: "3"
services:
  web:
    container_name: backend_demo
    build: .
    restart: always
    ports:
      - "51005:51005"
    links:
      - mongo
      - mysql
  mongo:
    container_name: mongo
    image: mongo
    volumes:
      - ./data:/data/db
    restart: on-failure    
    ports:
      - "27017:27017"
  mysql:
    image: mysql:5.7.28
    volumes:
      - ./data:/data/db
    environment:
      MYSQL_ROOT_PASSWORD: 'root'
      MYSQL_DATABASE: 'backend_demo'
    restart: on-failure
    ports: 
      - "3306:3306"
'''      
      

>-Defining a service for App,

>-Adding a container name for the app service as giving the container a memorable name makes it easier to work with and we can avoid randomly generated container names (Although in this case, container_name is also app, this is merely personal preference, the name of the service and container do not have to be the same.)

>-Instructing Docker to restart the container automatically if it fails,

>-Building the app image using the Dockerfile in the current directory and

>-Mapping the host port to the container port.

>-We then add another service called mongo but this time instead of building our own mongo image, we simply pull down the standardmongo image from the Docker Hub registry.

>-For persistent storage, we mount the host directory /data (this is where the dummy data I added when I was running the app locally lives) to the container directory /data/db, which was identified as a potential mount point in the mongo Dockerfile we saw earlier.

>-Mounting volumes gives us persistent storage so when starting a new container, Docker Compose will use the volume of any previous containers and copy it to the new container, ensuring that no data is lost.

>-Finally, we link the app container to the mongo container so that the mongo service is reachable from the app service.


**3. Finally do a docker-compose up**
> - This will start the 3 Containers in the same network that should be able to communicate with each other and store a persistent data
> A. Node Application
> B. MySQL
> C. MongoDB
 
 **4. These Containers can then be Downed using**
 `docker-compose down`
