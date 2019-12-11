<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 12:19:42
 * @LastEditTime: 2019-12-11 11:25:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toInfoconfirm" class="cubeic-arrow"></i>
      <p></p>
    </div>
    <div class="header">
      <!-- <span>Fintech</span><span>travel.com</span> -->
      <!-- v-progressive="logo_icon" -->
      <p>
        {{productExplain.explain1}}
        <img
          src="../assets/images/icon_tu_info.png"
          @click="showHiddenExplain('show')"
        />
      </p>
      <img class="preview" :src="logo_icon" alt />
    </div>
    <p class="title">{{$t('login_welcome')}}</p>
    <p class="tip-text">{{$t('input_number_email')}}</p>
    <p class="label">{{$t('input_number')}}</p>
    <div class="flex ver-mid">
      <div class="area-wrap">
        <span class="areaCode">{{areaCode}}</span>
        <cube-select
          class="areaSelect"
          v-model="areaCode"
          placeholder=" "
          title=" "
          :cancelTxt="this.$t('cancel')"
          :confirmTxt="this.$t('confirm')"
          :options="areaOptions"
        >
          <span>1</span>
        </cube-select>
      </div>
      <cube-input
        @change="phoneChange"
        class="input-item"
        v-model="form.mobile"
        placeholder="8888 8888"
      ></cube-input>
    </div>
    <!-- 用来提示手机号输入错误信息 -->
    <p style="margin-top:10px;color:red;">{{mobileError}}</p>
    <p class="label" style="margin-top:30px">{{$t('login_email_1')}}</p>
    <cube-input
      @change="emailChange"
      class="input-item"
      v-model="form.email"
      placeholder="example@email.com"
    ></cube-input>
    <!-- 用来提示邮箱输入错误信息 -->
    <p style="margin-top:10px;color:red;">{{emailError}}</p>

    <div class="form-tip">{{$t('ePolicy')}}</div>
    <!-- <p class="tixing">
      {{$t('clickNext')}}
      <span @click="toTerms" class="terms">{{$t('otg_terms')}}</span>
      {{$t('and')}}
      <span @click="toPrivacy" class="privacy">{{$t('privacy_policies')}}</span> .
    </p>-->
    <div class="button-bar">
      <button @click="next" class="next">{{$t('info_doc_data_next')}}</button>
    </div>
    <!-- 显示说明 -->
    <div v-show="showExplain" class="popover_back"></div>
    <div v-show="showExplain" class="explain">
      <img :src="logo_icon" alt />
      <p>{{productExplain.explain2}}</p>
      <div @click="showHiddenExplain('hidden')" class="button_back">{{$t('btn_back')}}</div>
    </div>
    <!-- 底部 -->
    <!-- <div class="footer">
      <span class="Powered">Powered By</span>
      <span class="footerimgs progressive">
        <img class="footerimg" v-progressive="logoImgs.preview" :src="logoImgs.preview" alt />
      </span>
    </div>-->
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import http from "@/api/http";
//引入AES
//import { Decrypt, Encrypt } from "@/assets/js/utils.js";
export default {
  name: "Index",
  data() {
    return {
      imgs: {
        src: require("../assets/images/Fintechtravel.com@xxxhdpi.png"),
        preview: require("../assets/images/Fintechtravel.com@xxxhdpi.png")
      },
      //底部logo
      logoImgs: {
        src: require("../assets/images/loading photo@3x.png"),
        preview: require("../assets/images/Logo A@3x.png")
      },
      areaCode: "+852",
      areaOptions: [
        { value: "+852", text: "Hong Kong +852" },
        { value: "+63", text: "Philippine +63" },
        { value: "+62", text: "Indonesia +62" },
        { value: "+86", text: "China +86" }
      ],
      form: {
        mobile: "",
        email: ""
      },
      mobileError: "",
      emailError: "",
      //定义一个对象来保存输入的错误信息
      validateObj: {
        flag: true,
        msg: ""
      },
      showExplain: false,
      loading: false
    };
  },
  created() {
    //如果已经登录过就不显示这个页面
    if (this.userPhone) {
      for (var key in this.userPhone) {
        this.form[key] = this.userPhone[key];
      }
    }
  },
  computed: {
    ...mapState([
      "userPhone",
      "session_id",
      "logo_icon",
      "language",
      "productExplain"
    ])
  },
  mounted() {
    // Encrypt 加密
    //let a = Encrypt('123456');
    //console.log(a);
    // Decrypt 解密
    //let c = Decrypt('+5s4V1MeDYk1jpvfwJACJA==');
    //console.log(c);
  },
  methods: {
    ...mapMutations(["setAreacode", "setUserPhone", "setUser"]),
    //点击Next事件(检验输入的内容是否符合规定)
    next() {
      this.validate(); //最上面调用表单校验方法
      if (!this.validateObj.flag) {
        // 如果表单某项有错误则弹出toast 并带出错误信息this.validateObj.msg
        this.$createToast({
          txt: this.validateObj.msg,
          type: "txt"
        }).show();
        return false;
      }
      this.loading = true;
      //去掉"+"号
      this.areaCode = this.areaCode.replace("+", "");
      //参数
      const params = {
        phone: this.form.mobile,
        phone_country_code: this.areaCode,
        trx_id: this.session_id,
        email: this.form.email,
        language: this.language
      };
      this.$http
        .post("/wesupromo/web/add", params)
        .then(res => {
          if (res.status === 100) {
            console.log(res);
            window.sessionStorage.setItem("userId", res.data.id);
            this.setUser(res.data.id);
            //保存区号
            this.setAreacode(this.areaCode);
            //保存手机号和邮箱
            this.setUserPhone(this.form);
            this.$router.push({
              path: "/Prompt"
            });
          }
        })
        .catch(error => {
          this.loading = false;
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
    //检验表单输入的情况,把错误信息保存到定义的对象validateObj中
    validate() {
      this.validateObj = {
        flag: true,
        msg: ""
      };
      //检验手机号
      if (this.form.mobile == "") {
        this.validateObj.flag &&
          (this.validateObj = {
            flag: false,
            msg: this.$t("login_wel_content")
          });
      } else if (this.form.mobile != "") {
        const reg = /^1[3456789]\d{9}$/;
        if (this.areaCode == "+86") {
          //+86的区号,手机号需要11位数字
          !reg.test(this.form.mobile) &&
            this.validateObj.flag &&
            (this.validateObj = { flag: false, msg: this.$t("validPhone") });
        } else if (this.areaCode == "+852") {
          //+852的区号,手机号需要8位数字
          this.form.mobile.length != 8 &&
            this.validateObj.flag &&
            (this.validateObj = { flag: false, msg: this.$t("validPhone") });
        } else {
          //其他的区号手机号需要大于5位数字
          this.form.mobile.length <= 5 &&
            this.validateObj.flag &&
            (this.validateObj = { flag: false, msg: this.$t("validPhone") });
        }
      }
      //检验邮箱
      if (this.form.email == "") {
        this.validateObj.flag &&
          (this.validateObj = { flag: false, msg: this.$t("insurance_toast") });
      } else if (this.form.email != "") {
        const reg = /[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)/;
        !reg.test(this.form.email) &&
          this.validateObj.flag &&
          (this.validateObj = { flag: false, msg: this.$t("validEmail") });
      }
    },
    //跳转到指定页面
    toTerms() {
      this.$router.push("/Terms");
    },
    toPrivacy() {
      this.$router.push("/Policies");
    },
    //输入框改变数据
    phoneChange() {
      this.setUserPhone(this.form);
      console.log("phone改变");
    },
    emailChange() {
      this.setUserPhone(this.form);
      console.log("email改变");
    },
    toInfoconfirm() {
      this.$router.push("/Infoconfirm");
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 0px 50px 60px 50px;
  background: @background;
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
  .header {
    text-align: center;
    width: 100%;
    height: 300px;
    margin: 110px 0 0 0;
    p {
      text-align: left;
      font-size: 25px;
      color: rgb(155, 155, 155);

      img {
        width: 30px;
        vertical-align: bottom;
        cursor: pointer;
        margin-left: 15px;
      }
    }
    img {
      width: 500px;
      margin: 0 auto;
    }
  }
  .title {
    color: #000;
    font-weight: 600;
    font-size: 48px;
    line-height: 58px;
  }
  .tip-text {
    font-size: 32px;
    line-height: 41px;
    letter-spacing: 2px;
    color: @gray;
    margin-bottom: 102px;
    margin-top: 20px;
  }
  .label {
    font-size: 26px;
    letter-spacing: 1px;
    color: @gray;
    line-height: 28px;
    margin-bottom: 20px;
  }
  .area-wrap {
    position: relative;
    width: 160px;
    border-bottom: 4px solid #000;
    margin-right: 18px;
    .areaCode {
      position: absolute;
      height: 90px;
      right: 30px;
      left: 0;
      text-align: right;
      font-size: 44px;
      line-height: 90px;
      z-index: 1;
      color: #000;
    }
    .areaSelect {
      background: transparent;
      position: relative;
      z-index: 2;
      overflow: hidden;
      height: 90px;
      /deep/ .cube-select-text {
        color: transparent;
      }
      &::after {
        border: none;
      }
      /deep/ span {
        font-size: 44px;
        color: #000;
      }
      /deep/ .cube-select-icon {
        border-width: 10px 6px 0 6px !important;
        border-color: #000 transparent transparent;
      }
    }
  }
  .input-item {
    height: 91px;
    line-height: 70px;
    font-size: 40px;
    border-bottom: 4px solid #000;
    &::after {
      border: none;
    }
    /deep/ input {
      color: #000;
      padding: 0;
      height: 80px;
      padding-left: 20px;
      margin: 0;
    }
    /deep/ input::-webkit-input-placeholder {
      color: #9d9d9d;
      letter-spacing: 2px;
    }
  }
  .form-tip {
    margin-top: 6px;
    font-size: 20px;
    color: @gray;
    line-height: 24px;
  }
  .tixing {
    font-size: 26px;
    line-height: 24px;
    margin-top: 120px;
  }
  .terms {
    color: #0081ff;
    text-decoration: underline;
  }
  .privacy {
    color: #0081ff;
    text-decoration: underline;
  }
  .button-bar {
    text-align: center;
    //position: fixed;
    //bottom: 0;
    //left: 50%;
    //z-index: 88;
    width: 100%;
    height: 200px;
    //transform: translateX(-50%);
    //background-color: rgba(250, 250, 250);
    //border-top: 3px solid rgba(211, 209, 209, 0.25);
    margin-top: 40px;
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
    padding: 50px 30px;
    img {
      width: 60%;
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
  .next {
    height: 100px;
    width: 500px;
    padding: 0 30px;
    line-height: 100px;
    border: none;
    border-radius: 10px;
    margin-top: 50px;
    background: rgb(2, 164, 71);
    color: #fff;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
  }
  .footer {
    text-align: center;
    vertical-align: middle;
    .Powered {
      display: inline-block;
      font-size: 25px;
      font-weight: bold;
      margin-top: 100px;
      margin-left: -75px;
      color: rgb(88, 89, 94);
    }
    .footerimgs {
      display: inline-block;
      vertical-align: middle;
      width: 312px;
      height: 94px;
      line-height: 50px;
    }
    .footerimg {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      height: 100%;
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
