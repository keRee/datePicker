<template>
  <div class="datepicker-container">
    <input type="text" class="text" :value="time.format('YYYY-MM-DD')" style="padding-left: 5px;" @click="showDatepicker">
    <input type="hidden" class="text" :value="time.format('YYYY-MM-DD')" style="padding-left: 5px;">
    <date-box :date="time" :visible="isVisible"></date-box>
  </div>
</template>
<script>
import Moment from 'moment'
import dataBox from './datePickerBox'

Moment.locale('zh-cn') // 设置时间为中国惯用格式

export default{
  components: {
    'date-box': dataBox
  },
  props: {
    value: {type: String, required: true},
    format: {type: String, required: true}
  },
  data: function () {
    return {
      time: Moment(this.value),
      isVisible: false
    }
  },
  methods: {
    showDatepicker () {
      this.isVisible = true
      setTimeout(() => document.addEventListener('click', this.hideDatepicker), 0)
    },
    hideDatepicker () {
      this.isVisible = false
      document.removeEventListener('click', this.hideDatepicker)
    }
  }
}

</script>

<style>
  .datepicker-container{
    position: relative;
    display: inline-block;
  }

</style>
