# PCF-automation-status-dashboard
This project created to enable two functionality:
 - API Gateway
 - Dashboard UI

### Tech
Project uses a number of open source projects to work properly:

* [react](https://facebook.github.io/react/) - HTML enhanced for web apps!
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework


### Installation

Project requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd pcf-automation-status-dashboard
$ npm install
$ npm start
$ open browser and type http://localhost:3000
```

For production environments PCF ...
Please login to your pcf account.
Update manifest.yaml to change production settings (RAM or storage).

```sh
$ cf login
$ cf push
```
