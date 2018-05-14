const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('read', 'Read a Given Note', {
    title: titleOptions
  })
  .command('remove', 'Remove a Given Note', {
    title: titleOptions
  })
  .command('list', 'List all Notes')
  .help()
  .argv;
let command=argv._[0];
// console.log('Command:', command);
// // console.log('Process', process.argv);
// console.log('yargs', argv);

if (command === 'add'){
  let note = notes.addNote(argv.title, argv.body)
  let message =  note ? `Created Note: ${note.title}` : "Note Already Exists"
  console.log(message);
}else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) =>{
    console.log(`title: ${note.title} body: ${note.body}`);
  })
}else if (command === 'read') {
  let note = notes.getNote(argv.title);
  let message =  note ? `Note Read... title: ${note.title} body: ${note.body}` : "Note Doesn't Exists"
  console.log(message);
}else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title)
  let message = noteRemoved ? "Note Deleted" : "Note Did not Exists"
  console.log(message);
}else {
  console.log('Command not recognized');
}
