const fs = require('fs')
const { parse } = require('csv-parse/sync')

const buf = fs.readFileSync('./data/in/keymap.tsv', 'utf-8')

const rawRecords = parse(buf, {
  columns: true,
  delimiter: '\t',
  skip_empty_lines: true,
  trim: true,
})

const records = rawRecords.filter((x) => x.category)

// const categorySet = {}
// for (const rec of records) {
//   const cate = rec.category
//   if (!cate) continue
//   if (!categorySet[cate]) {
//     categorySet[cate] = []
//   }
//   categorySet[cate].push(rec)
// }

const jsonStr = JSON.stringify(records, null, 2)
fs.writeFileSync('./data/out/keymap.json', jsonStr)
