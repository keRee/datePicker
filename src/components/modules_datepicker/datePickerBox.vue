<template>
  <div class="datepicker" v-if="visible" @click.stop>
    <div class="datepicker-head">
      <div class="datepicker-year">
        {{year}}
      </div>
      <div class="datepicker-date">
        {{date_farmatted}}
      </div>
    </div>
    <div class="datepicker-week">
      <div class="datepicker-control">
        <div class="datepicker-month">{{ month.getFormatDate() }}</div>
        <button class="datepicker-next" @click="nextMonth()">
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
        </button>
        <button class="datepicker-prev" @click="prevMonth()">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
        </button>
      </div>
      <div class="datepicker-weekday" v-for="day in days">
        {{ day }}
      </div>
      <div class="datepicker-days">
        <div class="datepicker-day" :style="{width: ((month.getWeekStart()+1)*41) + 'px'}">
          
        </div>
        <div class="datepicker-day" v-for="day in mdays" :class="{selected: isSelected(day)}" @click="seclectDay(day)">
          <span class="datepicker-day-effect"></span>
          <span class="datepicker-day-text">{{day.format('D')}}</span>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import Month from './Month'

export default{
  props: {
    date: {},
    visible: {type: Boolean, default: false}
  },
  data () {
    return {
      days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      month: new Month(this.date.month(), this.date.year()),
      date01: this.date
    }
  },
  computed: {
    year () {
      return this.date.format('YYYY')
    },
    date_farmatted () {
      return this.date.format('MMMDo dddd')
    },
    mdays () {
      const range = this.month.getDays()
      const mdays = Array.from(range.by('day')) // Array.from() ES6 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
      mdays.map(m => m.format('DD'))

      return mdays
    }
  },
  methods: {
    isSelected (day) {
      return this.date01.unix() === day.unix() // moment().uinx()  http://momentjs.com/docs/#/displaying/unix-timestamp/
    },
    seclectDay (day) {
      this.date01 = day.clone()
      this.$parent.time = day
    },
    nextMonth () {
      let month = this.month.month + 1
      let year = this.month.year

      if (month > 11) {
        year += 1
        month = 0
      }

      this.month = new Month(month, year)
    },
    prevMonth () {
      console.log(1)
      let month = this.month.month - 1
      let year = this.month.year

      if (month < 0) {
        year -= 1
        month = 11
      }

      this.month = new Month(month, year)
    }
  }
}

</script>

<style lang="scss">
  $header-height: 100px;
  $day-size: 41px;

  .datepicker{
    position:absolute;
    top: 100%;
    width: 315px;
    box-shadow: 5px 5px 5px #999;
    z-index: 9;
  }
  .datepicker-head{
    background-color: #0097a7;
    color: #fff;
    padding: 20px;
    height: $header-height;
  }
  .datepicker-year{
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .datepicker-date{
    font-size: 32px;
    line-height: 32px;
  }

  .datepicker-week{
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.8);
    padding: 0 14px;
    font-weight: bold;
    overflow: hidden;
  }
  .datepicker-weekday{
    float: left;
    width: $day-size;
    text-align: center;
    margin: 10px 0;
  }
  
  .datepicker-days{
    margin: 0px;
  }
  .datepicker-day{
    position: relative;
    width: $day-size;
    height: $day-size;
    line-height: $day-size;
    float: left;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    transition: all .3s linear;
  }

  .datepicker-day-effect{
    position: absolute;
    width: 36px;
    height: 36px;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    background-color: rgb(0, 151, 167);
    transition: all .3s linear;
    transform: scale(0);
    opacity: 0;
  }
  .datepicker-day-text{
    position: relative;
  }
  .datepicker-day:hover{
    color: #fff;
    .datepicker-day-effect{
      transform: scale(1);
      opacity: 0.6;
    }
  }
  .datepicker-day.selected{
    color: #fff;
    .datepicker-day-effect{
      transform: scale(1);
      opacity: 1;
    }
  }

  .datepicker-control{
    position: relative;
    height: 40px;;
    line-height: 40px;;
    text-align: center;
    font-size: 20px;
    overflow: -hidden;

    button{
      width: 40px;
      height: 40px;
      border: none;
      outline: none;
      background: transparent;
      user-select: none;
    }
    svg{
      width: 24px;
      height: 24px;
      fill: rgba(0, 0, 0, 0.87);
      vertical-align: middle;
    }
  }
  .datepicker-next{
    position: absolute;
    top: 0;
    right: 0;
  }
  .datepicker-prev{
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
