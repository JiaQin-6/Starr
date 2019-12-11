<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:32:52
 * @LastEditTime: 2019-12-11 12:03:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <cube-select
      class="cubeSelect"
      v-model="selectValue"
      :title="title"
      :options="options"
      :placeholder="placeholder"
      :auto-pop="autoPop"
      :disabled="disabled"
      :cancelTxt="$t('cancel')"
      :confirmTxt="$t('confirm')"
      @change="change"
    ></cube-select>
    <p class="title">
      {{data.displayed_owned_by}}
      <img
        src="../assets/images/icon_tu_info.png"
        @click="showHiddenExplain('show')"
      />
    </p>
    <div class="headerimgs progressive">
      <!-- v-progressive="data.progress_logo" -->
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
      <!-- 分享按钮和点赞按钮 -->
      <!-- <div class="fontIcon">
        <i class="iconfont icon-shoucang"></i>
        <i class="iconfont icon-fenxiang"></i>
      </div>-->
      {{plan.price_desc ? plan.price_desc : ''}}
    </div>

    <div class="projectImg progressive">
      <!-- v-progressive="data.products_imgs[0] -->
      <img
        class="box"
        v-progressive="data.products_imgs[0]"
        src="@/assets/images/loading photo@1X.png"
        alt
      />
    </div>
    <div class="line"></div>
    <!-- Single Plan和Annual Plan -->
    <div class="buttons">
      <button
        class="single btn"
        v-for="(item,index) in this.data.plan_list"
        :key="index"
        @click="setPlanProductId(item)"
        :class="{isActive:plan.period_type == item.period_type}"
      >{{item.plan_list_name}}</button>
    </div>

    <div class="trip" v-if="plan">{{plan.plan_list_desc ? plan.plan_list_desc : ''}}</div>

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

    <div class="button-bar">
      <button class="quato" @click="quato">{{$t('Quote')}}</button>
    </div>
    <!-- 提示背景 -->
    <div v-show="isShow" class="popover_back"></div>
    <div v-show="isShow" class="popover">
      <div class="discount_img_info">
        <h5>{{data.displayed_owned_by}}</h5>
        <div class="product_logo_info">
          <img class="product_logo" :src="data.insurers_banner" alt />
        </div>
        <div class="discount_info">
          <div class="product_img">
            <img :src="data.products_imgs[0]" alt />
          </div>

          <div class="product_title">
            <h3>{{$t('In_one_policy')}}</h3>
            <p>1){{$t('discount500')}}</p>
            <p>2){{$t('discount100')}}</p>
            <p>3){{$t('discount50')}}</p>
          </div>
        </div>
        <span></span>
      </div>

      <!-- 优惠券按钮 -->
      <div class="discount_btn_past">
        <div @click="hideDiscount" class="discount_btn">{{$t('confirm')}}</div>
        <p>{{$t('terms_notice')}}</p>
      </div>
      <div class="hideLine"></div>
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
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      travelInfo: {},
      more: false,
      data: "",
      flag: true,
      remarks: [],
      ischecked: 0,
      productId: "",
      areacode: "86",
      trip: "",
      price: "",
      Language: "",
      rendomNum: "",
      MerchantId: "", //商務id//GOLIONHK
      agesInfo: {},
      isShow: true,
      showExplain: false,
      facility: "", //保存访问的设备

      options: ["繁體中文", "English"], //选择语言
      selectValue: "",
      title: this.$t("language"),
      placeholder: "请选择入职时间",
      autoPop: false,
      disabled: false,
      showCustomerService: false,
      loading: false
    };
  },
  computed: {
    ...mapState(["product_id", "language", "plan", "ageInfo", "pricedata"])
  },
  created() {
    const resetFile = [
      "product_info",
      "plan",
      "travelInfo",
      "userInfo",
      "protectorInfo",
      "userPhone",
      "userId",
      "commonKey",
      "certificateId",
      "ageInfo",
      "pricedata"
    ];
    this.reset(resetFile);
    //调用生成随机数的方法
    this.getRamNumber();
    //获取url中的产品id和语言,将产品id和语言保存到vuex中
    this.productId = this.$route.params.productId;
    this.Language = this.$route.params.language;
    this.MerchantId = this.$route.params.merchantId;
    this.selectValue = this.Language == "eng" ? "English" : "繁體中文";
    this.setBeginProductId(this.productId);
    this.setProductId(this.productId);
    this.setLanguage(this.Language);
    this.setMerchantId(this.MerchantId);
    //保存session-id// this.rendomNum
    this.setSession(this.MerchantId + this.rendomNum); //merchant_id暫時寫死
    window.localStorage.setItem("lang", this.Language);
    //点击按钮用一下代码可以更换语言
    this.$i18n.locale =
      this.Language == "tc"
        ? (this.$i18n.locale = "tc")
        : (this.$i18n.locale = "eng");
    //判断PC端还是移动端
    this.IsPC();
  },
  async mounted() {
    //获取ip地址
    // try {
    //   const res = await this.$http.get("https://api.ipify.org");
    // } catch (error) {}
    //获取产品详情api
    var params = {
      language: this.Language,
      product_id: this.productId,
      phone_country_code: this.areacode,
      merchant_id: this.MerchantId
    };
    const loading = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    //显示加载动画
    loading.show();
    try {
      const res = await this.$http.post(
        "/wesupromo/web/tpc/getProductDetails",
        params
      );
      if (res.status == 100) {
        this.data = res.data;
        //数据加载完关闭加载动画
        this.$nextTick(() => {
          loading.hide();
        });
        this.setPlan(res.data.plan_list[0]);
        this.setName(res.data.name);
        this.setProductType(res.data.product_type);
        this.setPriceSymbol(res.data.currency_desc);
      }
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

    //获取cookie
    var uname = this.getCookie(this.productId);
    //如果cookie中没有name就设置一个并且调用接口
    if (uname == "" || uname != this.productId) {
      //获取随机生成的cookie
      var index = this.randomString(20);
      //调用储存点击量接口
      try {
        const res = await this.$http.post("/wesupromo/web/addClicks", {
          //trx_id: this.MerchantId + this.rendomNum,
          merchant_id: this.MerchantId,
          product_id: this.productId,
          device_session_id: index,
          device_platform: this.facility
        });
        //设置cookie
        //this.setCookie(this.productId, index, 86400); //cookie过期时间为一个30秒//86400一天
        this.setCookieFixed(this.productId, index, "00:00:00");
      } catch (error) {}
    } else {
    }
  },
  methods: {
    ...mapMutations([
      "setPlan",
      "setName",
      "reset",
      "setProductId",
      "setLanguage",
      "setSession",
      "setProductType",
      "setMerchantId",
      "setPriceSymbol",
      "setages",
      "setBeginProductId",
      "setfacility"
    ]),
    clickmore() {
      this.flag = !this.flag;
    },
    setPlanProductId(item) {
      this.setPlan(item);
      this.setProductId(item.product_id);
    },
    quato() {
      this.loading = true;
      this.agesInfo.max_age = this.data.max_age;
      this.agesInfo.max_persons = this.data.max_persons;
      this.agesInfo.max_pp_age = this.data.max_pp_age;
      this.agesInfo.min_age = this.data.min_age;
      this.agesInfo.min_pp_age = this.data.min_pp_age;
      this.setages(this.agesInfo);
      this.setfacility(this.facility);
      this.$router.push({ path: "/Travelinfo" });
    },
    //生成8位随机数,调接口把数据传给后端---------------------------
    getRamNumber() {
      var result = "";
      for (var i = 0; i < 8; i++) {
        result += Math.floor(Math.random() * 16).toString(16); //获取0-15并通过toString转16进制
      }
      //默认字母小写，手动转大写
      this.rendomNum = result.toUpperCase();
    },
    //判断是PC端还是移动端------------------------------------------
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          this.phoneType();
          break;
        }
      }
      if (flag) {
        this.facility = "PC";
      }
      return flag;
    },
    //判断用户移动端使用的系统平台--------------------------------
    phoneType() {
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        //安卓手机
        this.facility = "Android";
      } else if (u.indexOf("iPhone") > -1) {
        //苹果手机
        this.facility = "iPhone";
      } else if (u.indexOf("Windows Phone") > -1) {
        //winphone手机
        this.facility = "Windows Phone";
      } else if (u.indexOf("iPad") > -1) {
        //iPan
        this.facility = "tPC";
      }
    },
    //隐藏优惠券-----------------------------------------------
    hideDiscount() {
      this.isShow = false;
    },
    //生成随机cookie-----------------------------------
    randomString(STRlen) {
      var chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var string_length = STRlen;
      var randomstring = "";
      for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
      return randomstring;
    },
    //获取cookie-------------------------------------------------------
    getCookie(c_name) {
      let c_start = "";
      let c_end = "";
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
            c_end = document.cookie.length;
          }
          // return unescape(document.cookie.substring(c_start, c_end));
          return c_name;
        }
      }
      return "";
    },
    //设置cookie在指定的时间后失效
    // setCookie(c_name, value, expireseconds) {
    //   var exdate = new Date();
    //   exdate.setTime(exdate.getTime() + expireseconds * 1000);
    //   document.cookie =
    //     c_name +
    //     "=" +
    //     escape(value) +
    //     (expireseconds == null ? "" : ";expires=" + exdate.toGMTString());
    // },
    //设置cookie在指定的时间失效
    setCookieFixed(name, value, Deadline) {
      var curDate = new Date(); // 获取当前日期对象
      var curTime = curDate.getTime(); // 获取当前日期对应的时间戳
      var endTime = this.convertTime(curDate, Deadline); // 获取指定时间的时间戳

      var disTime = endTime - curTime; // 计算出指定时间与当前时间的时间差

      //如果指定日期为明天指定时间
      if (disTime < 0) {
        var tom_date = new Date(curTime + 1000 * 86400); //获取到明天的时间戳
        tom_date = this.getToday(tom_date); //转出YYYY-MM-DD
        endTime = new Date(`${tom_date} ${Deadline}`).getTime(); //转成时间戳
      }
      var exp = new Date();
      exp.setTime(endTime); // 设置cookie过期时间(endTime为时间戳)
      document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
    },
    // 获取指定时间的时间戳------------------------------------------
    convertTime(nowDate, Deadline) {
      // 分割参数Deadline
      var _dateArr = Deadline.split(":");
      // 分别获取参数中对应的时、分、秒
      var hours = parseInt(_dateArr[0]);
      var minutes = parseInt(_dateArr[1]);
      var seconds = parseInt(_dateArr[2]);
      // 设置对应时分秒
      nowDate.setHours(hours);
      nowDate.setMinutes(minutes);
      nowDate.setSeconds(seconds);
      // 获取当前天中指定时分秒对应的毫秒数
      var result = Date.parse(nowDate);
      return result;
    },
    // 获取当天的天数-------------------------------------------
    getToday(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    },
    //显示和隐藏产品说明--------------------------------------------
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
    //跳转到Coverage.vue---------------------------------------------
    toCoverage() {
      const { href } = this.$router.resolve({
        path: "/Coverage"
      });
      window.open(href, "_blank");
    },
    //变换语言
    change(value, index, text) {
      this.Language = localStorage.getItem("lang") || "tc";
      if (this.Language === "tc") {
        this.Language = "eng";
        this.$i18n.locale = this.Language;
      } else {
        this.Language = "tc";
        this.$i18n.locale = this.Language;
      }
      localStorage.setItem("lang", this.Language);
      this.$router.push(
        `/index/${this.MerchantId}/${this.productId}/${this.Language}`
      );
      window.location.reload();
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
    }
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
  .cubeSelect {
    position: absolute;
    margin-right: 34px;
    font-size: 26px;
    right: 0;
    width: 150px;
    background-color: #fff;
    color: rgb(109, 107, 107);
    cursor: pointer;
  }
  .title {
    color: rgb(155, 155, 155);
    font-size: 30px;
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
    margin: 30px 0px;
    img {
      width: 100%;
      height: 100%;
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
      width: 100%;
      height: 100%;
    }
  }
  .line {
    width: 100%;
    height: 5px;
    background-color: rgb(233, 233, 233);
    margin-top: 20px;
  }

  .cubeic-arrow {
    color: rgba(0, 0, 0, 0.25);
    font-size: 32px;
    font-weight: bold;
  }
  .buttons {
    line-height: 100px;
    display: flex;
    justify-content: space-around;
    margin: 12px 0 18px 0;
  }

  .btn {
    background: rgb(224, 223, 223);
    width: 260px;
    height: 65px;
    border-radius: 35px;
    color: rgb(177, 175, 175);
    font-weight: 550;
    font-size: 30px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .isActive {
    background: rgb(12, 129, 255);
    color: white;
  }

  .trip {
    color: rgb(12, 129, 255);
    font-weight: 500;
    font-size: 26px;
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
    cursor: pointer;
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
  .quato {
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
    position: fixed;
    z-index: 10;
    left: 50%;
    top: 50%;

    transform: translate(calc(-50% - 2px), calc(-50% - 2px));
    //padding: 30px;
    text-align: center;

    .discount_img_info {
      background: radial-gradient(
            circle at left bottom,
            transparent 26px,
            #fff 10px
          )
          top left,
        radial-gradient(circle at right bottom, transparent 26px, #fff 11px)
          right top;
      background-size: 50% 100%;
      background-repeat: no-repeat;
      position: relative;
      overflow: 1;
      z-index: 20;
      padding-top: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      h5 {
        color: #9d9d9d;
      }
      .product_logo_info {
        width: 300px;
        margin: 0 auto;
        position: relative;
        .product_logo {
          width: 300px;
          position: relative;
        }
      }

      .discount_info {
        color: #096398;
        font-size: 30px;
        padding-bottom: 20px;
        .product_img {
          height: 250px;
          width: 100%;
          overflow: hidden;
          img {
            width: 100%;
            position: relative;
            top: -20px;
          }
        }

        .product_title {
          padding: 0 10px;
          h3 {
            font-weight: bold;
            line-height: 50px;
          }
          p {
            font-weight: bold;
            line-height: 40px;
            margin-bottom: 25px;
          }
        }
      }
      span {
        position: relative;
        left: 30px;
        top: 0;
        display: block;
        width: 540px;
        height: 2px;
        border-bottom: 3px dashed #9d9d9d;
      }
    }

    .discount_btn_past {
      background-color: #fff;
      padding: 20px 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background: radial-gradient(
            circle at left top,
            transparent 26px,
            #fff 10px
          )
          top left,
        radial-gradient(circle at right top, transparent 26px, #fff 11px) right
          top;
      background-size: 50% 100%;
      background-repeat: no-repeat;
      position: relative;
      overflow: 1;
      z-index: 20;
      .discount_btn {
        width: 90%;
        height: 80px;
        margin: 0 auto;
        background-color: #49a152;
        border-radius: 20px;
        margin-bottom: 50px;
        line-height: 80px;
        color: #fff;
        font-size: 30px;
        cursor: pointer;
      }
      p {
        color: #535353;
        line-height: 30px;
      }
    }
    .hideLine {
      height: 100%;
      background-color: #fff;
      width: 100px;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 10;
    }
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
    .button-bar {
      width: 900px;
    }
  }
}
</style>