import { AppState } from "../AppState.js"
import { Note } from "../models/Notes.js"
import { loadState, saveState } from "../utils/Store.js"



class NotesService {

    createNote(noteData) {
        const Notes = AppState.notes
        const newNote = new Note(noteData)
        Notes.push(newNote)
        this.saveNotes()
        console.log("These are the details of the new note", Notes);
    }

    setActiveNote(id) {
        const selectedNote = AppState.notes.find((note) => note.id == id)
        console.log(selectedNote);
        AppState.activeNote = selectedNote
        console.log(AppState);
        this.saveNotes()
        document.getElementById('completeNotesList').classList.add("hidden")
        document.getElementById("activeNote").classList.remove("hidden")

    }

    destroyNote(id) {
        const notes = AppState.notes
        console.log(notes);
        const foundNote = notes.findIndex((note) => note.id == id)
        if (foundNote == -1) {
            console.log("You Messed Up find Index fella");
            return
        }
        console.log("You found the note at the right index", foundNote);
        notes.splice(foundNote, 1)
        console.log(notes);
        this.saveNotes()
    }
    saveNotes() {
        saveState('_notes', AppState.notes)
    }

    saveActiveNote(newDetails) {
        const activeNote = AppState.activeNote
        activeNote.body = newDetails
        activeNote.lastUpdatedAt = new Date()
        AppState.emit('activeNote') // emit will trigger listeners, registered to the same "action". Here we didn't change 'activeCaseFile' directly so the listeners don't trigger, so we have to trigger them manually to draw
        this.saveNotes()
    }

    loadNotes() {
        AppState.notes = loadState('_notes', [Note])
    }

}


export const notesService = new NotesService()