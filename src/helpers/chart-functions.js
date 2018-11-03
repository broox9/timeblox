import isSameWeek from 'date-fns/is_same_week'
import subDays from 'date-fns/sub_days'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import { colors } from 'pcln-design-system'
// import R from 'rambda';

export const colorScale = [colors.green, colors.blue, colors.orange, colors.purple, colors.darkOrange, colors.darkGreen]

import { today } from './time-functions'

/** Log Filters */
export function todayLogs(logs) {
  const thisDay = today()
  return logs.filter(log => log.event_date === thisDay)
}

export function weekLogs(logs) {
  return logs.filter(log => {
    const fauxToday = today()
    const logDate = new Date(log.event_date.split('-'))
    return isSameWeek(fauxToday, logDate)
  });
}

/** Grouping */
export function groupByType(logs) {
  return logs.reduce((obj, log) => {
    const { event_type } = log
    if (obj.hasOwnProperty(event_type)) {
      obj[event_type].push(log)
    } else {
      obj[event_type] = [log]
    }
    return obj;
  }, {})
}

export function durationMinutes(end_time, start_time) {
  const dummyDate = new Date();
  const [endHour, endMinute ] = end_time.split(':')
  const [ startHour, startMinute ] = start_time.split(':')
  const end = dummyDate.setHours(endHour, endMinute);
  const start = dummyDate.setHours(startHour, startMinute);
  return differenceInMinutes(end, start);
}

/** Pie Charts */
export function pieChartByType(logs) {
  const list = groupByType(logs)
  let total = 0
  return Object.keys(list).reduce((arr, key) => {
    const rollup = { x: key }
    rollup.y = list[key].reduce((acc, item) => {
      const duration = durationMinutes(item.event_time_end, item.event_time_start)
      acc += duration
      total += acc
      return acc
    }, 0)
    arr.push(rollup)
    return arr
  }, []).map( r => {
    r.total = total
    return r
  })
}

// export const pieChartByTypeToday = R.pipe(todayLogs, pieChartByType);
export function pieChartByTypeToday(logs) {
  return pieChartByType(todayLogs(logs))
}

export function pieChartByTypeThisWeek(logs) {
  return pieChartByType(weekLogs(logs))
}

export function prepData(logs) {
  // console.log('today logs', todayLogs(logs))
  // console.log('group logs', groupByType(logs))
  // console.log('pieByType', pieChartByType(logs));
}