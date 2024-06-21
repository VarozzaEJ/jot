import { Note } from './models/Notes.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Notes.js').Note[]} */
  examples = []
  notes = [
    new Note({
      name: 'JS Hacks',
      color: 'danger',
      body: 'Javascript is pretty cool and is fun to learn',
    }),
    new Note({
      name: 'CSS Tips',
      color: 'primary',
      body: 'Cascading Style Sheets uses specificity to know what property should have more power than another property',
    }),
    new Note({
      name: 'HTML Debaccles',
      color: 'info',
      body: 'HTML is super awesome and pretty easy to get the hang of because you can see changes in real time. There is not much thinking that goes into it.',
    }),
  ]
  /** @type {Note} */
  activeNote = null
}

export const AppState = createObservableProxy(new ObservableAppState())
