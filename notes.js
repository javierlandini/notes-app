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

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', notes);
}

const addNote = (title, body) => {
    const notes = getNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (duplicateNote) {
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

const readNote = (title) => {
    const notes = getNotes();
    const note = notes.find((n) => n.title === title);
    if (note) {
        console.log(chalk.blue(note.title));
        console.log(note.body);
    }
    else {
        console.log(chalk.red.inverse('No note found.'));
    }
}

const listNotes = () => {
    const notes = getNotes();
    if (notes.length) {
        console.log(chalk.bold.blue.inverse('Your notes:'));
        notes.forEach(note => {
            console.log(chalk.white('  ' + note.title));
        });
    }
    else {
        console.log(chalk.red.inverse('No notes found.'));
    }

}

module.exports = {
    addNote,
    removeNote,
    readNote,
    listNotes,
}
