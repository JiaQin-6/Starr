<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 10:34:42
 * @LastEditTime: 2019-12-11 18:34:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('menu_payment')}}</p>
      <i @click="toIndex" class="cancal">×</i>
    </div>
    <div class="helperInsurance">{{category_name}}</div>
    <div class="travelead">{{product_name}}</div>
    <div class="date">
      <span>
        <p class="date-title">{{$t('products_departure_data')}}</p>
        <!-- <p class="date-date">{{$store.state.travelInfo.date.departureDate}}</p> -->
        <p class="date-date">{{policyDate.departureDate}}</p>
      </span>
      <span>
        <p class="date-title">{{$t('firm_order_end_date')}}</p>
        <!-- <p class="date-date">{{$store.state.travelInfo.date.returnDate}}</p> -->
        <p class="date-date">{{policyDate.returnDate}}</p>
      </span>
    </div>
    <!-- 显示客户姓名和成年还是child -->
    <div class="customer">
      <span class="userName">
        <!-- 如果保单人就要加一个保单人的而外信息 -->
        <p>{{protectorInfo.givename}} {{protectorInfo.surname}}</p>
      </span>
      <!-- <span class="customer-type"> -->
      <!-- {{$store.state.protectorInfo.title}} -->
      <!-- <p>{{$t('ship_myself')}}</p>
      </span>-->
    </div>
    <!-- 优惠券 -->
    <div class="coupon">
      <p>{{$t('home_bottom_v')}}</p>
      <div class="input">
        <input type="text" :placeholder="$t('account_coupon_promo1')" v-model="discount" />
        <span @click="getDiscount">{{$t('account_coupon_promo')}}</span>
      </div>
      <div class="couponInfo">{{voucher_name}}</div>
    </div>
    <div class="subtotalPrice">
      <span>
        <p class="subTotal">{{$t('travel_checkout_subtotal')}}</p>
        <p>
          {{$t('levy')}}
          <a target="_blank" :href="url.levy" class="collection">{{$t('moreLevy')}}</a>
        </p>
        <p>{{$t('coupon_title')}}</p>
      </span>
      <span class="price">
        <p>{{this.priceSymbol}}{{data.premium}}</p>
        <p>{{this.priceSymbol}}{{data.levy}}</p>
        <p>{{this.priceSymbol}}{{discount_price}}</p>
      </span>
    </div>

    <div class="total-item">
      <span class="total">{{$t('travel_checkout_total')}}</span>
      <span class="totalprice">{{this.priceSymbol}}{{totalPrice}}</span>
    </div>

    <!-- 单选 -->
    <div class="radio">
      <span @click="clickRadio" :class="{'checked':true, 'selected':checked}"></span>
      <p class="agreed">
        {{$t('agreed_confirm')}}
        <a
          :href="url.declarations"
          target="_blank"
          class="declaration"
        >{{$t('we_travel_declarations')}}</a>
        {{$t('and')}}
        <a
          :href="url.pics"
          target="_blank"
          class="declaration"
        >{{$t('FillInfo_Email_Desc2')}}.</a>
      </p>
    </div>
    <!-- <p @click="showPayMethod" class="payment-method">{{$t('confirm_payment')}}</p> -->
    <div class="button-bar">
      <button @click="checkOut" class="proceed">{{$t('Checkout')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>
<script>
//导入vuex
import { mapState, mapMutations } from "vuex";
//导入图片
import img1 from "../assets/images/mastercard@3x.png";
import img2 from "../assets/images/visa@3x.png";
import img3 from "../assets/images/150px-American_Express_logo_(2018).svg@3x.png";
import img4 from "../assets/images/JCB_logo.svg@3x.png";
import img5 from "../assets/images/download@3x.png";
//RSA加密
import JSEncrypt from "jsencrypt/bin/jsencrypt";
export default {
  data() {
    return {
      count: {
        confirm: 0
      },
      data: "",
      //价格
      price: "",
      //控制阅读是否勾选
      checked: false,
      //控制支付框的显示
      isShow: false,
      //聲明和收集個人資料聲明url
      url: {
        declarations: "",
        levy: "",
        pics: ""
      },
      //保存重新組織后的被保人和自己的信息
      totalInfo: [],
      web_policy_holder: {},
      totalPrice: "",
      rendomNum: "",
      discount_price: "",
      loading: false,
      discount: "",
      voucher_name: this.$t("travel_promotion_coupon_none"),
      uploadDiscount: ""
    };
  },
  created() {
    this.getRamNumber(); //生成随机数
    //获取受保人的信息
    var userObject = {};
    userObject.doc_firstname = this.toEncryption(
      this.helperInfo.userData.Givenname
    );
    userObject.doc_surname = this.toEncryption(
      this.helperInfo.userData.Surname
    );
    //判斷是HKID還是passport
    if (this.helperInfo.form.HKID_passport != "") {
      userObject.doc_type = "passport";
      userObject.doc_id = this.toEncryption(this.helperInfo.form.HKID_passport);
    } else {
      userObject.doc_type = "idcard";
      userObject.doc_id = this.toEncryption(
        `${this.helperInfo.form.HKID1}(${this.helperInfo.form.HKID2})`
      );
    }
    //出生日期
    userObject.dob = this.helperInfo.userData.datebirth;
    //判斷性別
    switch (this.helperInfo.userData.gender) {
      case "Male":
        userObject.title = "Mr.";
        break;
      case "Female":
        userObject.title = "Ms.";
        break;
      case "男":
        userObject.title = "Mr.";
        break;
      case "女":
        userObject.title = "Ms.";
        break;
    }
    this.totalInfo.push(userObject);
    //获取投保人信息
    this.web_policy_holder.doc_firstname = this.toEncryption(
      this.protectorInfo.givename
    );
    this.web_policy_holder.doc_surname = this.toEncryption(
      this.protectorInfo.surname
    );
    //判斷是HKID還是passport
    if (this.protectorInfo.HKID_passport != "") {
      this.web_policy_holder.doc_type = "passport";
      this.web_policy_holder.doc_id = this.toEncryption(
        this.protectorInfo.HKID_passport
      );
    } else {
      this.web_policy_holder.doc_type = "idcard";
      this.web_policy_holder.doc_id = this.toEncryption(
        `${this.protectorInfo.HKID1}(${this.protectorInfo.HKID2})`
      );
    }
    //出生日期
    this.web_policy_holder.dob = this.protectorInfo.datebirth;
    //判斷性別
    switch (this.protectorInfo.gender) {
      case "Male":
        this.web_policy_holder.title = "Mr.";
        break;
      case "Female":
        this.web_policy_holder.title = "Ms.";
        break;
      case "男":
        this.web_policy_holder.title = "Mr.";
        break;
      case "女":
        this.web_policy_holder.title = "Ms.";
        break;
    }
  },
  methods: {
    ...mapMutations(["setAPPID"]),
    //随机生成数值
    getRamNumber() {
      var result = "";
      for (var i = 0; i < 16; i++) {
        result += Math.floor(Math.random() * 16).toString(16); //获取0-15并通过toString转16进制
      }
      //默认字母小写，手动转大写
      this.rendomNum = result.toUpperCase(); //另toLowerCase()转小写
    },
    clickRadio() {
      this.checked = !this.checked;
    },
    //显示支付方式
    showPayMethod() {
      this.isShow = true;
    },
    //点击checkout按钮事件
    async checkOut() {
      //var hasInfo = this.hasCardInfo();
      //判断是否勾选了
      if (this.checked != true) {
        this.$createToast({
          txt: this.$t("UNcheck"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      } else if (!this.data.premium) {
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
            txt: this.$t("request_error_content"),
            time: 3000,
            type: "txt"
          }).show();
          return false;
        }
      } else {
        this.loading = true;
        //調用支付接口
        var totalInfo2 = JSON.parse(JSON.stringify(this.totalInfo));
        var paymentParams = {
          application_id: "mw_" + this.rendomNum,
          trx_id: this.session_id, //index的session-id(0123456789)
          product_id: this.plan.product_id,
          id: this.userId,
          emyer_addr1: this.userAddress.building,
          // emyer_addr2: "Telegraph Bay",
          emyer_hk_territory: this.userAddress.Territory,
          emyer_hk_district: this.userAddress.District,
          emyer_room: this.userAddress.room,
          emyer_block: this.userAddress.block,
          emyer_floor: this.userAddress.floor,
          industry: this.userAddress.Industry,
          addr1: this.helperInfo.address.building,
          // addr2: "Telegraph Bay",
          hk_district: this.helperInfo.address.District,
          hk_territory: this.helperInfo.address.Territory,
          room: this.helperInfo.address.room,
          block: this.helperInfo.address.block,
          floor: this.helperInfo.address.floor,
          nation: this.helperInfo.userData.Nationality, //国家
          position: this.helperInfo.userData.Position,
          operation: this.productType,
          start_date: this.policyDate.departureDate.replace(/\//g, "-"),
          is_rejected_or_speical_terms_insurance:
            this.maleData[0].content == "Yes" ? true : false,
          is_any_medical_action:
            this.maleData[1].content == "Yes" ? true : false,
          web_policy_holder: this.web_policy_holder, //投保人信息
          others_insured_list: totalInfo2, //受保人信息
          //以下这个参数starr有
          device_session_id: this.getCookie(this.beginProductId), //cookie
          merchant_id: this.MerchantId
        };
        try {
          const res = await this.$http.post(
            "/wesupromo/web/checkout/purchasebytng",
            paymentParams
          );
          if (res.status == 100) {
            this.setAPPID("mw_" + this.rendomNum);
            window.location.href = res.data.checkout_url;
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
      }
    },
    //点击感叹号显示提示
    hint() {
      this.$createDialog({
        type: "alert",
        confirmBtn: {
          text: this.$t("confirm"),
          active: true,
          href: "javascript:;"
        },
        content: this.$t("checkout_no_levy")

        // '如有查询，请联络Starr:<a href="mailto:(852)37655566/cs.hk@starrcompanies.com">(852)37655566/cs.hk@starrcompanies.com</a>(办公时间：星期一至星期五，上午9:00至12:30；下午1:30至下午5:00)',
      }).show();
    },
    //跳转到上一页
    toPrePage() {
      this.$router.push("/ConfirmOrder");
    },
    //跳转到首页
    toIndex() {
      this.$router.push(
        `/index/${this.MerchantId}/${this.product_id}/${this.language}`
      );
    },
    //获取cookie-------------------------------------------------
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
          return unescape(document.cookie.substring(c_start, c_end));
          // return c_name;
        }
      }
      return "";
    },
    //封裝一個加密方法
    toEncryption(value) {
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      let publicKey = this.commonKey; //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
      encryptor.setPublicKey(publicKey); // 设置公钥
      let rsaPassWord = encryptor.encrypt(value); // 对需要加密的数据进行加密

      return rsaPassWord;
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
    },
    async getDiscount() {
      if (!this.discount) {
        this.discount = "";
        this.voucher_name = this.$t("travel_promotion_coupon_none");
        this.discount_price = this.NumFormat(0);
        this.totalPrice =
          Math.floor(
            (Number(this.data.levy) +
              Number(this.data.premium) -
              Number(this.discount_price)) *
              100
          ) / 100;
        this.totalPrice = this.NumFormat(this.totalPrice);
        this.$createToast({
          txt: this.$t("insurance_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }

      try {
        const res = await this.$http.post("/wesupromo/web/getVoucherCoupon1", {
          voucher_promocode: this.discount,
          language: this.language
        });
        if (res.data.voucher_type == 840) {
          this.uploadDiscount = this.discount; //如果成功折扣
          //固定金额
          this.voucher_name = res.data.voucher_name;
          this.discount_price = res.data.voucher_discount;
          this.totalPrice =
            Math.floor(
              (Number(this.data.levy) +
                Number(this.data.premium) -
                Number(this.discount_price)) *
                100
            ) / 100;
        } else if (res.data.voucher_type == 843) {
          this.uploadDiscount = this.discount; //如果成功折扣
          //折扣
          this.voucher_name = res.data.voucher_name;
          this.discount_price =
            Math.floor(
              this.data.premium * (1 - res.data.voucher_discount) * 100
            ) / 100;
          this.totalPrice =
            Math.floor(
              (Number(this.data.levy) +
                Number(this.data.premium) -
                Number(this.discount_price)) *
                100
            ) / 100;
        }
        this.discount_price = this.NumFormat(this.discount_price);
        this.totalPrice = this.NumFormat(this.totalPrice);
      } catch (error) {
        this.discount = "";
        this.voucher_name = this.$t("travel_promotion_coupon_none");
        this.discount_price = this.NumFormat(0);
        this.totalPrice =
          Math.floor(
            (Number(this.data.levy) +
              Number(this.data.premium) -
              Number(this.discount_price)) *
              100
          ) / 100;
        this.totalPrice = this.NumFormat(this.totalPrice);
        console.log(this.totalPrice);
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
    }
  },
  //使用计算属性实现成员是adult还是child
  computed: {
    ...mapState([
      "product_name",
      "product_id",
      "language",
      "plan",
      "areacode",
      "userId",
      "productType",
      "session_id",
      "commonKey",
      "priceSymbol",
      "policyDate",
      "category_name",
      "MerchantId",
      "helperInfo",
      "policyDate",
      "protectorInfo",
      "userAddress",
      "maleData",
      "beginProductId"
    ])
  },
  async mounted() {
    const toast = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    toast.show();
    //获取价格
    var priceParams = {
      id: this.userId,
      product_id: this.plan.product_id,
      operation: this.productType, //默认
      adults_no: "1", //默认
      child_no: "0", //默认
      start_date: this.policyDate.departureDate.replace(/\//g, "-"),
      period_value: this.plan.period_value
    };
    try {
      //调用接口获取价格
      const res = await this.$http.post(
        "/wesupromo/web/product/getquote",
        priceParams
      );
      console.log(res);
      this.data = res.data;
      this.discount_price = res.data.discount ? res.data.discount : 0;
      console.log(this.discount_price);

      this.totalPrice =
        this.data.levy + this.data.premium - this.discount_price;
      this.data.levy = this.NumFormat(this.data.levy);
      this.data.premium = this.NumFormat(this.data.premium);
      this.discount_price = this.NumFormat(Number(this.discount_price));
      this.totalPrice = this.NumFormat(this.totalPrice);
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
      return false;
    }
    try {
      //获取产品详情
      var params = {
        language: this.language,
        product_id: this.product_id,
        phone_country_code: this.areacode,
        merchant_id: this.MerchantId
      };
      const res = await this.$http.post(
        "/wesupromo/web/tpc/getProductDetails",
        params
      );
      if (res.status == 100) {
        toast.hide();
        this.url.declarations = res.data.declarations_url;
        this.url.levy = res.data.levy_url;
        this.url.pics = res.data.pics_url;
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
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 34px;
  background: @background;
  padding-top: 150px;

  .imgs {
    width: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
  }
  .helperInsurance {
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    font-size: 35px;
  }
  .travelead {
    text-align: center;
    color: @blue;
    font-size: 35px;
  }
  .date {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgb(209, 208, 208);
    border-bottom: 1px solid rgb(209, 208, 208);
    line-height: 60px;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 50px;
    span {
      .date-title {
        color: rgb(74, 74, 74);
        font-size: 26px;
      }
      .date-date {
        font-size: 30px;
        color: rgb(155, 155, 155);
      }
    }
  }
  .customer {
    line-height: 50px;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 20px;
    padding-top: 20px;
    text-align: center;
    font-size: 26px;
    text-align: center;
    .userName {
      p {
        color: rgb(74, 74, 74);
        font-size: 30px;
      }
    }
    .customer-type {
      color: rgb(155, 155, 155);
    }
  }
  .coupon {
    p {
      font-size: 28px;
      color: #ccc;
    }
    .input {
      font-size: 0;
      width: 100%;
      position: relative;
      margin-top: 20px;
      line-height: 80px;
      input {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 80px;
        border: 2px solid #ccc;
        box-sizing: border-box;
        font-size: 28px;
        padding-left: 20px;
        border-radius: 10px;
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
      span {
        display: inline-block;
        position: absolute;
        right: 0;
        width: 130px;
        height: 80px;
        background-color: @blue;
        color: #fff;
        vertical-align: top;
        border-radius: 10px;
        font-size: 28px;
        text-align: center;
        cursor: pointer;
      }
    }
    .couponInfo {
      height: 80px;
      width: 100%;
      font-size: 28px;
      box-sizing: border-box;
      padding-left: 10px;
      border: 2px solid #ccc;
      line-height: 80px;
      color: @blue;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
    }
  }
  .subtotalPrice {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #9fbcd1;
    border-bottom: 1px solid #9fbcd1;
    padding-top: 50px;
    padding-bottom: 15px;
    span {
      .subTotal {
        color: rgb(74, 74, 74);
        font-size: 29px;
        font-family: HelveticaNeue-Medium;
        letter-spacing: 0.05px;
      }
      p {
        margin-top: 20px;
        color: rgb(74, 74, 74);
        font-size: 26px;
        .collection {
          color: @blue;
        }
      }
    }
    .price {
      text-align: right;
      p {
        color: rgb(24, 95, 146);
        font-size: 29px;
      }
    }
  }
  .total-item {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;

    .total {
      color: rgb(74, 74, 74);
      font-size: 29px;
      font-family: HelveticaNeue-Medium;
      letter-spacing: 0.05px;
    }
    .totalprice {
      color: rgb(24, 95, 146);
      font-size: 29px;
    }
  }

  .radio {
    display: flex;
    padding-bottom: 150px;
    height: 60px;
    span {
      &.checked {
        display: inline-block;
        width: 50px;
        box-sizing: border-box;
        height: 50px;
        border: 1px solid #888;
        background: none;
        border-radius: 50%;
        background: url("../assets/images/TickOff@3x.png") no-repeat center
          center/44px 44px;
        cursor: pointer;
      }
      &.selected {
        border: none;
        border-radius: 0;
        background: url("../assets/images/Tick@3x.png") no-repeat center
          center/50px 50px;
      }
    }
    .agreed {
      flex: 1;
      margin-left: 40px;
      color: @gray;
      line-height: 30px;
      font-size: 27px;
      // text-align: justify;
      .declaration {
        // text-decoration: underline;
        color: @blue;
      }
    }
  }
  .payment-method {
    font-size: 30px;
    color: rgb(74, 74, 74);
    font-family: HelveticaNeue-Medium;
    margin-top: 25px;
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
      margin-top: 30px;
    }
    .cancal {
      position: absolute;
      right: 0;
      height: 100%;
      line-height: 100px;
      width: 50px;
      font-size: 52px;
      color: rgb(0, 122, 255);
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
  width: 630px;
  height: 830px;
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% - 1px), calc(-50% - 1px));
  background-color: #fff;
  border-radius: 25px;
  padding: 30px;
  .choose_card {
    width: 100%;
    height: 35px;
    font-size: 30px;
    line-height: 35px;
    color: rgb(74, 74, 74);
    font-weight: bold;
  }
  .pay_img {
    width: 100%;
    padding: 5px;
    overflow: hidden;
    margin-bottom: 10px;
    .pay_radio {
      width: 100%;
      margin-top: 20px;
      .input_radio {
        float: left;
        width: 33.33%;
        padding: 0;
      }
      .bank_card {
        width: 100px;
        height: 100px;
        margin-left: 15px;
      }
    }
  }
  .pay_inform {
    padding: 0 15px;
    .cardHolderName {
      .cardName {
        height: 20px;
        width: 100%;
        margin: 10px 0 8px 0;
        line-height: 20px;
      }
      .car_input {
        height: 60px;
        width: 100%;
        border: 2px solid rgba(151, 151, 151, 1);
        margin: 0;
      }
    }
    .cardNumber {
      .left {
        float: left;
        .Expiration {
          display: inline-block;
          .cardName {
            height: 20px;
            width: 100%;
            margin: 10px 0 8px 0;
            line-height: 20px;
          }
          .car_input {
            height: 60px;
            width: 100px;
            border: 2px solid rgba(151, 151, 151, 1);
            margin: 0;
          }
        }
        .data {
          display: inline-block;
          .cardName {
            height: 20px;
            width: 100%;
            margin: 10px 0 8px 0;
            line-height: 20px;
          }
          .car_input {
            height: 60px;
            width: 100px;
            border: 2px solid rgba(151, 151, 151, 1);
            margin: 0;
          }
        }
      }
      .right {
        float: right;
        .cardName {
          height: 20px;
          width: 100%;
          margin: 10px 0 8px 0;
          line-height: 20px;
        }
        .car_input {
          height: 60px;
          width: 200px;
          border: 2px solid rgba(151, 151, 151, 1);
          margin: 0;
        }
      }
    }
  }
  .line {
    height: 3px;
    width: 100%;
    background-color: rgba(151, 151, 151, 1);
    position: absolute;
    bottom: 150px;
    left: 0;
  }
  .payButton {
    position: absolute;
    bottom: 33px;
    left: 0;
    width: 100%;
    height: 80px;
    .buttonCancel {
      display: inline-block;
      width: 40%;
      height: 80px;
      border: 0;
      font-size: 33px;
      color: #fff;
      background-color: rgb(74, 74, 74);
      border-radius: 15px 15px;
      margin-left: 50px;
    }
    .buttonConfirm {
      display: inline-block;
      width: 40%;
      border: 0;
      height: 80px;
      font-size: 33px;
      color: #fff;
      margin-left: 30px;
      background-color: #02a447;
      border-radius: 15px 15px;
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