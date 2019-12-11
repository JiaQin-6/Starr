<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 10:30:48
 * @LastEditTime: 2019-12-11 18:17:22
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
      <p class="premium">{{$t('firm_order_premium')}}</p>
      <p class="price">{{priceSymbol}}{{price}}</p>
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
    <!-- 保单人信息 -->
    <WOrder
      v-if="isShow"
      :isProtector="true"
      :indexList="0"
      :userData="this.$store.state.protectorInfo"
    ></WOrder>
    <!-- 调用组件 -->
    <WOrder
      v-for="(item,index) in userInfo"
      :key="index"
      :isProtector="false"
      :indexList="index"
      :userData="item"
    ></WOrder>

    <div class="button-bar">
      <button class="proceed" @click="confirm">{{$t('confirm')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import WOrder from "components/WOrder.vue";
export default {
  components: {
    WOrder
  },
  data() {
    return {
      isShow: false,
      //定义一个变量来显示DepartureData
      departureData: "",
      //定义一个变量来显示returnData
      returnData: "",
      //价格
      price: "",
      key: "",
      loading: false
    };
  },
  created() {
    //如果vuex中有保单人数据
    if (this.$store.state.protectorInfo) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    //页面加载获取vuex中的时间
    this.getData();
  },
  computed: {
    ...mapState([
      "travelInfo",
      "product_name",
      "product_id",
      "language",
      "plan",
      "userId",
      "userInfo",
      "priceSymbol",
      "protectorInfo",
      "pricedata"
    ])
  },
  methods: {
    ...mapMutations(["setCommonKey"]),

    back() {
      this.$router.push({
        path: "/TravelInfo",
        query: { isChange: "true" }
      });
    },
    //创建一个方法来从vuex中获取时间显示时间
    getData() {
      this.departureData = this.$store.state.travelInfo.date.departureDate;
      this.returnData = this.$store.state.travelInfo.date.returnDate;
    },
    //跳转到上一页
    toPrePage() {
      if (this.protectorInfo) {
        this.$router.push("/Policyholder");
      } else {
        this.$router.push("/MemberData");
      }
    },
    //确认事件
    confirm() {
      if (this.price) {
        this.loading = true;
        this.$router.push("/Payment");
      }else {
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
      return false;
    }
    //获取价格
    let others_insured_list = [];
    const { count } = this.travelInfo;
    if (count.myself) {
      others_insured_list.push({ relation: "2001" });
    }
    if (count.spouse) {
      others_insured_list.push({ relation: "2002" });
    }
    if (count.child) {
      others_insured_list.push({ relation: "2003" });
    }
    if (count.friends) {
      others_insured_list.push({ relation: "2004" });
    }

    var priceParams = {
      product_id: this.plan.product_id,
      language: this.language,
      start_date: this.travelInfo.date.departureDate.replace(/\//g, "-"),
      end_date: this.travelInfo.date.returnDate.replace(/\//g, "-"),
      others_insured_list
    };
    //调用接口获取价格
    try {
      const res = await this.$http.post(
        "/wesupromo/web/product/getstarrquote",
        priceParams
      );
      this.price = res.data.premium;
      this.price = this.NumFormat(this.price);
      toast.hide();
    } catch (error) {
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
    }
    //调用接口获取价格
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
    .premium {
      font-size: 26px;
      color: #9b9b9b;
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
      font-size: 26px;
      color: @blue;
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