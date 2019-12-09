<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:35:18
 * @LastEditTime: 2019-12-04 15:02:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- Myself -->
  <div class="form-wrap">
    <p class="pTitle">
      <span class="member">
        {{$t('quote_member')}}
        <span class="member-num">{{formdata.member}}</span>
      </span>
      <span class="member-title">{{formdata.title}}</span>
    </p>
    <!-- 用户信息输入框 -->
    <div class="form-item">
      <p>{{$t('sex_title_1')}}</p>
      <!--  @blur="genderBlur" -->
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
        @click="showDatePicker"
        :class="{blank:this.form.datebirth!='Date of birth'}"
        class="GenderDiv"
      >{{this.form.datebirth}}</div>
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
      <span class="hkNumber">{{select==1?`${$t('account_info_hkid')}:`:`${$t('info_passport')}:`}}</span>
      <div class="right" v-show="select == 1">
        <span>
          <!--  @blur="HkidBlur" -->
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
          <!-- @blur="passportBlur" -->
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
</template>

<script>
export default {
  name: "formItem",
  props: {
    //父向子传值
    formdata: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      form: {
        gender: "Gender",
        surname: "",
        givename: "",
        datebirth: "Date of birth",
        HKID_passport: "",
        HKID1: "",
        title: this.formdata.title
      },
      //判断点击之后的按钮
      select: 1
    };
  },
  created() {
    this.getNemObj();
  },

  methods: {
    inputHkid() {
      //如果有值就把select改为2
      this.form.HKID_passport = "";
      this.select = 1;
    },
    inputPassport() {
      this.form.HKID1 = "";
      this.select = 2;
    },
    //点击编辑回到编辑页后,循环遍历对象生产一个全新的对象
    getNemObj() {
      if (this.$store.state.userInfo) {
        for (var key in this.formdata) {
          this.form[key] = this.formdata[key];
        }
        //判断再次进入信息编辑页的时候passport是否有值
        if (this.form.HKID_passport != "") {
          this.select = 2;
        }
      }
    },
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
      // this.$refs.inputBirth.value = this.form.datebirth;
    },
    //点击取消
    cancelHandle() {},
    //数字小于10时前面加个0
    dateTozero(arr) {
      return arr.map(item => (item < 10 ? "0" + item : "" + item));
    },

    //点击选择性别插件
    showPicker() {
      const column1 = [
        { text: this.$t("Female"), value: "Male" },
        { text: this.$t("Male"), value: "Female" }
        // { text: "男", value: "男" },
        // { text: "女", value: "女" }
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
    cancelGender() {}
  },
  computed: {}
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
.form-wrap {
  padding: 20px;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.14);
  // line-height: 65px;
  margin-bottom: 30px;
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
  .pTitle {
    margin-bottom: 40px;
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
      line-height: 70px;
      height: 70px;
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
  .remark{
    font-size: 24px;
    p{
    color: #9d9d9d;
    }
  }
  .cube-btn {
    padding: 0;
    background-color: #fff;
  }
}
</style>