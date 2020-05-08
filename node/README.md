Detailed instructions for running the Node version of the exercise follow. Note: these are instructions for running a Node clinet as a standalone, without a frontend.

```
git clone https://github.com/wschwab/exercise
cd exercise/node
```
You can either run the code once using:
```
node index.js
```
or start up a dev server using:
```
npm run dev
```
In either case, the server will run on `localhost:7777`. You can navigate and inspect the console in a browser, or just inspect the output in the terminal.

As of this writing (Fri, May 8 2020) the frontend supplied in the `react-app` folder does not run properly. Still, if you'd like to test out the backend with the frontend, use:
```
npm run full
```
This will launch the backend on `localhost:7777` and the frontend (the React app) on `localhost:3000`. The React app should automatically open up a page in your default browser.
