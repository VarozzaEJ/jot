import { generateId } from "../utils/GenerateId.js"



export class Note {
    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.color = data.color
        this.body = data.body
        this.count = 1
        this.dateListed = data.dateListed == undefined ? new Date() : new Date(data.dateListed)
        this.lastUpdatedAt = data.lastUpdatedAt ? new Date(data.lastUpdatedAt) : new Date()
    }

    get shortDate() {
        return this.dateListed.toLocaleDateString()
    }

    get LongDate() {
        return this.dateListed.toLocaleString('en-US', { month: 'long', day: 'numeric', weekday: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
    }

    get LongOpenedOnDate() {
        return this.lastUpdatedAt.toLocaleString('en-US', { month: 'long', day: 'numeric', weekday: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: '2-digit' })

    }

    get ListTemplate() {
        return `
        
        <div class=" border-bottom border-dark selectable ms-3" onclick="app.NotesController.setActiveNote('${this.id}')">
            <h4 class="">${this.name}</h4>
        </div>
        `
    }

    get totalNotesTemplate() {
        return `
            <p>${this.count}</p>
        `
    }

    get activeNoteTemplate() {
        return `
        <div class=" d-flex">
          <div class="col-4 mt-3">
          <div class="d-flex align-items-center mb-2">
            <h1 class="text-${this.color}">${this.name}</h1>
          </div>
          <h3 class="mb-3 fw-bold">Created On: ${this.LongDate} </h3>
          <h3 class="mb-3 fw-bold">Last Updated On: ${this.LongOpenedOnDate} </h3>
          <div class="row mt-5">
            <div class="col-6 text-start mt-5">
              <button class="btn btn-danger rounded-pill fs-5 mt-5" onclick="app.NotesController.destroyNote('${this.id}')"><i class="mdi mdi-trash-can"></i></button>
            </div>
          </div>

        </div>
        <div class="col-8 d-flex bg-${this.color} justify-content-center flex-column mt-3 text-center">
        <form class="activeNoteBody" onsubmit="app.NotesController.saveActiveNote()">
          <textarea name="activeNoteBody" id="activeNoteBody"
            class="activeNoteTextArea">${this.body}</textarea>
          <div class="row">
            <div class="col-12 d-flex justify-content-end mt-3">
              <button type="submit" class="btn btn-info rounded-pill fs-5"><i class="mdi mdi-content-save"></i></button>
            </div>
          </div>
          </form>
        </div>
        </div>
        `
    }

}