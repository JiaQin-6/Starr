<!--
 * @Description: In User Settings Edi
 * @Author: your name
 * @Date: 2019-09-04 11:47:08
 * @LastEditTime: 2019-12-10 14:12:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <!-- 标题 -->
    <div class="headTitle">
      <i @click="toPreviousPage" class="cubeic-arrow"></i>
      <p></p>
    </div>
    <div class="header progressive">
      <img
        class="banner"
        v-progressive="data.products_imgs[0]"
        src="@/assets/images/loading photo@1X.png"
        alt
      />
    </div>
    <div class="container-wrap">
      <p class="title">{{$t('pc_tra_title1')}}</p>
      <p class="part-title">
        <span>{{$t('departure_return')}}</span>
        <span>{{getDays}} {{$t('days')}}</span>
      </p>
      <div class="date-part">
        <!-- cube-ui日期插件 -->
        <cube-button @click="showDatePicker('departureDate')">
          <div class="date-pick">
            <p class="date-label">{{$t('quote_departure_date')}}</p>
            <span
              :class="{'date-value':true, 'empty': !date.departureDate}"
            >{{date.departureDate ? date.departureDate : 'XXXX/XX/XX'}}</span>
          </div>
        </cube-button>
        <!-- cube-ui日期插件 -->
        <cube-button @click="showDatePicker('returnDate')">
          <div class="date-pick">
            <p class="date-label">{{$t('quote_return_date')}}</p>
            <span
              :class="{'date-value':true, 'empty': !date.returnDate}"
            >{{date.returnDate ? date.returnDate : 'XXXX/XX/XX'}}</span>
          </div>
        </cube-button>
      </div>
      <p class="part-title">
        <span>{{$t('member_companion')}}</span>
        <span>{{counts}} {{$t('quote_members')}}</span>
      </p>
      <div class="Companion-part">
        <div @click="handlecount('select','myself')">
          <span>{{$t('ship_myself')}}</span>
          <span :class="{'checkBox':true, 'selected':count.myself !== 0}"></span>
        </div>
        <div @click="handlecount('select','spouse')">
          <span>{{$t('ship_my_spouse')}}</span>
          <span :class="{'checkBox':true, 'selected':count.spouse !== 0}"></span>
        </div>
        <div>
          <span>
            {{$t('child')}}
            <i>{{$t('age_below')}}</i>
          </span>
          <span>
            <i @click="handlecount('sub','child')" class="action-button sub"></i>
            <span>{{count.child}}</span>
            <i @click="handlecount('add','child')" class="action-button add"></i>
          </span>
        </div>
        <div>
          <span>{{$t('Family_friends')}}</span>
          <span>
            <i @click="handlecount('sub','friends')" class="action-button sub"></i>
            <span>{{count.friends}}</span>
            <i @click="handlecount('add','friends')" class="action-button add"></i>
          </span>
        </div>
      </div>
      <div class="button-bar">
        <button class="next" @click="showResults">{{$t('product_show_my_results')}}</button>
      </div>
    </div>
    <!-- 提示背景 -->
    <!-- <div v-show="isShow" class="popover_back"></div>
    <div v-show="isShow" class="popover">
      <div class="Oops">
        <img src="../assets/images/Opps@3x.png" alt />
      </div>
      <p class="title">Oops!</p>
      <div
        class="hint"
      >{{$t('setPolicyholder')}}</div>
      <div class="btn">
        <button @click="Back" class="back">Back</button>
        <button @click="Comfirm" class="comfirm">Comfirm</button>
      </div>
    </div>-->
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import img1 from "../assets/images/loading photo@1X.png";
export default {
  data() {
    return {
      date: {
        departureDate: new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "/"),
        returnDate: "",
        departureDateObj: new Date(),
        returnDateObj: new Date()
      },
      count: {
        myself: 0,
        spouse: 0,
        child: 0,
        friends: 0
      },
      //保存天数
      //getDays: 0,
      dateType: "",
      //isShow: false,
      //data
      data: "",
      //当天的日期
      todayDate: "",
      //定义一个保存出发日期离当天有多少天的变量(不能大于180天)
      isMore: "",
      //显示loading
      loading:false,
    };
  },
  mounted() {
    var params = {
      language: this.language,
      product_id: this.product_id,
      phone_country_code: this.areacode,
      merchant_id: this.MerchantId
    };
    console.log(params);

    const loading = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    loading.show();
    this.$http
      .post("/wesupromo/web/tpc/getProductDetails", params)
      .then(res => {
        if (res.status == 100) {
          this.data = res.data;
          this.$nextTick(() => {
            loading.hide();
          });
        }
      })
      .catch(error => {
        if (error.msg) {
            //请求错误
            this.$createToast({
              txt: error.msg,
              time: 3000,
              type: "txt"
            }).show();
          } else {
            //请求超时
            this.$createToast({
              txt: this.$t("request_error_title"),
              time: 3000,
              type: "txt"
            }).show();
          }
      });
  },
  created() {
    //获取当天的天数
    this.todayDate = this.getToday(new Date());
    this.date.departureDate = this.getToday(new Date());
    //如果是选择年计划,period_type为2
    if (this.plan && this.plan.period_type == 2) {
      let dateArr = new Date()
        .toISOString()
        .slice(0, 10)
        .split("-");
      console.log(dateArr);
      this.date.returnDate = this.getreturnDate(dateArr);
    }
    // if (this.$route.params.id == "back") {
    //   //禁止浏览器回退
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener("popstate", function() {
    //     history.pushState(null, null, document.URL);
    //   });
    // }
    //进入到此页,判断vuex中是否有值
    if (this.travelInfo && this.travelInfo.count) {
      for (var key in this.travelInfo.date) {
        this.date[key] = this.travelInfo.date[key];
      }
      for (var key in this.travelInfo.count) {
        this.count[key] = this.travelInfo.count[key];
      }
      // this.date = this.travelInfo.date;
      // this.count = this.travelInfo.count;

      //清空vuex中的userInfo
      // const resetFile = [
      //   "userInfo",
      //   "protectorInfo",
      //   "travelInfo",
      //   "certificateId",
      //   "pricedata"
      // ];
      // this.reset(resetFile);
    }
    //过渡页
    const toast = this.$createToast({
      time: 1000,
      txt: this.$t("loading")
    });
    toast.show();
    //调用获取天数的方法
    //this.getDayNum();
    // if (this.plan.period_type == 2) {
    //   this.getDays = 365;
    // }
  },
  methods: {
    ...mapMutations(["setTravel", "reset"]),

    //选择人数事件(包括勾选和点击加减按钮)
    handlecount(type, field) {
      if (type === "select") {
        this.count[field] = this.count[field] === 0 ? 1 : 0;
      } else if (type === "sub" && this.count[field] > 0) {
        this.count[field] = this.count[field] - 1;
      } else if (type === "add") {
        this.count[field] = this.count[field] + 1;
      }
    },
    //点击选择时间日期的事件,更加type來判斷是出發日期還是回程日期
    showDatePicker(type) {
      if (type === "returnDate" && this.plan.period_type == 2) return false;
      this.dateType = type;
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "Date Picker",
          min: new Date(2008, 7, 8),
          max: new Date(2050, 9, 20),
          value: new Date(),
          cancelTxt: this.$t("cancel"),
          confirmTxt: this.$t("confirm"),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
          onChange: this.changeHandle
        });
      }
      this.datePicker.show();
      //判断点击的是哪一个日期的选择,显示对于的title
      setTimeout(() => {
        this.datePicker.$updateProps({
          title:
            type === "departureDate"
              ? `${this.$t("products_departure_data")}`
              : `${this.$t("products_return_data")}`,
          value:
            type === "departureDate"
              ? this.date.departureDateObj
              : this.date.returnDateObj
        });
      }, 0);
    },
    //计算一年时候的returndate
    getreturnDate(date) {
      var date2 = null;
      date2 = [
        (Number(date[0]) + 1).toString(),
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
      console.log(Y + M + D);
      return Y + M + D;
    },
    //点击时间日期插件确认键事件
    selectHandle(date, selectedVal, selectedText) {
      console.log(date, selectedVal, selectedText);
      this.date[this.dateType] = this.dateTozero(selectedVal).join("/");
      //如果是选择一年计划,从新选择时间,returndate会相应改变
      if (this.dateType === "departureDate" && this.plan.period_type == 2) {
        let dateArr = this.dateTozero(selectedVal);
        console.log(dateArr);
        this.date.returnDate = this.getreturnDate(dateArr);
      }
      //點擊出發或者回程日期的時候,departureDateObj和retureObj相應改變
      this.date[`${this.dateType}Obj`] = date;
      this.fromToday();
    },
    //数字小于10时前面加个0
    dateTozero(arr) {
      return arr.map(item => (item < 10 ? "0" + item : "" + item));
    },
    //点击时间日期插件取消键事件
    cancelHandle() {},
    changeHandle() {
      navigator.vibrate(10);
    },
    //点击Show My Results查看验证结果事件
    showResults() {
      if (!this.date.returnDate) {
        this.$createToast({
          txt: this.$t("insurance_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      } else if (
        new Date(`${this.date.returnDate} 00:00:00`).getTime() <
        new Date(`${this.date.departureDate} 00:00:00`).getTime()
      ) {
        this.$createToast({
          txt: this.$t("travel_annaul_toast"),
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
      else if (this.plan.period_type == 2 && this.isMore > 180) {
        this.$createToast({
          txt: this.$t("moreDays"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      // else if ( this.plan.period_type == 1 && this.days > 180) {
      //   this.$createToast({
      //    txt: this.plan.plan_list_desc,
      //    time: 3000,
      //    type: 'txt'
      //   }).show();
      //   return false;
      // }
      else if (this.counts === 0) {
        this.$createToast({
          txt: this.$t("insurance_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      } else if (this.counts > this.ageInfo.max_persons) {
        this.$createDialog({
          type: "alert",
          title: "",
          content: this.$t("minPeople") + this.ageInfo.max_persons,
          icon: "cubeic-alert"
        }).show();
        return false;
      }
      // else if (this.count.myself == "0") {
      //   //如果没有myself就要显示确认框
      //   this.isShow = true;
      //   return false;
      // }
      if (this.plan.period_type == 1) {
        this.checkDate();
      } else {
        this.next();
      }
    },
    //(事件)把数据存到vuex中的事件
    next() {
      this.loading = true;
      const query = {
        count: this.count,
        days: this.getDays,
        date: this.date,
        product_id: this.product_id,
        phone_country_code: this.areacode
      };
      //如果travelInfo有值(说明是选过人数的)
      if (this.travelInfo) {
        var isChange = false;
        for (var key in this.travelInfo.count) {
          //如果修改了人数
          if (this.count[key] != this.travelInfo.count[key]) {
            isChange = true;
            //清空vuex中的userInfo
            const resetFile = ["userInfo", "protectorInfo"];
            this.reset(resetFile);
            break;
          }
        }
        //(判断) 如果是从修改页面跳过来的
        if (this.$route.query.isChange == "true") {
          if (isChange == true) {
            this.setTravel(query);
            this.$router.push({ path: "/MemberData" });
          } else {
            this.setTravel(query);
            this.$router.push({ path: "/ConfirmOrder" });
          }
        } else {
          //将数据存到vuex
          this.setTravel(query);
          this.$router.push({ path: "/Infoconfirm" });
        }
      } else {
        //将数据存到vuex
        this.setTravel(query);
        this.$router.push({ path: "/Infoconfirm" });
      }
    },
    //自定义选择时间后做判断(年计划不需要)
    checkDate() {
      // 最多选择多少天
      var params = {
        product_id: this.plan.product_id,
        language: this.language,
        start_date: this.date.departureDate.replace(/\//g, "-"),
        end_date: this.date.returnDate.replace(/\//g, "-")
      };
      this.$http
        .post("/wesupromo/web/validate/checkJourneyDate", params)
        .then(res => {
          console.log(res);
          if (!res.data.is_valid) {
            this.loading = false;
            this.$createToast({
              txt: res.msg,
              time: 3000,
              type: "txt"
            }).show();
          } else {
            this.next();
          }
        });
    },
    //隐藏支付方式
    // Back() {
    //   this.isShow = false;
    // },
    //继续支付操作
    // Comfirm() {
    //   this.next();
    // },
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
      console.log(new Date(`${this.todayDate} 00:00:00`).getTime());
      console.log(new Date(`${this.date.departureDate} 00:00:00`).getTime());
      this.isMore =
        Math.ceil(
          (new Date(`${this.date.departureDate} 00:00:00`).getTime() -
            new Date(`${this.todayDate} 00:00:00`).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      console.log(this.isMore);
    },
    toPreviousPage() {
      this.$router.push(
        `/index/${this.MerchantId}/${this.beginProductId}/${this.language}`
      );
    }
  },
  computed: {
    ...mapState([
      "areacode",
      "plan",
      "beginProductId",
      "travelInfo",
      "product_id",
      "language",
      "MerchantId",
      "ageInfo",
      "pricedata",
      "userInfo"
    ]),
    //计算总人数
    counts() {
      return (
        this.count.myself +
        this.count.spouse +
        this.count.child +
        this.count.friends
      );
    },
    //计算天数
    getDays() {
      let day = 0;
      if (
        this.date.returnDate &&
        new Date(this.date.returnDateObj).getTime() >=
          new Date(`${this.date.departureDate} 00:00:00`).getTime()
      ) {
        day =
          Math.ceil(
            (new Date(this.date.returnDateObj).getTime() -
              new Date(this.date.departureDateObj)) /
              (1000 * 60 * 60 * 24)
          ) + 1;
      }
      if (this.plan.period_type == 2) {
        day = Math.ceil(
          (new Date(`${this.date.returnDate} 23:59:59`).getTime() -
            new Date(`${this.date.departureDate} 00:00:00`).getTime()) /
            (1000 * 60 * 60 * 24)
        );
      }
      return day;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  background-color: #fff;
  width: 100%;
  .header {
    width: 100%;
    margin-top: 100px;
    img {
      width: 100%;
      height: 100%;
    }
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
  .container-wrap {
    padding: 24px 34px 60px 34px;
    position: relative;
    .title {
      color: #000;
      font-weight: 500;
      font-size: 44px;
      line-height: 52px;
      margin-bottom: 62px;
    }
    .part-title {
      color: #000;
      font-size: 28px;
      line-height: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span {
        &:nth-of-type(1) {
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: rgb(155, 155, 155);
        }
      }
    }
    .date-part {
      overflow: hidden;
      margin-top: 18px;
      margin-bottom: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 22px;
      background: #fff;
      box-shadow: 0px 8px 40px 0 rgba(0, 0, 0, 0.14);
      /deep/ .cube-btn {
        background: #fff;
      }
      .date-pick {
        padding: 24px 0 20px 0;
        .date-label {
          color: @gray;
          font-weight: 500;
          margin: 0px 0 26px 0;
          font-size: 22px;
          line-height: 24px;
        }
        .date-value {
          color: @blue;
          font-weight: 500;
          font-size: 34px;
          line-height: 46px;
          &.empty {
            color: rgb(155, 155, 155);
          }
        }
      }
    }
    .Companion-part {
      padding: 15px 0;
      margin-top: 26px;
      margin-bottom: 84px;
      border-radius: 22px;
      background: #fff;
      box-shadow: 0px 8px 40px 0 rgba(0, 0, 0, 0.14);
      > div {
        padding: 0 38px 0 50px;
        margin: 23px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > span {
          vertical-align: middle;
          &.checkBox {
            display: inline-block;
            width: 44px;
            height: 44px;
            background: url("../assets/images/TickOff@3x.png") no-repeat center
              center/44px 44px;
            cursor: pointer;
            &.selected {
              background: url("../assets/images/Tick@3x.png") no-repeat center
                center/44px 44px;
            }
          }
          > span {
            vertical-align: middle;
            display: inline-block;
            width: 44px;
            height: 44px;
            text-align: center;
            line-height: 44px;
          }

          .action-button {
            vertical-align: middle;
            display: inline-block;
            width: 44px;
            height: 44px;
            &.sub {
              background: url("../assets/images/reduce@3x.png") no-repeat center
                center/44px 44px;
              cursor: pointer;
            }
            &.add {
              background: url("../assets/images/Add@3x.png") no-repeat center
                center/44px 44px;
              cursor: pointer;
            }
          }

          &:first-of-type {
            color: #000;
            font-weight: 500;
            font-size: 34px;
            line-height: 40px;
            > i {
              font-size: 20px;
              font-style: normal;
            }
          }
        }
      }
    }

    .button-bar {
      text-align: center;
      // position: fixed;
      width: 100%;
      height: 200px;
      //bottom: 0;
      //left: 50%;
      //transform: translateX(-50%);
      margin-top: 50px;
      //border-top: 3px solid rgba(211, 209, 209, 0.25);
      //background-color: rgba(250, 250, 250);
    }
    .next {
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
  }
  //弹出框
  .popover_back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.4;
  }
  .popover {
    width: 600px;
    height: 600px;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50% - 2px), calc(-50% - 2px));
    background-color: #fff;
    border-radius: 25px;
    padding: 30px;
    .Oops {
      width: 150px;
      height: 150px;
      margin: 0 auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      height: 80px;
      font-size: 40px;
      width: 100%;
      text-align: center;
      color: rgb(12, 129, 255);
    }
    .hint {
      text-align: center;
      color: rgb(3, 3, 3);
      line-height: 32px;
      font-size: 26px;
      height: 210px;
    }
    .btn {
      display: flex;
      .back {
        flex: 1;
        height: 100px;
        font-size: 33px;
        color: #fff;
        background-color: rgb(74, 74, 74);
        border-radius: 15px 0 0 15px;
      }
      .comfirm {
        flex: 1;
        height: 100px;
        margin-left: -0.5px;
        font-size: 33px;
        color: #fff;
        background-color: rgb(2, 164, 71);
        border-radius: 0 15px 15px 0;
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
.cube-dialog-main {
  background-color: blue;
}
//媒体查询
@media screen and (min-width: 1050px) {
  .page-wrap {
    width: 900px;
    margin: 0 auto;
    .headTitle {
      width: 900px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .container-wrap {
      .button-bar {
        width: 900px;
      }
    }
  }
}
</style>