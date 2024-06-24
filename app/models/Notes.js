import { generateId } from "../utils/GenerateId.js";

export class Note {
  constructor(data) {
    this.id = generateId();
    this.name = data.name;
    this.color = data.color;
    this.body = data.body == undefined ? (this.body = "") : data.body;
    this.count = 1;
    this.dateListed =
      data.dateListed == undefined ? new Date() : new Date(data.dateListed);
    this.lastUpdatedAt = data.lastUpdatedAt
      ? new Date(data.lastUpdatedAt)
      : new Date();
  }

  get shortDate() {
    return this.dateListed.toLocaleDateString();
  }

  get LongDate() {
    return this.dateListed.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  get LongOpenedOnDate() {
    return this.lastUpdatedAt.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "2-digit",
    });
  }

  get ListTemplate() {
    return `
        
        <div class=" text-light border-bottom border-dark selectable py-1 ms-3" onclick="app.NotesController.setActiveNote('${this.id}')">
            <h4 class="ms-2 ">${this.name}<i class="mdi mdi-circle ms-3 text-${this.color}"></i></h4>
        </div>
        `;
  }

  get totalNotesTemplate() {
    return `
            <p>${this.count}</p>
        `;
  }

  get activeNoteTemplate() {
    return /*html*/ `
        <div class=" d-md-flex mx-4">
          <div class="col-md-4 col-12 mt-3">
          <div class="border border-dark rounded shadow bg-dark bg-gradient">
          <div class="d-flex align-items-center justify-content-center mb-2">
            <h1 class="text-${this.color} ms-2">${this.name}</h1>
          </div class="shadow border border-dark">
          <h3 class="mb-3 mx-3 text-light fw-bold"><span class="d-flex text-${this.color}">Created On:</span> ${this.LongDate} </h3>
          <h3 class="mb-3 mx-3 text-light fw-bold"><span class="d-flex text-${this.color}">Last Updated On:</span> ${this.LongOpenedOnDate} </h3>
          </div>
          <div class="row mt-5">
            <div class="col-6 text-start mt-5">
              <button class="btn btn-danger rounded-pill fs-5 mt-5" onclick="app.NotesController.destroyNote('${this.id}')"><i class="mdi mdi-trash-can"></i></button>
            </div>
          </div>

        </div>
        <div class="col-md-8 col-12 ms-5 small-screen-margin d-flex bg-${this.color} justify-content-center flex-column mt-3 text-center">
        <form class="activeNoteBody" onsubmit="app.NotesController.saveActiveNote()">
          <textarea name="activeNoteBody" id="activeNoteBody"
            class="activeNoteTextArea mt-5">${this.body}</textarea>
          <div class="row">
                    <div class="col-12 d-flex justify-content-end mt-3">
                    <button type="submit" class="btn btn-dark rounded-pill fs-5 me-3 mb-3"><i class="mdi mdi-content-save"></i></button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        `;
  }
}
