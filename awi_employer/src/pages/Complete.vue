<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 10:37:02
 * @LastEditTime: 2019-12-11 10:37:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="finish-item">
      <p class="done-img">
        <img src="@/assets/images/done@3x.png" alt />
      </p>
      <p>{{$t('travel_successful_title')}}</p>
    </div>

    <div class="email-item">
      <span class="email-img">
        <img src="@/assets/images/Email@3x.png" alt />
      </span>
      <span class="email-info">
        <p>{{$t('issurer_emailed')}}</p>
        <!-- <p>GoLion will send you the Acknowlegement email, we recommend you to download our App for more features!</p> -->
      </span>
    </div>
    <div class="line"></div>
    <div class="listNumber">
      <h5>{{$t('policy_number')}}</h5>
      <p>{{listNumber}}</p>
      <a class="loading" :href="listPdf" target="_blank">
        <img src="../assets/images/confirmationOfCover@3x.png" alt />
        <span>{{$t('confirm_of_cover')}}</span>
        <img src="../assets/images/download@xxxhdpi.png" alt />
      </a>
    </div>
    <div class="finish-bottom">{{$t('agree_acknowledge')}}</div>
    <div v-show="showExplain" class="popover_back"></div>
    <div class="explain" :class="{show:showExplain == true,hide:showExplain == false,}">
      <div class="cancel">
        <img @click="showExplain = !showExplain" src="../assets/images/cancel.png" alt />
      </div>
      <div class="main">
        <div class="model_img">
          <img src="../assets/images/model.png" alt />
        </div>
        <div class="loadingApp">
          <p>Free Medical Hotline during your trip? Get it now!</p>
          <div>
            <img src="../assets/images/wesuranse 3-01@3x.png" alt />
            <span>GET</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="button-bar">
      <button @click="toIndex" class="proceed">Finish</button>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      listNumber: "",
      listPdf: "",
      showExplain: false
    };
  },
  created() {
    const toast = this.$createToast({
      time: 1000,
      txt: this.$t("loading")
    });
    toast.show();
  },

  methods: {
    // toIndex(){
    //  this.$router.push(
    //   `/index/${this.MerchantId}/${this.beginProductId}/${this.language}`
    // );
    // }
    // GetRequest() {
    //   var url = location.search;
    //   //获取url中"?"符后的字串
    //   var theRequest = new Object();
    //   if (url.indexOf("?") != -1) {
    //     var str = url.substr(1);
    //     strs = str.split("&");
    //     for (var i = 0; i < strs.length; i++) {
    //       theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    //     }
    //   }
    //   return theRequest;
    // }
  },
  async mounted() {
    const timer = setTimeout(() => {
      this.showExplain = true;
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
    //获取订单号接口
    try {
      const res = await this.$http.post("/wesupromo/web/guaranteeBook", {
        //trx_id: this.session_id,
        application_id: this.$route.query.Ref//localStorage.getItem("Ref")
      });
      this.listNumber = res.data.awi_policy_no;
      this.listPdf = res.data.policy_link;
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
.page-wrap {
  padding: 34px;
  background: @background;
  .imgs {
    width: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
  }
  .finish-item {
    text-align: center;
    margin-top: 200px;
    .done-img {
      width: 170px;
      height: 170px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      color: @blue;
      font-size: 50px;
      margin-top: 30px;
    }
  }
  .email-item {
    display: flex;
    justify-content: space-around;
    margin-top: 200px;
    .email-img {
      width: 120px;
      height: 120px;
      margin-left: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .email-info {
      flex: 1;
      margin-left: 30px;
      line-height: 25px;
      letter-spacing: 1px;
      margin-top: 30px;
      p {
        color: rgb(0, 129, 255);
        font-size: 26px;
      }
    }
  }
  .line {
    background-color: #ccc;
    width: 100%;
    height: 2px;
    margin-top: 50px;
  }
  .listNumber {
    h5 {
      color: #9d9d9d;
      text-align: center;
      margin-top: 50px;
      font-size: 25px;
    }
    p {
      text-align: center;
      font-size: 35px;
      font-weight: bold;
      margin-top: 30px;
    }
    .loading {
      width: 100%;
      border-radius: 100px;
      height: 100px;
      border: 3px solid #0083ff;
      margin-top: 50px;
      color: #0083ff;
      text-align: center;
      line-height: 100px;
      font-size: 30px;
      display: inline-block;

      img {
        width: 55px;
        vertical-align: middle;
        padding: 0 50px;
      }
      span {
        font-weight: bold;
      }
    }
  }
  .finish-bottom {
    color: rgb(74, 74, 74);
    text-align: center;
    font-size: 26px;
    line-height: 30px;
    padding-top: 100px;
    padding-bottom: 100px;
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
    width: 100%;
    height: 0px;
    position: fixed;
    z-index: 888;
    left: 0;
    bottom: 0;
    background-color: #fff;
    padding: 0 30px;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    border: 1px solid #ccc;
    opacity: 1;
    transition: height linear 1s;

    .cancel {
      height: 50px;
      text-align: right;
      margin-top: 20px;
      margin-bottom: 20px;
      img {
        height: 100%;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      margin-bottom: 20px;
      .model_img {
        width: 50%;
        height: 100%;
        img {
          width: 100%;
          height: 500px;
        }
      }
      .loadingApp {
        width: 50%;
        padding: 20px 20px;
        p {
          color: #000;
          font-weight: bold;
          font-size: 38px;
          text-align: center;
          margin-bottom: 50px;
          margin-top: 30px;
        }
        img {
          width: 35%;
          padding: 10px;
          box-sizing: border-box;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
          border-radius: 25px;
          margin-left: 30px;
        }
        span {
          background-color: #0083ff;
          color: #fff;
          width: 35%;
          display: inline-block;
          height: 38px;
          vertical-align: bottom;
          text-align: center;
          line-height: 38px;
          border-radius: 38px;
          margin-left: 30px;
          margin-bottom: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .hide {
    height: 0;
  }
  .show {
    height: 680px;
  }
  .button-bar {
    margin: 0 auto;
    height: 240px;
    text-align: center;
    margin: 54px -34px -34px;
    background-color: rgba(250, 250, 250);
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid rgba(151, 151, 151, 0.5);
  }
  .proceed {
    width: 388px;
    height: 130px;
    line-height: 130px;
    border: none;
    border-radius: 10px;
    background: rgb(2, 164, 71);
    color: #fff;
    text-align: center;
    font-size: 36px;
  }
}
//媒体查询
@media screen and (min-width: 1050px) {
  .page-wrap {
    width: 900px;
    margin: 0 auto;
    box-sizing: border-box;
    .popover_back {
      width: 900px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .explain {
      width: 900px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>