<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:35:18
 * @LastEditTime: 2019-12-06 17:21:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- Myself -->
  <div class="contain">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('policy_holder_title')}}</p>
    </div>
    <div class="hint">{{agesInfo}}</div>
    <div class="form-wrap">
      <div class="title">{{$t('policy_holder_title')}}</div>
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
          <p>{{$t('account_info_lastname2')}}</p>
          <!-- @blur="SurnameBlur" -->
          <input class="Gender" v-model="form.surname" type="text" placeholder="Surname" />
        </div>

        <div class="form-item">
          <p>{{$t('account_info_firstname2')}}</p>
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
          >{{this.form.datebirth}}</div>
        </div>
        <!-- 区号 -->
        <!-- <div class="form-item">
          <p>{{$t('country_code2')}}</p>
          <input class="Gender" v-model="newareacode" type="text" placeholder="Area Code" />
        </div>-->
        <!-- 电话号码 -->
        <!-- <div class="form-item">
          <p>{{$t('phone_number2')}}</p>
          <input
            class="Gender"
            v-model="newuserPhone.mobile"
            type="text"
            placeholder="Phone Number"
          />
        </div>-->
        <!-- 邮箱 -->
        <!-- <div class="form-item">
          <p>{{$t('account_info_email2')}}</p>
          <input class="Gender" v-model="newuserPhone.email" type="text" placeholder="Email" />
        </div>-->
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
                :class="[select==2?'width':'']"
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
        HKID1: "",
        title: "Policyholder"
      },
      // newuserPhone: {
      //   email: "",
      //   mobile: ""
      // },
      // newareacode: "",
      //判断点击之后的按钮
      select: 1,
      //保存年龄
      ages: "",
      getAge: ""
    };
  },
  created() {
    this.getProtectorInfo();
    // for (var key in this.userPhone) {
    //   this.newuserPhone[key] = this.userPhone[key];
    // }
    // this.newareacode = this.areacode;
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
    //确认事件
    async confirm() {
      //1-1.验证信息是否都填写完毕
      if (
        this.form.datebirth == "" ||
        this.form.givename == "" ||
        this.form.gender == "" ||
        this.form.surname == ""
      ) {
        this.$createToast({
          txt: this.$t("insurance_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      if (this.form.HKID1 == "" && this.form.HKID_passport == "") {
        this.$createToast({
          txt: this.$t("insurance_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
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
        this.form.gender = this.form.gender || "";
        this.form.surname = this.form.surname || "";
        this.form.givename = this.form.givename || "";
        this.form.datebirth = this.form.datebirth || "";
        this.form.HKID1 = this.form.HKID1 || "";
        this.form.HKID_passport = this.form.HKID_passport || "";
        this.form.title = this.$t("policyholder");
        //把数据存到vuex中
        this.setProtectorInfo(this.form);
        this.$router.push({ path: "/confirmOrder" });
      }
    },
    //如果vuex中有保单人信息,获取渲染到页面
    getProtectorInfo() {
      if (this.protectorInfo) {
        for (var key in this.protectorInfo) {
          this.form[key] = this.protectorInfo[key];
        }
        //判断再次进入信息编辑页的时候passport是否有值
        if (this.form.HKID_passport != "") {
          this.select = 2;
        }
      } else {
        //如果有本人且大于十八岁
        if (
          this.travelInfo.count.myself != 0 &&
          this.getYears(this.userInfo[0].datebirth) > 18
        ) {
          for (var key in this.userInfo[0]) {
            this.form[key] = this.userInfo[0][key];
          }
        }
        if (this.form.HKID_passport != "") {
          this.select = 2;
        }
      }
      this.getYears(this.form.datebirth); //计算一遍ages
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
        } catch (err) {
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
              txt: this.$t("request_error_toast2"),
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
    //点击选择性别插件
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
    //点击日期插件
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
      this.getYears(this.form.datebirth);
    },
    //点击取消
    cancelHandle() {},
    //数字小于10时前面加个0
    dateTozero(arr) {
      return arr.map(item => (item < 10 ? "0" + item : "" + item));
    },
    //返回上一页
    toPrePage() {
      this.$router.push("/MemberData");
    },
    // 获取当天的天数
    getToday(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    },
    //计算年龄(是否大于十八岁)
    getYears(datebirth) {
      let todayDate = this.getToday(new Date());
      let years = Math.ceil(
        (new Date(`${todayDate} 00:00:00`).getTime() -
          new Date(`${datebirth.replace(/-/g, "/")} 00:00:00`).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      this.ages = Math.floor(years / 365);
      return this.ages;
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
          const toast = this.$createToast({
            time: 2000,
            type: "txt",
            txt: this.$t("member_toast_age")
          });
          toast.show();
          return false;
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
            txt: this.$t("request_error_toast2"),
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
    ...mapState([
      "travelInfo",
      "MerchantId",
      "product_id",
      "userPhone",
      "areacode",
      "language",
      "userInfo",
      "plan",
      //"certificateId",
      "ageInfo",
      "beginProductId",
      "protectorInfo"
    ]),
    agesInfo() {
      return this.$t("policy_holder_age")
        .replace(/{min_age}/g, this.ageInfo.min_pp_age)
        .replace(/{max_age}/g, this.ageInfo.max_pp_age);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
.contain {
  padding: 0 30px;
  padding-top: 100px;
  background-color: #fff;
  position: relative;
  padding-bottom: 60px;
  .hint {
    color: rgb(88, 89, 95);
    margin-bottom: 30px;
    font-size: 24px;
    margin-top: 50px;
  }
  .form-wrap {
    padding: 20px;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.14);
    // line-height: 65px;
    background-color: #fff;

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
    }

    .Gender {
      height: 75px;
      width: 100%;
      border-radius: 15px;
      font-size: 30px;
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
        font-size: 24px;
      }
      line-height: 35px;
      margin-top: 20px;
    }
    .HKID {
      width: 316px;
      height: 56px;
      color: white;
      font-size: 30px;
      outline: none;
      border: none;
      background: #9b9b9b;
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
      font-size: 30px;
      background: #9b9b9b;
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
      font-size: 32px;
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
          width: 235px;
          height: 60px;
          border-radius: 13px;
          font-size: 30px;
          padding-right: 15px;
          border: 2px solid rgba(155, 155, 155, 0.5);
          margin-left: 20px;
          text-align: right;
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
      font-size: 24px;
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
}
//媒体查询
@media screen and (min-width: 1050px) {
  .contain {
    width: 900px;
    margin: 0 auto;
    padding-top: 100px;
    box-sizing: border-box;
    padding-bottom: 260px;
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