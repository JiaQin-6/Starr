<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:43:40
 * @LastEditTime: 2019-12-10 10:40:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <!-- 顶部标题 -->
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('firm_order_Period')}}</p>
    </div>
    <!-- 中间内容部分 -->
    <div class="contain_date">
      <div class="titleInfo">
        <p>{{product_name}}</p>
      </div>
      <!-- 选择日期 -->
      <div class="select_date">
        <p>{{$t('hl_date_desc')}}</p>
        <div class="departureDate">
          <div class="leftText">{{$t('product_decs_quote_dialog_start')}}</div>
          <div @click="showDatePicker" class="rightDate">{{date.departureDate}}</div>
        </div>
        <div class="returnDate">
          <div class="leftText">{{$t('product_decs_quote_dialog_end')}}</div>
          <div class="rightDate">{{date.returnDate}}</div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="button-bar">
      <button @click="confirm" class="proceed">{{$t('info_doc_data_next')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      date: {
        returnDate: "XXXX/XX/XX",
        departureDate: ""
      },
      todayDate: "",
      isMore: "",
      loading:false
    };
  },
  methods: {
    ...mapMutations(["setPolicyDate"]),
    confirm() {
      this.loading = true;
      if (!this.date.returnDate) {
        this.$createToast({
          txt: this.$t("insurance_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      //判断出发日期是否小于当天
      else if (
        new Date(`${this.date.departureDate} 00:00:00`).getTime() <
        new Date(`${this.todayDate} 00:00:00`).getTime()
      ) {
        this.$createToast({
          txt: this.$t("travel_annaul_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      //判断年计划的出发日期是否大于距离当天有180天
      else if (this.isMore > 60) {
        this.$createToast({
          txt: this.$t("moreDays"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      this.setPolicyDate(this.date);
      if (this.$route.query.isChange == "true") {
        this.$router.push({ path: "/ConfirmOrder" });
      } else {
        this.$router.push("/Employer");
      }
    },
    toPrePage() {
      this.$router.push("/Prompt");
    },
    //点击选择时间日期的事件,更加type來判斷是出發日期還是回程日期
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "Date Picker",
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          cancelTxt: this.$t("cancel"),
          confirmTxt: this.$t("confirm"),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
          onChange: this.changeHandle
        });
      }
      this.datePicker.show();
    },
    //点击时间日期插件确认键事件
    selectHandle(date, selectedVal, selectedText) {
      this.date.departureDate = this.dateTozero(selectedVal).join("/");
      let dateArr = this.dateTozero(selectedVal);
      //如果是选择一年计划,从新选择时间,returndate会相应改变
      if (this.plan.period_value == 1) {
        this.date.returnDate = this.getreturnDate(dateArr, 1);
      } else {
        //如果是选择两年计划,从新选择时间,returndate会相应改变
        this.date.returnDate = this.getreturnDate(dateArr, 2);
      }
      this.fromToday();
    },
    //数字小于10时前面加个0
    dateTozero(arr) {
      return arr.map(item => (item < 10 ? "0" + item : "" + item));
    },
    //点击时间日期插件取消键事件
    cancelHandle() {},
    // 获取当天的天数
    getToday(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    },
    //计算出发时间距离当天有多少天
    fromToday() {
     this.isMore =
        Math.ceil(
          (new Date(`${this.date.departureDate} 00:00:00`).getTime() -
            new Date(`${this.todayDate} 00:00:00`).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
    },
    //计算一年时候的returndate
    getreturnDate(date, year) {
      var date2 = null;
      date2 = [
        (Number(date[0]) + year).toString(),
        date[1],
        date[2] < 10 ? "0" + date[2] : date[2]
      ].join("/");
      var times = new Date(`${date2} 00:00:00`).getTime() - 1; //转成时间戳
      var date = new Date(times);
      var Y = date.getFullYear() + "/";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    }
  },
  created() {
    //获取当天的天数
    this.todayDate = this.getToday(new Date());
    this.date.departureDate = this.getToday(new Date());
    let dateArr = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-");
    if (this.plan.period_value == 1) {
      this.date.returnDate = this.getreturnDate(dateArr, 1);
    } else {
      this.date.returnDate = this.getreturnDate(dateArr, 2);
    }
    //如果vuex中有值
    if (this.policyDate) {
      for (var key in this.policyDate) {
        this.date[key] = this.policyDate[key];
      }
    };
  },
  computed: {
    ...mapState(["plan", "product_name","policyDate"])
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 34px;
  background: @background;
  padding-bottom: 60px;
  position: relative;
  padding-top: 120px;

   .button-bar {
    text-align: center;
   // position: fixed;
    width: 100%;
    height: 200px;
    //bottom: 0;
    //left: 50%;
    //transform: translateX(-50%);
    margin-top:500px;
    //border-top: 3px solid rgba(211, 209, 209, 0.25);
    //background-color: rgba(250, 250, 250);
  }
  .proceed {
    background: rgb(2, 164, 71);
    width: 500px;
    height: 100px;
    margin-top: 60px;
    border-radius: 15px;
    color: white;
    font-weight: 550;
    font-size: 30px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .headTitle {
    position: fixed;
    height: 100px;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 99;
    background-color: rgba(250, 250, 250);
    border-bottom: 2px solid rgba(211, 209, 209, 0.25);
    .cubeic-arrow {
      color: rgb(0, 122, 255);
      display: inline-block;
      transform: rotateZ(180deg);
      font-size: 32px;
      font-weight: bold;
      position: absolute;
      left: 0px;
      line-height: 100px;
      width: 50px;
      text-align: center;
      height: 100%;
      cursor: pointer;
    }
    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      font-size: 30px;
      font-weight: 600;
      margin-top: 40px;
    }
  }
  .contain_date {
    padding: 20px 25px;
    .titleInfo {
      text-align: center;
      font-size: 35px;
      p {
        color: rgb(12, 129, 255);
        font-weight: bold;
      }
    }
    .select_date {
      margin-top: 100px;
      p {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 50px;
      }
      .departureDate {
        height: 70px;
        background-color: #ccc;
        border-radius: 35px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }
      .returnDate {
        height: 70px;
        background-color: #ccc;
        border-radius: 35px;
        margin-top: 10px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }
      .leftText {
        color: rgb(12, 129, 255);
        line-height: 70px;
        font-size: 28px;
      }
      .rightDate {
        display: inline-block;
        font-size: 30px;
        line-height: 70px;
        margin-right: 50px;
        color: rgb(74, 74, 74);
      }
    }
  }
    @{deep} .cube-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    background-color: rgb(231, 227, 227);
    text-align: center;
    border-radius: 10px;
    .cube-loading-spinners{
      margin: 22px 22px;
      width: 60px;
      height: 60px;
    }
  }
}
//媒体查询
@media screen and (min-width: 1050px) {
  .page-wrap {
    width: 900px;
    margin: 0 auto;
    box-sizing: border-box;
    .headTitle {
      width: 900px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .button-bar {
      width: 900px;
    }
  }
}
</style>