const fs = require('fs');

fetchNotes = () => {
  try{
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(e){
    return [];
  }
};

saveNotes = (notes) =>{
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

addNote = (title, body) => {
  //fetch all previous notes or create empty array
  let notes = fetchNotes();
  //create note item
  let note = {
    title,
    body
  };

  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0){
    //push note to update array
    notes.push(note);
    //resave file with added note
    saveNotes(notes);
    return note;
  }
};

getAll = () => {
  //fetch Notes
  return fetchNotes();

};

getNote = (title) => {
  //fetch Notes
  let notes = fetchNotes();
  //filter notes to remove note
  let filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];


};

removeNote = (title) => {
  //fetch Notes
  let notes = fetchNotes();
  //filter notes to remove note
  let filteredNotes = notes.filter((note) => note.title !== title);
  //save new array of filtered notes
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length
};


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
}
