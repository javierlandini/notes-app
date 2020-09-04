const yargs = require('yargs');
const getNotes = require('./notes');

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
        console.log('Note added!');
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
      },
  )
  .command(
      'remove',
      'Remove a note',
      {},
      function(argv) {
        console.log('Note removed!');
      },
  ).argv;
