<div>
 <img src="https://github.com/nikhil026/covid19-tracker/blob/master/src/corona.png?raw=true" />
 <h1 style="display: inline">covid19-tracker</h1>
</div>

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

# For running on docker 

create an image locally using
- `docker build . --tag tagname`
run image using
- `docker run --publish 8080:8080 --detach --name anyname tagname`

in rare cases if http://localhost:8080 responds with build/index.html not found then bash into the running container using
- `docker exec -it anyname /bin/sh`
and run 
- `npm run build`
to manually build react app and it will work fine.

### `Bonus Endpoint for All Indian States Data` 
http://localhost:3000/api/covid19/india/

