const path = require('path'); 

module.exports = { 
    entry: './controllers/index.js', 
    output: { 
      filename: 'bundle.js', 
      path: path.resolve(__dirname, 'controllers'), 
    }, 
}; 