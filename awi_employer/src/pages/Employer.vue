<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:35:18
 * @LastEditTime: 2019-12-11 10:33:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- Myself -->
  <div class="contain">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('dh_helper_pa_desc1')}}</p>
    </div>
    <div class="form-wrap">
      <div class="title">{{$t('dh_helper_pa_desc1')}}</div>
      <div ref="inputInfo">
        <!-- 用户信息输入框 -->
        <div class="form-item">
          <p>{{$t('sex_title_1')}}</p>
          <!-- @blur="genderBlur" -->
          <div
            @click="showPicker"
            :class="{blank:this.form.gender!='Gender'}"
            class="GenderDiv"
            ref="Gender"
          >{{this.form.gender}}</div>
        </div>
        <div class="form-item">
          <p>{{$t('Surname')}}</p>
          <!-- @blur="SurnameBlur" -->
          <input class="Gender" v-model="form.surname" type="text" placeholder="Surname" />
        </div>

        <div class="form-item">
          <p>{{$t('Given_Name')}}</p>
          <!-- @blur="givenameBlur" -->
          <input class="Gender" v-model="form.givename" type="text" placeholder="Given Name" />
        </div>
        <!-- 日期插件 -->
        <div class="form-item">
          <p>{{$t('Date_of_Birth')}}</p>
          <!-- @blur="birthDateBlur" -->
          <div
            ref="inputBirth"
            :class="{blank:form.datebirth!='Date of birth'}"
            class="GenderDiv"
            @click="showDatePicker"
          >{{form.datebirth}}</div>
        </div>

        <!-- 选择HKID按钮和passport Number按钮 -->
        <div>
          <button class="HKID" @click="inputHkid" :class="[select==1?'blue':'']">
            {{$t('personal_hkid')}}
            <i :class="[select==1?'cubeic-ok':'']"></i>
          </button>
          <button class="passport" @click="inputPassport" :class="[select==2?'blue':'']">
            {{$t('info_passport')}}
            <i :class="[select==2?'cubeic-ok':'']"></i>
          </button>
        </div>
        <!-- 输入框 -->
        <div class="HK">
          <span
            class="hkNumber"
          >{{select==1?`${$t('account_info_hkid')}:`:`${$t('info_passport')}:`}}</span>
          <div class="right" v-show="select == 1">
            <span>
              <!-- @blur="HkidBlur" -->
              <input
                v-model="form.HKID1"
                class="IDnumber"
                ref="HKID1"
                type="text"
                placeholder="A123456"
              />
            </span>
          </div>
          <div class="right" v-show="select == 2">
            <span>
              <!--  @blur="passportBlur" -->
              <input
                ref="HKID_passport"
                v-model="form.HKID_passport"
                class="IDnumber"
                type="text"
                placeholder="A123456"
              />
            </span>
          </div>
        </div>
        <div class="remark" v-show="select==1? true:false" style="color:rgb(74, 74, 74)">
          <p>{{$t('card_hk_desc')}}</p>
        </div>
      </div>
    </div>
    <div class="button-bar">
      <button @click="confirm" class="proceed">{{$t('confirm')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "formItem",

  data() {
    return {
      form: {
        gender: "Gender",
        surname: "",
        givename: "",
        datebirth: "Date of birth",
        HKID_passport: "",
        HKID1: ""
      },
      //判断点击之后的按钮
      select: 1,
      //保存年龄
      ages: "",
      loading: false
    };
  },
  created() {
    this.getProtectorInfo();
  },
  methods: {
    ...mapMutations(["setProtectorInfo"]),
    inputHkid() {
      //如果有值就把select改为2
      this.form.HKID_passport = "";
      this.select = 1;
    },
    inputPassport() {
      this.form.HKID1 = "";
      this.select = 2;
    },
    //确认事件(判断信息)---------------------------------------------------//////
    async confirm() {
      //1-1.验证信息是否都填写完毕
      if (
        this.form.datebirth == "Date of birth" ||
        this.form.givename == "" ||
        this.form.gender == "Gender" ||
        this.form.surname == ""
      ) {
        this.$createToast({
          txt: this.$t("notInformation"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      if (this.form.HKID1 == "" && this.form.HKID_passport == "") {
        this.$createToast({
          txt: this.$t("notInformation"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      this.loading = true;
      //1-2.调用验证方法,验证信息填写是否符合规定
      var isverify1 = await this.verifyUserFrom(this.form);
      if (isverify1 == false) {
        return false;
      }
      //1-3.验证年龄
      if (!(await this.verifyAge(this.form))) {
        return false;
      }
      //1-4.如果验证都通过
      if (isverify1 == true) {
        // this.form.gender = this.form.gender || "";
        // this.form.surname = this.form.surname || "";
        // this.form.givename = this.form.givename || "";
        // this.form.datebirth = this.form.datebirth || "";
        // this.form.HKID1 = this.form.HKID1 || "";
        // this.form.HKID2 = this.form.HKID2 || "";
        // this.form.HKID_passport = this.form.HKID_passport || "";
        let newForm = Object.assign({}, this.form);
        //把数据存到vuex中
        this.setProtectorInfo(newForm);
        if (this.$route.query.isChange == "true") {
          this.$router.push({ path: "/ConfirmOrder" });
        } else {
          this.$router.push({ path: "/EmployerDetail" });
        }
      }
    },
    //如果vuex中有保单人信息,获取渲染到页面-----------------------------///
    getProtectorInfo() {
      if (this.$store.state.protectorInfo) {
        for (var key in this.$store.state.protectorInfo) {
          this.form[key] = this.$store.state.protectorInfo[key];
        }
        //this.form = this.$store.state.protectorInfo;
        //判断再次进入信息编辑页的时候passport是否有值
        if (this.form.HKID_passport != "") {
          this.select = 2;
        }
      }
      this.getYears();
    },
    //封装判断用户输入的信息是否符合规定
    async verifyUserFrom(protectorInfo) {
      var isverify = false;
      //验证HKID(调用接口)
      if (this.form.HKID1 != "") {
        let HKID = this.form.HKID1;
        //P1032651
        try {
          const res = await this.$http.post(
            "/wesupromo/web/validate/validateHKIDWithLng",
            {
              language: "tc",
              hkid: HKID
            }
          );
        } catch (error) {
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
          return false;
        }
      }
      isverify = true;
      return isverify;
    },
    //点击选择性别插件---------------------------------------------/////
    showPicker() {
      const column1 = [
        { text: this.$t("Female"), value: "Male" },
        { text: this.$t("Male"), value: "Female" }
      ];
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: this.$t("Gender"),
          data: [column1],
          cancelTxt: this.$t("cancel"),
          confirmTxt: this.$t("confirm"),
          onSelect: this.selectGender,
          onCancel: this.cancelGender
        });
      }
      this.picker.show();
    },
    //选择性别点击确认事件
    selectGender(selectedVal, selectedIndex, selectedText) {
      this.form.gender = selectedText.join(" ");
    },
    //选择性别点击取消事件
    cancelGender() {},

    //点击日期插件---------------------------------------------------/////
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: this.$t("account_info_birthday"),
          min: new Date(1900, 1, 1),
          max: new Date(),
          value: new Date(1980, 5, 20),
          cancelTxt: this.$t("cancel"),
          confirmTxt: this.$t("confirm"),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.datePicker.show();
    },
    //点击确认事件
    selectHandle(date, selectedVal, selectedText) {
      this.form.datebirth = this.dateTozero(selectedVal).join("-");
      //因为cube-ui再次选完日期不会修改日期的显示
      this.$refs.inputBirth.value = this.form.datebirth;
      this.getYears();
    },
    //点击取消
    cancelHandle() {},
    //数字小于10时前面加个0
    dateTozero(arr) {
      return arr.map(item => (item < 10 ? "0" + item : "" + item));
    },
    //返回上一页-------------------------------------------------/////
    toPrePage() {
      this.$router.push("/Insurance");
    },
    // 获取当天的天数----------------------------------------------/////
    getToday(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    },
    //计算年龄(是否大于十八岁)----------------------------------------/////
    getYears() {
      let todayDate = this.getToday(new Date());
      let years = Math.ceil(
        (new Date(`${todayDate} 00:00:00`).getTime() -
          new Date(
            `${this.form.datebirth.replace(/-/g, "/")} 00:00:00`
          ).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      this.ages = Math.floor(years / 365);
    },
    //7.验证年龄的方法
    async verifyAge(form) {
      try {
        const res = await this.$http.post("/wesupromo/web/product/checkAge", {
          product_id: this.product_id,
          who_age: "holder",
          policy_holder_info: {
            dob: form.datebirth
          }
        });
        if (res.status == 100 && res.data.checkAge == false) {
          this.loading = false;
          const toast = this.$createToast({
            time: 2000,
            type: "txt",
            txt: this.$t("member_toast_age")
          });
          toast.show();
          return false;
        }
      } catch (error) {
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
        return false;
      }
      return true;
    }
  },
  computed: {
    ...mapState(["product_id", "language", "plan"])
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.contain {
  padding: 0 30px;
  padding-top: 100px;
  background-color: #fff;
  position: relative;
  padding-bottom: 60px;
  .hint {
    color: rgb(88, 89, 95);
    margin-bottom: 30px;
    margin-top: 50px;
  }
  .form-wrap {
    padding: 20px;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.14);
    // line-height: 65px;
    background-color: #fff;
    margin-top: 35px;
    .title {
      font-size: 32px;
      color: @blue;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 50px;
    }
    p {
      display: flex;
      justify-content: space-between;
      .member {
        color: @blue;
        font-weight: bold;
        font-size: 32px;
      }
      .member-num {
        color: @blue;
        font-weight: bold;
        font-size: 32px;
        margin-left: 15px;
      }
      .member-title {
        font-weight: bold;
        font-size: 32px;
        color: rgb(0, 0, 0);
        font-family: HelveticaNeue-Medium;
      }
    }
    .GenderDiv {
      height: 75px;
      border-radius: 15px;
      font-size: 30px;
      border: 2px solid rgba(155, 155, 155, 0.5);
      color: rgb(233, 233, 233);
      line-height: 75px;
      text-align: left;
      padding-left: 18px;
      font-weight: 300;
      cursor: pointer;
    }
    .blank {
      color: rgb(0, 0, 0);
      font-weight: bold;
      font-size: 26px;
    }
    .Gender {
      height: 75px;
      width: 100%;
      border-radius: 15px;
      font-size: 26px;
      border: 2px solid rgba(155, 155, 155, 0.5);
      text-indent: 20px;
      font-weight: bold;
    }
    input::-webkit-input-placeholder {
      color: rgb(233, 233, 233);
      letter-spacing: 2px;
      font-weight: 500;
    }
    .form-item {
      p {
        color: rgb(0, 0, 0);
        font-size: 28px;
      }
      line-height: 35px;
      margin-top: 20px;
    }
    .HKID {
      width: 316px;
      height: 56px;
      color: white;
      font-size: 28px;
      outline: none;
      border: none;
      background: rgb(233, 233, 233);
      border-radius: 10px;
      margin-top: 40px;
      cursor: pointer;
    }
    .passport {
      width: 316px;
      height: 56px;
      padding: 0;
      text-align: center;
      color: white;
      font-size: 28px;
      background: rgb(233, 233, 233);
      outline: none;
      border: none;
      border-radius: 10px;
      margin-top: 40px;
      cursor: pointer;
    }
    .blue {
      background: @blue;
    }
    .HK {
      margin-top: 30px;
      font-size: 28px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      height: 70px;
      .hkNumber {
        display: inline-block;
        height: 70px;
        line-height: 70px;
      }
      .right {
        display: inline-block;
      }
      .hkNumber {
        color: rgb(0, 0, 0);
        // font-weight: bold;
        font-family: HelveticaNeue;
      }
      span {
        .IDnumber {
          width: 300px;
          height: 60px;
          border-radius: 13px;
          font-size: 26px;
          padding-right: 15px;
          border: 2px solid rgba(155, 155, 155, 0.5);
          margin-left: 20px;
          text-align: right;
          font-weight: bold;
        }
        .num {
          width: 75px;
          height: 60px;
          border-radius: 13px;
          font-size: 30px;
          border: 2px solid rgba(155, 155, 155, 0.5);
          text-align: center;
        }
        .width {
          width: 300px;
        }
      }
    }
    .remark {
      font-size: 26px;
      p {
        color: #9d9d9d;
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
  .cube-btn {
    padding: 0;
    background-color: #fff;
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
  .contain {
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