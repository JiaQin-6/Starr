<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:35:48
 * @LastEditTime: 2019-12-11 16:07:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <!-- 标题 -->
    <div class="headTitle">
      <i @click="toTravelinfo" class="cubeic-arrow"></i>
      <p></p>
    </div>
    <p class="title">
      {{data.displayed_owned_by}}
      <img
        src="../assets/images/icon_tu_info.png"
        @click="showHiddenExplain('show')"
      />
    </p>
    <div class="headerimgs progressive">
      <img
        class="headerimg"
        v-progressive="data.insurers_banner"
        src="@/assets/images/loading photo@3x.png"
        alt
      />
    </div>

    <p class="travelead">{{data.name}}</p>

    <p class="budget">{{data.desc1}}</p>

    <div class="travel-insurance">{{data.category_name}}</div>

    <!-- 价格 -->
    <div class="price" v-if="plan">
      <!-- <div class="fontIcon">
        <i class="iconfont icon-shoucang"></i>
        <i class="iconfont icon-fenxiang"></i>
      </div>-->
      {{data.currency_desc ? data.currency_desc : ''}}{{price}}
    </div>
    <div class="projectImg progressive">
      <img
        class="box"
        v-progressive="data.products_imgs[0]"
        src="@/assets/images/loading photo@1X.png"
        alt
      />
    </div>
    <!-- 总天数和总人数 -->
    <div class="people">
      <span class="days">
        <span>{{days}}</span>
        {{$t('Days')}}
      </span>
      <span class="line">|</span>
      <span class="adults">
        <img class="adultsimg" src="@/assets/images/Adults@3x.png" alt />
      </span>
      <span class="adultsnum">{{adults}}</span>
      <span class="friends">
        <img class="friendsimg" src="@/assets/images/friends Copy@3x.png" />
      </span>
      <span class="friendsnum">{{childs}}</span>
      <span class="toTravelinfo" @click="toTravelinfo">
        <i class="cubeic-arrow"></i>
      </span>
    </div>

    <!-- Key Features -->
    <div>
      <p class="key">{{$t('product_decs_key_title')}}</p>
      <div class="key-content">
        <div class="features-wrap">
          <p :class="{'features': flag}">{{data.remarks}}</p>
          <span class="more" @click="clickmore">{{flag ? $t('product_decs_key_more') : $t('hide')}}</span>
        </div>
      </div>
    </div>

    <!-- Customer Service -->
    <div class="customers" @click="showHideCustomerService('show')">
      <span class="starrs">
        <img class="starr" :src="data.cs_logo" alt />
      </span>
      <span class="customer">{{$t('account_customer_service')}}</span>
      <i class="cubeic-arrow"></i>
    </div>

    <!-- Coverage Details -->
    <div class="coverages" @click="toCoverage">
      <span class="covers">
        <img class="cover" src="@/assets/images/Confirmation of cover@3x.png" alt />
      </span>
      <span class="coverage">{{$t('products_choose_plan_coverage_title1')}}</span>
      <i class="cubeic-arrow"></i>
    </div>
    <!-- 显示说明 -->
    <div v-show="showExplain" class="popover_back"></div>
    <div v-show="showExplain" class="explain">
      <img :src="data.insurers_banner" alt />
      <p>{{data.displayed_owned_by_details}}</p>
      <div @click="showHiddenExplain('hidden')" class="button_back">{{$t('btn_back')}}</div>
    </div>
    <!-- 客服服务弹框 -->
    <div v-show="showCustomerService" class="popover_back"></div>
    <div v-show="showCustomerService" class="CustomerService">
      <p v-html="data.customer_service"></p>
      <div @click="showHideCustomerService('hide')" class="button_back">{{$t('confirm')}}</div>
    </div>
    <div class="button-bar">
      <button class="proceed" @click="proceed">{{$t('products_proceed')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      more: false,
      data: "",
      flag: true,
      days: "",
      price: "",
      showExplain: false,
      showCustomerService: false,
      errorInfo: "", //报价错误提示
      loading: false
    };
  },
  computed: {
    ...mapState([
      "travelInfo",
      "product_id",
      "language",
      "plan",
      "userPhone",
      "MerchantId",
      "pricedata"
    ]),
    //计算成人和小孩的人数
    adults() {
      return (
        this.travelInfo.count.myself +
        this.travelInfo.count.spouse +
        this.travelInfo.count.friends
      );
    },
    childs() {
      return this.travelInfo.count.child;
    }
  },
  methods: {
    ...mapMutations(["setLogo", "setPrice", "setproductExplain"]),

    //点击更多显示更多
    clickmore() {
      this.flag = !this.flag;
    },
    //点击Proceed事件
    proceed() {
      //如果已经登录过就不显示这个页面
      // if (this.userPhone) {
      //   this.$router.push("/Prompt");
      // }else{
      //   this.$router.push("/Login");
      // }
      //如果价格为null,不让它跳到下一页
      if (!this.price) {
        if (this.errorInfo) {
          //请求错误
          this.$createToast({
            txt: this.errorInfo,
            time: 3000,
            type: "txt"
          }).show();
          return false;
        } else {
          //请求超时
          this.$createToast({
            txt: this.$t("request_error_title"),
            time: 3000,
            type: "txt"
          }).show();
          return false;
        }
      } else {
        this.loading = true;
        this.$router.push("/Login");
      }
    },
    //点击跳转到Travelinfo
    toTravelinfo() {
      this.$router.push("/Travelinfo");
    },
    //
    toPreviousPage() {
      this.$router.push("/Travelinfo");
    },
    //显示和隐藏产品说明
    showHiddenExplain(value) {
      this.showExplain = !this.showExplain;
      if (value == "show") {
        var mo = function(e) {
          e.preventDefault();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
      } else {
        var mo = function(e) {
          e.preventDefault();
        };
        document.body.style.overflow = ""; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
      }
    },
    //跳转到Coverage.vue---------------------------------------------
    toCoverage() {
      const { href } = this.$router.resolve({
        path: "/Coverage"
      });
      window.open(href, "_blank");
    },
    //显示和隐藏客户服务
    showHideCustomerService(value) {
      this.showCustomerService = !this.showCustomerService;
      if (value == "show") {
        var mo = function(e) {
          e.preventDefault();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
      } else {
        var mo = function(e) {
          e.preventDefault();
        };
        document.body.style.overflow = ""; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
      }
    },
    //获取链接
    ReplaceUrl(text) {
      var re = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      var s = text.replace(re, function(a) {
        return (
          '<a href="' +
          a +
          '" target=_blank style="color:#0c81ff;text-decoration:underline;">' +
          a +
          "</a>"
        );
      });
      console.log(s);
      return s;
    },
    // 金额显示.00格式
    NumFormat(value) {
      if (!value) return "0.00";
      value = value.toFixed(2);
      var intPart = Math.trunc(value); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0,实际上用不着
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat + floatPart;
      }
    }
  },
  created() {},
  async mounted() {
    //区号
    var areacode = this.travelInfo.phone_country_code;
    //天数
    this.days = this.travelInfo.days;
    var params = {
      language: this.language,
      product_id: this.product_id,
      phone_country_code: areacode,
      merchant_id: this.MerchantId
    };
    const loading = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    loading.show();
    //获取产品详情
    try {
      const res = await this.$http.post(
        "/wesupromo/web/tpc/getProductDetails",
        params
      );
      this.$nextTick(() => {
        loading.hide();
      });
      this.data = res.data;
      this.setLogo(res.data.insurers_banner);
      this.setproductExplain({
        explain1: res.data.displayed_owned_by,
        explain2: res.data.displayed_owned_by_details
      });
    } catch (error) {
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
    }

    // 报价
    let others_insured_list = [];
    const { count } = this.travelInfo;
    if (count.myself) {
      for (var i = 0; i < count.myself; i++) {
        others_insured_list.push({ relation: "2001" });
      }
    }
    if (count.spouse) {
      for (var i = 0; i < count.spouse; i++) {
        others_insured_list.push({ relation: "2002" });
      }
    }
    if (count.child) {
      for (var i = 0; i < count.child; i++) {
        others_insured_list.push({ relation: "2003" });
      }
    }
    if (count.friends) {
      for (var i = 0; i < count.friends; i++) {
        others_insured_list.push({ relation: "2004" });
      }
    }
    var priceParams = {
      product_id: this.product_id,
      language: this.language,
      start_date: this.travelInfo.date.departureDate.replace(/\//g, "-"),
      end_date: this.travelInfo.date.returnDate.replace(/\//g, "-"),
      others_insured_list
    };
    //调用接口获取价格
    this.$http
      .post("/wesupromo/web/product/getstarrquote", priceParams)
      .then(res => {
        this.price = res.data.premium;
        this.price = this.NumFormat(this.price);
        this.setPrice(this.price);
      })
      .catch(error => {
        if (error.status == 105) {
          this.errorInfo = error.msg;
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
        }
      });
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 34px;
  padding-bottom: 60px;
  background-color: #fff;
  position: relative;
  .headTitle {
    position: fixed;
    height: 100px;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 10;
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
  .title {
    color: rgb(155, 155, 155);
    font-size: 30px;
    margin-top: 100px;
    img {
      width: 30px;
      vertical-align: bottom;
      cursor: pointer;
      margin-left: 15px;
    }
  }
  .travelead {
    color: #000;
    font-weight: 700;
    font-size: 44px;
    line-height: 52px;
    margin-bottom: 15px;
  }
  .budget {
    color: #000;
    font-weight: 600;
    font-size: 34px;
    line-height: 42px;
    margin-bottom: 10px;
  }
  .travel-insurance {
    color: rgb(142, 142, 147);
    font-size: 30px;
  }
  .headerimgs {
    width: 320px;
    height: 150px;
    margin: 30px 0;
    img {
      width: 100%;
      height: 100%;
      line-height: 192px;
    }
  }

  .price {
    text-align: right;
    color: rgb(12, 129, 255);
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 35px;
    position: relative;
    height: 60px;
    .fontIcon {
      display: inline-block;
      text-align: left;
      position: absolute;
      left: 0;
      .iconfont {
        font-size: 35px;
        color: rgb(151, 151, 151);
        margin-left: 15px;
      }
    }
  }
  .projectImg {
    width: 100%;
    border-radius: 22px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .people {
    // width: 100%;
    border-bottom: 1px solid rgb(209, 208, 208);

    line-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      vertical-align: middle;
    }
    .toTravelinfo {
      padding: 0 20px;
      cursor: pointer;
    }
  }
  .days {
    font-size: 32px;
    color: rgb(74, 74, 74);

    > span {
      margin-left: 20px;
      margin-right: 15px;
    }
  }
  .line {
    font-size: 40px;
    color: rgb(151, 151, 151);
    margin-left: -100px;
  }
  .adults {
    display: inline-block;
    width: 47px;
    height: 47px;
    margin-right: -100px;
  }
  .adultsimg {
    width: 100%;
    height: 100%;
  }
  .friends {
    display: inline-block;
    width: 47px;
    height: 47px;
    margin-right: -100px;
  }
  .friendsimg {
    width: 100%;
    height: 100%;
  }
  .adultsnum {
    color: rgb(74, 74, 74);
    font-size: 30px;
    margin-right: -75px;
  }
  .friendsnum {
    color: rgb(74, 74, 74);
    font-size: 30px;
  }
  .cubeic-arrow {
    color: rgba(0, 0, 0, 0.25);
    font-size: 32px;
    font-weight: bold;
  }

  .trip {
    color: rgb(12, 129, 255);
    font-weight: 500;
    border-bottom: 1px solid rgb(209, 208, 208);
    line-height: 65px;
  }
  .key {
    font-size: 34px;
    font-weight: 550;
    line-height: 100px;
  }
  .key-content {
    border-bottom: 1px solid rgb(209, 208, 208);
    padding-bottom: 45px;
    p {
      font-size: 30px;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 45px;
    }
  }
  .features-wrap {
    white-space: pre-line;
    position: relative;
    .more {
      position: absolute;
      right: 0;
      bottom: -35px;
      color: rgb(12, 129, 255);
      cursor: pointer;
      font-size: 26px;
    }
  }
  .features {
    font-size: 28px;
    color: #000;
    overflow: hidden;
    line-height: 32px;
    height: 90px;
  }
  .features:after {
    content: "...";
    text-align: left;
    position: absolute;
    bottom: -15px;
    left: 0;
    font-size: 40px;
  }

  .customers {
    line-height: 75px;
    border-bottom: 1px solid rgb(209, 208, 208);
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .starrs {
      display: inline-block;
      width: 65px;
      height: 65px;
      .starr {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        margin-left: 20px;
      }
    }
    .customer {
      font-size: 35px;
      font-family: Arial, Helvetica, sans-serif;
      margin-left: -220px;
    }
  }
  .coverages {
    line-height: 75px;
    padding-bottom: 15px;
    display: flex;
    color: #000;
    justify-content: space-between;
    border-bottom: 1px solid rgb(209, 208, 208);
    .covers {
      display: inline-block;
      width: 65px;
      height: 65px;
      .cover {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        margin-left: 20px;
      }
    }
    .coverage {
      font-size: 35px;
      font-family: Arial, Helvetica, sans-serif;
      margin-left: -220px;
    }
  }
  .popover_back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.4;
  }
  .explain {
    width: 600px;
    position: fixed;
    z-index: 888;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50% - 2px), calc(-50% - 2px));
    //padding: 30px;
    text-align: center;
    background-color: #fff;
    border-radius: 20px;
    padding: 30px 30px;
    img {
      width: 60%;
      margin-top: 50px;
      margin-bottom: 50px;
    }
    p {
      font-size: 35px;
      line-height: 40px;
    }
    .button_back {
      width: 50%;
      height: 80px;
      border-radius: 20px;
      line-height: 80px;
      color: #fff;
      margin: 0 auto;
      font-size: 30px;
      margin-top: 100px;
      background-color: #00a738;
      cursor: pointer;
    }
  }
  .CustomerService {
    width: 600px;
    position: fixed;
    z-index: 888;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50% - 2px), calc(-50% - 2px));
    //padding: 30px;
    text-align: center;
    background-color: #fff;
    border-radius: 20px;
    padding: 50px 30px;
    box-sizing: border-box;
    p {
      font-size: 35px;
      line-height: 40px;
    }
    .button_back {
      width: 50%;
      height: 80px;
      border-radius: 20px;
      line-height: 80px;
      color: #fff;
      margin: 0 auto;
      font-size: 30px;
      margin-top: 100px;
      background-color: #00a738;
      cursor: pointer;
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
    .cube-loading-spinners {
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