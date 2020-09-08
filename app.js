const yargs = require('yargs');
const notes = require('./notes');

yargs
  .command(
      'add',
      'Add a note',
      {
        title: {
          describe: 'Note title',
          require: true,
          type: 'string',
        },
        body: {
          describe: 'Note body',
          require: true,
          type: 'string',
        },
      },
      function(argv) {
        notes.addNote(argv.title, argv.body);
      },
  )
  .command(
      'remove',
      'Remove a note',
      {
        title: {
          describe: 'Title of the note to remove',
          require: true,
          type: 'string',
        },
      },
      function(argv) {
        notes.removeNote(argv.title);
      },
  ).argv;
