# Demo of testing Swagger Web API with Gauge JS

This demo tests a dummy NodeJS-based Web API written with Swagger with [Gauge][_gauge], using the [JavaScript][_gaugejs] language runner.

## Setting up

* Install [Gauge][_gauge].
* Install [NodeJS][_node].
* Install Swagger: `$ sudo npm install -g swagger`
* Install [Gauge JS][_gaugejs] runner: `$ gauge --install js`
* In the project root directory, run: `$ npm install`

## Running Gauge tests

* `$ npm start`: Start the Swagger API server.
* `$ npm test`: While the server is running, run Gauge tests (in another terminal).

## Project layout

- API Server: [`./server/`](server)
- Gauge specifications: [`./specs/`](specs)
- Test implementations: [`./tests/`](tests)

[_gauge]: http://getgauge.io
[_gaugejs]: https://github.com/getgauge-contrib/gauge-js
[_node]: https://nodejs.org
