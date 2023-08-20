//main module
import gulp from "gulp";
//import of paths
import { path } from "./gulp/config/path.js";

//pass a value to the global variable
global.app = {
  path: path,
  gulp: gulp,
}

//import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";

//files changes observer
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
}

const mainTasks = gulp.parallel(copy, html);

//development of task execution scripts
const dev = gulp.series(reset, mainTasks, watcher);

//default script execution
gulp.task('default', dev);
