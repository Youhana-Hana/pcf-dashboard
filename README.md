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

**checked-in node_modules only work on linux, there are cases where it might not work on Windows or Apple. If not on Linux then delete all node_modules and reinstall as described below**

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

run server tests
```sh
$ npm test
```

run client tests
```sh
$ npm run client test
```

### Deployment to PCF Instructions

Update [manifest.yml](manifest.yml) to required settings (e.g. RAM or storage).

* Clone the repo
* build the client i.e. `npm run client build`
* `cf push` to PCF

NOTE: You can make use of the committed Linux node_modules, in case CI cannot connect to the internet

**Although node_modules is included (only for the purposes of internetless CI/CD), it's ignored through `.cfignore` as the staging is taking care of installing all dependencies**

* Offline

Offline is a bit tricky as best practice is to install node modules through `npm` or `yarn`. However there are situations where the internet is not available.
In our case we created `artifacts` as described in the section below.

* Alternative build approaches to consider when offline
  * Enable npmjs.org to install dependencies
  * local-npm
  * Mirroring yarn or npm registry locally

### Artifacts
All artifacts are stored under the artifacts directory and generated through below command:
```sh
$ npm pack
```

- Artifacts named as `pcf-automation-status-dashboard-0.0.2.tgz`, where `0.0.2` is the version defined in `package.json`
- Artifact modules defined inside `package.json` under 'bundledDependencies' section. It's the responsibility of the developer to manually keep this section up to date.

To use the artifacts, please unpack it, through below command

```sh
$ tar -xf <PACK PATH>
cd package
npm start
```

### CI/CD

Build and deploy to PCF with Concourse

NOTE: to build in Concourse without internet access it was necessary to commit the node_modules for linux

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
