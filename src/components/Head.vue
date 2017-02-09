<template>
  <div class="container">
      <h3>DatePicker components</h3>
      
      <div class="form-group">
        开始日期：
        <datepicker value="2015-07-23" format="YYYY-mm-dd" name="start"></datepicker>
        结束日期：
        <datepicker value="2017-02-07" format="YYYY-mm-dd" name="end"></datepicker>
      </div>
  </div>
</template>


<script>
import datePicker from 'components/modules_datepicker/datePicker'

export default {
  components: {
    'datepicker': datePicker
  }
}

</script>


<style>
</style>
