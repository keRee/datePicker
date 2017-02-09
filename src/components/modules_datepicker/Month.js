/**
  * API 参考链接
  * Moment.js   http://momentjs.com/
  * moment-range  https://www.npmjs.com/package/moment-range
  */

import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export default class Month {
  constructor (month, year) {
    this.month = month
    this.year = year
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('month')
  }

  getWeekStart () {
    return this.start.weekday()
  }

  getDays () {
    return moment.range(this.start, this.end)
  }

  getFormatDate () {
    return this.start.format('MMM YYYY ')
  }
}
