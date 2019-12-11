<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 10:30:48
 * @LastEditTime: 2019-12-11 10:29:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('firm_order_title')}}</p>
    </div>
    <div class="plan-item">
      <p class="plan">{{$t('firm_order_plan_name')}}</p>
      <p class="travelead">{{product_name}}</p>
    </div>

    <div class="pre-item">
      <div class="policy">
        <p class="premium">{{$t('firm_order_policy_year')}}</p>
        <p class="price">{{plan.plan_list_name}}</p>
      </div>
      <div class="baofei">
        <p class="premium">{{$t('firm_order_premium')}}</p>
        <p class="price">{{priceSymbol}}{{price}}</p>
      </div>
    </div>

    <div class="date">
      <span>
        <p class="date-title">{{$t('firm_order_star_date')}}</p>
        <p class="date-date">{{departureData}}</p>
      </span>
      <span>
        <p class="date-title">{{$t('firm_order_end_date')}}</p>
        <p class="date-date">{{returnData}}</p>
      </span>
      <span @click="back" class="edit">{{$t('firm_order_change')}}</span>
    </div>
    <!--雇佣信息 -->
    <div class="members">
      <span>
        <p class="memb">{{$t('employee')}}</p>
        <p>{{$t('Gender')}}</p>
        <p>{{$t('account_info_lastname2')}}</p>
        <p>{{$t('account_info_firstname2')}}</p>
        <p>{{$t('account_info_birthday')}}</p>
        <p>{{isHkid}}</p>
        <p>{{$t('hl_helper_desc5')}}</p>
        <p>{{$t('hl_helper_desc7')}}</p>
        <p>{{$t('HK_residential_address')}}</p>
      </span>
      <span class="members-right">
        <p @click="toMemberList" class="edit">{{$t('firm_order_change')}}</p>
        <p>{{helperInfo.userData.gender}}</p>
        <p>{{helperInfo.userData.Surname}}</p>
        <p>{{helperInfo.userData.Givenname}}</p>
        <p>{{helperInfo.userData.datebirth}}</p>
        <!-- HKID或者passport -->
        <p>{{HkidpassportData}}</p>
        <p>{{helperInfo.userData.Position}}</p>
        <p>{{helperInfo.userData.Nationality}}</p>
        <p>{{helperInfo.address.Territory}},{{helperInfo.address.District}}</p>
        <p>Block {{helperInfo.address.block}},{{helperInfo.address.floor}}/F,Room {{helperInfo.address.room}}</p>
        <p>{{helperInfo.address.building}}</p>
      </span>
    </div>
    <!-- 雇主信息 -->
    <div class="members">
      <span>
        <p class="memb">{{$t('dh_firm2')}}</p>
        <p>{{$t('account_info_lastname2')}}</p>
        <p>{{$t('account_info_firstname2')}}</p>
        <p>{{$t('account_info_birthday')}}</p>
        <p>{{$t('AreaCode')}}</p>
        <p>{{$t('AddEmergencyContact_ContactNumber')}}</p>
        <p>{{$t('login_email_r')}}</p>
      </span>
      <span class="members-right">
        <p @click="toEmployer" class="edit">{{$t('firm_order_change')}}</p>
        <p>{{protectorInfo.surname}}</p>
        <p>{{protectorInfo.givename}}</p>
        <p>{{protectorInfo.datebirth}}</p>
        <p>+{{areacode}}</p>
        <p>{{userPhone.mobile}}</p>
        <p>{{userPhone.email}}</p>
      </span>
    </div>

    <div class="button-bar">
      <button class="proceed" @click="confirm">{{$t('confirm')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      //定义一个变量来显示DepartureData
      departureData: "",
      //定义一个变量来显示returnData
      returnData: "",
      //定义一个属性来显示KHID或者passport
      isHkid: this.$t("account_info_hkid"),
      //价格
      price: "",
      //用来保存HKID或者passport
      HkidpassportData: "",
      key: "",
      loading: false
    };
  },
  created() {
    
    //页面加载获取vuex中的时间
    this.getData();
    //调用处理身份证和护照的函数
    this.HkidPassport();
  },
  computed: {
    ...mapState([
      "product_name",
      "product_id",
      "language",
      "plan",
      "userId",
      "policyDate",
      "helperInfo",
      "protectorInfo",
      "areacode",
      "priceSymbol",
      "userPhone",
      "productType",
      "maleData"
    ])
  },
  //过滤器:判断保单人是否存在,存在的话序号加2
  filters: {
    newIndex(val, val2) {
      if (val2 == true) {
        return val + 1;
      } else {
        return val;
      }
    }
  },
  methods: {
    ...mapMutations(["setCommonKey"]),
    //创建一个方法来从vuex中获取时间显示时间
    getData() {
      this.departureData = this.policyDate.departureDate;
      this.returnData = this.policyDate.returnDate;
    },
    //跳转到上一页
    toPrePage() {
      this.$router.push("/Summary");
    },
    //处理身份证和护照的显示-------------------------------------/////
    HkidPassport() {
      if (this.helperInfo.form.HKID1.trim() == "") {
        this.isHkid = this.$t("info_passport");
        this.HkidpassportData = this.helperInfo.form.HKID_passport;
      } else {
        this.HkidpassportData = this.helperInfo.form.HKID1;
      }
    },
    //点击编辑跳转到雇佣信息列表
    toMemberList() {
      this.$router.push({
        path: "/HelperDetails",
        query: { isChange: "true" }
      });
    },
    //点击编辑跳转到雇主信息列表
    toEmployer() {
      this.$router.push({
        path: "/Employer",
        query: { isChange: "true" }
      });
    },
    //
    back() {
      this.$router.push({
        path: "/Insurance",
        query: { isChange: "true" }
      });
    },
    confirm() {
      if (this.price) {
        this.loading = true;
        this.$router.push("/Payment");
      }else{
        //请求超时
        this.$createToast({
          txt: this.$t("request_error_content"),
          time: 3000,
          type: "txt"
        }).show();
      }
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
  //调用接口获取价格
  async mounted() {
    var toast = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    toast.show();
    //獲取公鑰
    try {
      const res = await this.$http.post("/wesupromo/web/getpublicKey", {
        id: this.userId
      });
      console.log(res);
      if (res.status == 100) {
        this.key = res.data.public_key;
        this.setCommonKey(res.data.public_key);
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
      return false
    }
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
      const res = await this.$http
        .post("/wesupromo/web/product/getquote", priceParams)
        this.price = res.data.premium;
        this.price = this.NumFormat(this.price);
        toast.hide()
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
  position: relative;
  padding-bottom: 60px;
  padding-top: 120px;
  .imgs {
    width: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
  }
  .plan-item {
    line-height: 40px;
    .plan {
      color: #9b9b9b;
      font-size: 26px;
    }
    .travelead {
      font-family: PingFangHK-Regular;
      font-size: 36px;
    }
  }
  .pre-item {
    line-height: 40px;
    margin-top: 40px;
    .policy {
      display: inline-block;
    }
    .baofei {
      margin-left: 100px;
      display: inline-block;
    }
    .premium {
      color: #9b9b9b;
      font-size: 26px;
      font-family: PingFangHK-Regular;
    }
    .price {
      color: @blue;
      font-weight: bold;
      font-size: 42px;
    }
  }
  .date {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;
    line-height: 45px;
    span {
      .date-title {
        color: #9b9b9b;
        font-size: 26px;
        font-family: PingFangHK-Regular;
      }
      .date-date {
        font-size: 30px;
      }
    }
    .edit {
      color: @blue;
      cursor: pointer;
      font-size: 26px;
    }
  }
  .members {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    font-size: 26px;
    span {
      line-height: 40px;
      .memb {
        color: #9b9b9b;
        margin-bottom: 20px;
      }
      .edit {
        margin-bottom: 20px;
        text-align: right;
        color: @blue;
        cursor: pointer;
      }
    }
    .members-right {
      text-align: right;
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