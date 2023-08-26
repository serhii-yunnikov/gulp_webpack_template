import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`,{})
    //searching files .otf fonts
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      }))
    )
    //converting in .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    //load into root folder
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  //searching for the files .ttf fonts
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`,{})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      }))
    )
    // converting into .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    // upload into result folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // searching for the files .ttf fonts
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // conveting into .woff2
    .pipe(ttf2woff2())
    //upload into result folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontStyle = () => {
  // file of setting fonts styles
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // checking for existence of fonts files
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //checking for existence of file of styles for the fonts setting
      if (!fs.existsSync(fontsFile)) {
        // create file if it is absent
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;

        for (let i = 0; i < fontsFiles.length; i++) {
          // setting of fonts in the file of styles
          let fontFileName = fontsFiles[i].split('.')[0];

          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }

            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),\n\t     url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // run message if the file exists
        console.log('file scss/fonts.scss already exists. Delete file scss/fonts.scss to update it');
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
