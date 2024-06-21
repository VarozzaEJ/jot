import { ExamplesController } from "./controllers/ExamplesController.js";
import { HomeController } from "./controllers/HomeController.js";
import { NotesController } from "./controllers/NotesController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [HomeController, NotesController, NotesController],
    view: /*html*/`
    
    `
  },
  {
    path: '#/activeNote',
    controllers: [NotesController],
    view: 'app/views/ActiveNoteView.html'
  },
])