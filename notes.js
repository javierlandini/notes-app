const fs = require('fs');

const getNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const notes = JSON.parse(dataBuffer.toString());
        return notes;
    }
    catch(e) {
        return [];
    }
}

const addNote = function(title, body) {
    const notes = getNotes();
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title;
    });
    if (duplicateNotes.length) {
        console.log('Error: Title "' + title + '" already taken!');
        return;
    }

    notes.push({
        title: title,
        body: body,
    });
    saveNotes(JSON.stringify(notes));
    console.log('Note added!');
}

const removeNote = function(title) {
    console.log('Note removed!');
}

const saveNotes = function(notes) {
    fs.writeFileSync('notes.json', notes);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}