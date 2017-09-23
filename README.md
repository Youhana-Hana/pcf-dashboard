# PCF-automation-status-dashboard
This project created to enable two functionalities:
 - API Gateway
 - Dashboard UI

### Tech
Project uses a number of open source projects to work properly:
#### API Gateway
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework

#### UI/client side
* [react](https://facebook.github.io/react/) - HTML enhanced for web apps!
* [react flux](https://facebook.github.io/flux/docs/overview.html) - client-side web applications architecture 
* [Dashboard templates](https://github.com/mrholek/CoreUI-React) - React.js version of our Bootstrap 4 admin template

### Installation

Project requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd pcf-automation-status-dashboard
$ npm i && cd client && npm i && cd ..
```

Start the API gateway and browse the dashboard
```sh
$ npm start
$ open http://localhost:3000/
```

build client src
```sh
$ npm run client build
```

develop & update client src
```sh
$ npm run dev
```

run client tests
```sh
$ npm run client test
```

For production environments PCF ...
Please login to your pcf account.
Update manifest.yaml to change production settings (RAM or storage).

```sh
$ npm run client clean
$ npm run client build
$ cf login
$ cf push
```

### CI/CD

Build and deploy to PCF with Concourse

Preparing to set the pipeline..
* Create a local yaml file outside of this repo for config and creds (name it something like `settings.yml`)
  * Use the fields as defined in the template [ci/params.yml](ci/params.yml). Do NOT populate `params.yml` and commit to git!
* Create some env vars
  * `CONCOURSE_TARGET=?` # alias name for target concourse for local fly usage>>
  * `PIPELINE_NAME=` # preferred name which will appear in Concourse GUI and serves as the reference for fly e.g. pcf-automation-dashboard-status
  * `SETTINGS_YAML_FILE=?` # local file containing config and creds
* Clone and `cd` to this repo
* `fly -t $CONCOURSE_TARGET login`
* Finally, set the pipeline with `fly -t $CONCOURSE_TARGET sp -p $PIPELINE_NAME -c ci/pipeline.yml -l $SETTINGS_YAML_FILE`
