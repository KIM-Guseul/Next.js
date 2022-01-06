import fs from 'fs'; //파일 시스템에 접근
import path from 'path'; //menu.csv 읽어오기


export default function handler(req, res) {

  //파일 시스템에 접근
  //const fs = require('fs');

  const file = fs.readFileSync(path.resolve('./assets/menu.csv'), 'utf-8');
  const rows = file.split('\n');
  // console.log(rows);

  const json = [];

  rows.forEach( row => {
    if(row === '') return;
    const item = row.split(',');

    json.push({
      name: item[0],
      price: parseInt(item[1], 10) 
    })
  })
  // console.log(json)
  
  //setTimeout(()=>{
    res.status(200).json(json)
  //},2000);

}
