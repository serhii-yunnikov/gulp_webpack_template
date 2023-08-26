# Template for landing
## using **Gulp** and **Webpack**

### quick start

`npm i` - install packages
use latest Node

### modes:

1. #### development

  `npm run dev`

2. #### production

  `npm run build`

3. #### deploy FTP

  `npm run deploy`

  set **FTP** data in ***gulp/config/ftp.js***:

  `export let configFTP = {
    host: "", // address FTP server
    user: "", // user name
    password: "", // password
    parallel: 5 // number of streams
  }`

  after runnig data should store in the ***test*** folder on the remote server

4. #### ZIP files

  `npm run zip`

  find zip project in the ***src*** folder

5. #### create **svg sprites**

  `npm run svgSprive`

  after running find:
    - sprite in ***dist/img/icons/icons.svg***;
    - settings tutorial in ***dist/img/icons/stack/sprite.stack.html***;

##### ***Production version includes:***

  - converting images into **WebP** format;
  - group media queries;
  - autoprefixer;
  - files minification(app.min.js, style.min.js);
  - tracking files via **gulp-newer**;
  - converting fonts into light version **woff** and **woff2**;
  - **ES6** support;