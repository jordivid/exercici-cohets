const path = require('path'); 

module.exports = { 
    entry: './controllers/classificacio.js', 
    output: { 
      filename: 'bundle3.js', 
      path: path.resolve(__dirname, 'controllers'), 
    }, 
}; 