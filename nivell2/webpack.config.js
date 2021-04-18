const path = require('path'); 

module.exports = { 
    entry: './controllers/cursa.js', 
    output: { 
      filename: 'bundle2.js', 
      path: path.resolve(__dirname, 'controllers'), 
    }, 
}; 