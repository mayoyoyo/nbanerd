# NBA Nerd

---

NBA stat finding application

Published on https://mayoyoyo.github.io/nbanerd/

---

Local development instructions:

1. `git clone https://github.com/mayoyoyo/nbanerd.git`
2. `cd` to local directory
3. Check package.json to make sure the scripts are as follows:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build",
   "start": "react-scripts start",
   "build": "react-scripts build",
   "test": "react-scripts test",
   "eject": "react-scripts eject"
   ```
4. Delete (if present) `node_modules` folder and any `-lock` files.
5. `npm install`
6. ` npm start`

---

Built on [React](https://reactjs.org/)

Uses [balldontlie API](https://www.balldontlie.io/) and [Axios](https://github.com/axios/axios)
