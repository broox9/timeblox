import fs from 'fs'
import { StringDecoder } from 'string_decoder'

import { months } from './time-functions'

const DELIMITER = '\t'
const HEADERS = `Date\tTime Start\tTime End\tActivity\tNotes\tdistraction level`
const date = new Date()
const month = months[date.getMonth()]
const year = date.getFullYear()
let _defaultFile = `TimeBlox - ${month} ${year}.tsv`
let _currentFile = `TimeBlox - ${month} ${year}.tsv`
let _filePath = `${process.env['HOME']}/Desktop/timeblox/`

setCurrentFile()

export function setTestMode(isTesting = false) {
  const file = isTesting ? 'testfile.tsv' : _defaultFile;
  setCurrentFile(file)
}

export function getData() {
  const file = fs.readFileSync(_currentFile, 'utf8')
  const lines = file.split('\n').slice(1)
  return lines.map(line => {
    const [event_date, event_time_start, event_time_end, event_type, event_details, event_distraction] = line.split(DELIMITER)
    return { event_date, event_time_start, event_time_end, event_type, event_details, event_distraction }
  })
}

export function saveLog(data) {
  fs.appendFileSync(_currentFile, formatLine(data), 'utf8')
  return getData()
}

export function saveAll(data) {
  const file = fs.createWriteStream(_currentFile)
  file.on('error', err => console.warn(err))
  file.write(`${HEADERS}\n`)
  data.forEach(line => {
    file.write(formatLine)
  });
  file.end()
  console.log(' SAVE ALL', data)
}

export function setCurrentFile(overrideFile) {
  const file = `${_filePath}${overrideFile ? overrideFile : _defaultFile}`
  const hasFile = fs.existsSync(file)
  if (!hasFile) {
    fs.appendFileSync(file, HEADERS, 'utf8')
  }
  _currentFile = file
}

function formatLine(line) {
  const { event_date, event_time_start, event_time_end, event_type, event_details, event_distraction } = line
  return `\n${event_date}\t${event_time_start}\t${event_time_end}\t${event_type}\t${event_details}\t${event_distraction }`
}
