import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

export class NotesController {
    constructor() {
        console.log("Controller Loaded");
        AppState.on('notes', this.drawNotesList)
        AppState.on('activeNote', this.drawActiveNote)
        AppState.on('notes', this.drawTotalNoteCount)
        this.drawNotesList()
        this.drawTotalNoteCount()
        notesService.loadNotes()
    }

    drawNotesList() {
        const Notes = AppState.notes
        let listTemplateHTMLString = ''
        Notes.forEach((note) => listTemplateHTMLString += note.ListTemplate)
        setHTML("notesList", listTemplateHTMLString)
    }

    drawTotalNoteCount() {
        const Notes = AppState.notes
        let totalCount = Notes.length
        setHTML("totalNotes", totalCount)
    }

    createNote() {
        event.preventDefault()
        const form = event.target
        const noteData = getFormData(form)
        console.log(noteData);
        document.getElementById("activeNote").classList.add("hidden")
        document.getElementById("completeNotesList").classList.remove("hidden")
        notesService.createNote(noteData)
        // this.drawNotesList()
        // let note = AppState.notes
        // note.find((note) => note.id =)
    }

    setActiveNote(id) {
        // console.log('👉📁', id);
        notesService.setActiveNote(id)
        // this.drawActiveNote()
    }


    drawActiveNote() {
        const activeNotes = AppState.activeNote
        let activeHTML = activeNotes.activeNoteTemplate
        setHTML('activeNote', activeHTML)
        document.getElementById("completeNotesList").classList.add("hidden")
    }

    destroyNote(id) {
        const wantsToDelete = window.confirm('Are you sure you want to delete this Note?')
        if (!wantsToDelete) {
            return
        }
        notesService.destroyNote(id)
        // this.drawNotesList()
        document.getElementById('completeNotesList').classList.remove("hidden")
        document.getElementById("activeNote").classList.add("hidden")
    }

    saveActiveNote() {
        event.preventDefault()
        console.log('💾', event);
        const form = event.target // get the form
        // @ts-ignore
        const textarea = form.activeNoteBody // get the textarea
        const newDetails = textarea.value // get the text content out of the textarea
        console.log(newDetails);
        console.log('These are the updates to the body', newDetails);
        notesService.saveActiveNote(newDetails) // send that new text to the service
    }
}