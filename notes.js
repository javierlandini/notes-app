const fs = require('fs');
const chalk = require('chalk');

const getNotes = ()  => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const notes = JSON.parse(dataBuffer.toString());
        return notes;
    }
    catch(e) {
        return [];
    }
}

const addNote = (title, body) => {
    const notes = getNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length) {
        console.log(chalk.red.inverse('Error: Title "' + title + '" already taken!'));
        return;
    }

    notes.push({
        title: title,
        body: body,
    });
    saveNotes(JSON.stringify(notes));
    console.log(chalk.green.inverse('Note added!'));
}

const removeNote = (title) => {
    const notes = getNotes();
    // Let's keep just the notes that don't match with the title provided.
    const newNotes = notes.filter((note) =>  note.title !== title)

    if (newNotes.length === notes.length) {
        console.log(chalk.red.inverse('Error: Note "' + title + '" not found.'));
        return;
    }

    saveNotes(JSON.stringify(newNotes));
    console.log(chalk.green.inverse('Note removed! ' + title));
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', notes);
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
}