const fs = require('fs')

console.log(__dirname)

fs.readFile('../lista-precios.txt','utf-8',(err,data)=>{

    let regularExpression = new RegExp(' ','g')
    data = data.replace(regularExpression, ',')
 
    console.log(data)
})