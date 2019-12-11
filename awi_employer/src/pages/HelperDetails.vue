
<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:43:40
 * @LastEditTime: 2019-12-11 10:35:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('hl_helper_desc1')}}</p>
    </div>
    <!-- 中间部分 -->
    <div class="center_contain">
      <div class="top">
        <!-- 选择性别 -->
        <div class="form-item">
          <p>{{$t('sex_title_1')}}</p>
          <!-- @blur="genderBlur" -->
          <div
            @click="showPicker('gender','userData')"
            :class="{blank:userTotalInfo.userData.gender!='Gender'}"
            class="GenderDiv"
            ref="Gender"
          >{{userTotalInfo.userData.gender}}</div>
        </div>
        <p>{{$t('account_info_lastname2')}}</p>
        <input
          type="text"
          v-model="userTotalInfo.userData.Surname"
          placeholder="Passport Surname (English)*"
        />
        <p>{{$t('account_info_firstname2')}}</p>
        <input
          type="text"
          v-model="userTotalInfo.userData.Givenname"
          placeholder="Passport Given Name (English)*"
        />
        <!-- 日期插件 -->
        <div class="form-item">
          <p>{{$t('Date_of_Birth')}}</p>
          <!-- @blur="birthDateBlur" -->
          <div
            ref="datebirth"
            :class="{blank:userTotalInfo.userData.datebirth!='Date of birth'}"
            class="GenderDiv"
            @click="showDatePicker('datebirth')"
          >{{userTotalInfo.userData.datebirth}}</div>
        </div>
        <!-- Position -->
        <div class="form-item">
          <p>{{$t('hl_helper_desc25')}}</p>
          <!-- @blur="genderBlur" -->
          <div
            @click="showPicker('Position','userData')"
            :class="{blank:userTotalInfo.userData.Position!='Position'}"
            class="GenderDiv"
            ref="Position"
          >{{this.userTotalInfo.userData.Position}}</div>
          <!-- 输入的position -->
          <input
            v-model="otherPositionInfo"
            v-show="otherPosition"
            type="text"
            :placeholder="$t('hl_helper_desc6')"
          />
        </div>
        <!-- Nationality -->
        <div class="form-item">
          <p>{{$t('hl_helper_desc27')}}</p>
          <!-- @blur="genderBlur" -->
          <div
            @click="showPicker('Nationality','userData')"
            :class="{blank:userTotalInfo.userData.Nationality!='Nationality'}"
            class="GenderDiv"
            ref="Nationality"
          >{{this.userTotalInfo.userData.Nationality}}</div>
        </div>
      </div>
      <div class="text">
        <p>
          {{$t('hl_helper_desc11')}}
          <span>{{$t('hl_helper_desc10')}}</span>
        </p>
      </div>
      <!-- 地址填写 -->
      <div class="table_address">
        <div class="content">
          <div
            class="terntory"
            :class="{blank:userTotalInfo.address.Territory!=$t('ws_territory')}"
            @click="showPicker('Territory','address')"
          >{{userTotalInfo.address.Territory}}</div>
          <div
            class="distnct"
            :class="{blank:userTotalInfo.address.District!=$t('insurance_address_District')}"
            @click="showPicker('District','address')"
          >{{userTotalInfo.address.District}}</div>
          <div class="block">
            <input
              type="text"
              @blur="userTotalInfo.address.block=userTotalInfo.address.block.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="userTotalInfo.address.block"
              :placeholder="$t('ws_block')"
            />
            <input
              type="text"
              @blur="userTotalInfo.address.floor=userTotalInfo.address.floor.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="userTotalInfo.address.floor"
              :placeholder="$t('insurance_address_Room1')"
            />
            <input
              type="text"
              @blur="userTotalInfo.address.room=userTotalInfo.address.room.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="userTotalInfo.address.room"
              :placeholder="$t('insurance_address1')"
            />
          </div>
          <div class="building">
            <input
              type="text"
              @blur="userTotalInfo.address.building=userTotalInfo.address.building.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="userTotalInfo.address.building"
              placeholder="Building/Estate/Street No*"
            />
          </div>
        </div>
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
            <!-- @blur="HkidBlur" -->
            <input
              v-model="userTotalInfo.form.HKID1"
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
              v-model="userTotalInfo.form.HKID_passport"
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
    <!-- 底部按钮 -->
    <div class="button-bar">
      <button @click="confirm" class="proceed">{{$t('confirm')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      //userData
      userTotalInfo: {
        userData: {
          gender: "Gender",
          Surname: "",
          Givenname: "",
          datebirth: "Date of birth",
          Position: "Position",
          Nationality: "Nationality"
        },
        //address
        address: {
          Territory: this.$t("ws_territory"),
          District: this.$t("insurance_address_District"),
          block: "",
          floor: "",
          room: "",
          building: ""
        },
        form: {
          HKID_passport: "",
          HKID1: ""
        }
      },

      //判断点击之后的按钮
      select: 1,
      //保存年龄
      ages: "",
      //保存日期选择的输入框
      data_type: "",
      //保存性别,position,nationality的输入框
      data_type_two: "",
      //保存选中的是address还是userData
      isuserData: "",
      territoryInfo: [], //保存territory的选项
      districtInfo: [], //保存district的选项
      otherPosition: false, //显示填写的position
      otherPositionInfo: "",
      loading: false
    };
  },
  created() {
    this.getProtectorInfo();
  },
  methods: {
    ...mapMutations(["setHelperInfo"]),
    //点击选择性别---------------------------------------------------/////
    showPicker(type, type2) {
      this.data_type_two = type;
      this.isuserData = type2;
      let title = "";
      let column1 = [];
      if (type == "gender") {
        title = this.$t("Gender");
        column1 = [
          { text: this.$t("Female"), value: "Male" },
          { text: this.$t("Male"), value: "Female" }
        ];
      } else if (type == "Position") {
        title = this.$t("hl_helper_desc5");
        column1 = [
          { text: this.$t("hl_helper_desc51"), value: "domestic helper" },
          { text: this.$t("hl_helper_desc52"), value: "gardener" },
          { text: this.$t("hl_helper_desc53"), value: "chauffeur" },
          { text: this.$t("hl_helper_desc54"), value: "others" }
        ];
      } else if (type == "Nationality") {
        title = this.$t("hl_helper_desc7");
        column1 = [
          { text: this.$t("Chinese"), value: "Chinese" },
          { text: this.$t("HongKongChinese"), value: "Hong Kong Chinese" },
          { text: this.$t("Filipino"), value: "Filipino" },
          { text: this.$t("Indian"), value: "Indian" },
          { text: this.$t("Indonesian"), value: "Indonesian" },
          { text: this.$t("Nepalese"), value: "Nepalese" },
          { text: this.$t("Pakistani"), value: "Pakistani" },
          { text: this.$t("Thai"), value: "Thai" },
          { text: this.$t("Burmese"), value: "Burmese" },
          { text: this.$t("Bangladeshi"), value: "Bangladeshi" },
          { text: this.$t("SriLankan"), value: "Sri Lankan" },
          { text: this.$t("hl_helper_desc54"), value: "others" }
        ];
      } else if (type == "Territory") {
        column1 = this.territoryInfo;
        title = this.$t("ws_territory");
      } else if (type == "District") {
        title = this.$t("insurance_address_District");
        column1 = this.districtInfo;
      }
      //改变插件中的默认title和data
      setTimeout(() => {
        this.picker.$updateProps({
          title: title,
          data: [column1]
        });
      }, 0);
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
    //选择点击确认事件
    async selectGender(selectedVal, selectedIndex, selectedText) {
      this.userTotalInfo[this.isuserData][
        this.data_type_two
      ] = selectedText.join(" ");
      if (this.data_type_two == "Territory") {
        const loading = this.$createToast({
          time: 0,
          txt: this.$t("loading")
        });
        //显示加载动画
        loading.show();
        this.userTotalInfo.address.District = this.$t(
          "insurance_address_District"
        );
        this.districtInfo = [];
        try {
          const res = await this.$http.post(
            "/wesupromo/web/dictionary/getHkAddress",
            {
              territory_id: selectedVal[0]
            }
          );
          if (res.status == 100) {
            //数据加载完关闭加载动画
            this.$nextTick(() => {
              loading.hide();
            });
            let newArr = [];
            for (var i = 0; i < res.data.length; i++) {
              var obj2 = {};
              obj2.text = res.data[i].name_eng;
              obj2.value = res.data[i].id;
              newArr.push(obj2);
            }
            this.districtInfo = newArr;
            // switch (this.language) {
            //   case "tc": {
            //     for (var i = 0; i < res.data.length; i++) {
            //       var obj = {};
            //       obj.text = res.data[i].name_tc;
            //       obj.value = res.data[i].id;
            //       newArr.push(obj);
            //     }
            //     this.districtInfo = newArr;
            //     break;
            //   }
            //   case "eng": {
            //     for (var i = 0; i < res.data.length; i++) {
            //       var obj2 = {};
            //       obj2.text = res.data[i].name_eng;
            //       obj2.value = res.data[i].id;
            //       newArr.push(obj2);
            //     }
            //     this.districtInfo = newArr;
            //     break;
            //   }
            // }
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
      if (this.data_type_two == "Position") {
        if (selectedText.join(" ") == this.$t("hl_helper_desc54")) {
          this.otherPosition = true;
        } else {
          this.otherPosition = false;
          this.otherPositionInfo = "";
        }
      }
    },
    //选择性别点击取消事件
    cancelGender() {},

    //点击日期插件---------------------------------------------------///////
    showDatePicker(type) {
      //改变插件中的默认title和data
      setTimeout(() => {
        this.datePicker.$updateProps({
          title: type
        });
      }, 0);
      //保存选择日期的是哪个输入框
      this.data_type = type;
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
      this.userTotalInfo.userData[this.data_type] = this.dateTozero(
        selectedVal
      ).join("-");
      //因为cube-ui再次选完日期不会修改日期的显示
      this.$refs[this.data_type].value = this.userTotalInfo.form.datebirth;

      if (this.data_type == "datebirth") {
        this.getYears();
      }
    },
    //点击取消
    cancelHandle() {},
    //数字小于10时前面加个0
    dateTozero(arr) {
      return arr.map(item => (item < 10 ? "0" + item : "" + item));
    },

    //确认事件(判断信息)---------------------------------------------------//////
    async confirm() {
      //1-1.验证信息是否都填写完毕
      if (
        this.userTotalInfo.userData.datebirth == "Date of birth" ||
        this.userTotalInfo.userData.datebirth == "" ||
        this.userTotalInfo.userData.Givenname == "" ||
        this.userTotalInfo.userData.gender == "Gender" ||
        this.userTotalInfo.userData.gender == "" ||
        this.userTotalInfo.userData.Surname == "" ||
        this.userTotalInfo.userData.Position == "Position" ||
        this.userTotalInfo.userData.Position == "" ||
        this.userTotalInfo.userData.Nationality == "Nationality" ||
        this.userTotalInfo.userData.Nationality == "" ||
        this.userTotalInfo.address.Territory == this.$t("ws_territory") ||
        this.userTotalInfo.address.Territory == "" ||
        this.userTotalInfo.address.District ==
          this.$t("insurance_address_District") ||
        this.userTotalInfo.address.District == "" ||
        this.userTotalInfo.address.block == "" ||
        this.userTotalInfo.address.floor == "" ||
        this.userTotalInfo.address.room == "" ||
        this.userTotalInfo.address.building == ""
      ) {
        this.$createToast({
          txt: this.$t("notInformation"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      if (
        this.userTotalInfo.userData.Nationality == this.$t("hl_helper_desc54")
      ) {
        this.$createToast({
          txt: this.$t("industry_other_toast"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }

      if (
        this.userTotalInfo.form.HKID1 == "" &&
        this.userTotalInfo.form.HKID_passport == ""
      ) {
        this.$createToast({
          txt: this.$t("notInformation"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      this.loading = true;//显示loading
      //1-2.调用验证方法,验证信息填写是否符合规定
      var isverify1 = await this.verifyUserFrom(this.userTotalInfo.form);
      if (isverify1 == false) {
        return false;
      }
      //1-3.验证年龄
      if (!(await this.verifyAge(this.userTotalInfo.userData))) {
        return false;
      }
      //1-4.验证职位---------
      //如果是其他职位
      if (this.otherPosition == true) {
        //如果没填信息
        if (!this.otherPositionInfo) {
          this.$createToast({
            txt: this.$t("notInformation"),
            time: 3000,
            type: "txt"
          }).show();
          return false;
        } else {
          this.userTotalInfo.userData.Position = this.otherPositionInfo;
        }
      }
      //1-5.如果验证都通过
      if (isverify1 == true) {
        //把数据存到vuex中
        this.setHelperInfo(this.userTotalInfo);
        if (this.$route.query.isChange == "true") {
          this.$router.push({ path: "/ConfirmOrder" });
        } else {
          this.$router.push({ path: "/Question" });
        }
      }
    },
    //如果vuex中有保单人信息,获取渲染到页面-----------------------------///
    getProtectorInfo() {
      //第一次默认和雇主地址一样
      if (this.userAddress) {
        for (var key in this.userAddress) {
          this.userTotalInfo.address[key] = this.userAddress[key];
        }
      }
      //console.log(JSON.parse(JSON.stringify(this.helperInfo))['address']);
      if (this.helperInfo) {
        for (var key in this.helperInfo) {
          for (var key2 in this.helperInfo[key]) {
            this.userTotalInfo[key][key2] = this.helperInfo[key][key2];
          }
        }
        //判断再次进入信息编辑页的时候passport是否有值
        if (this.userTotalInfo.form.HKID_passport != "") {
          this.select = 2;
        }
      }
      this.getYears();
    },
    //封装判断用户输入的信息是否符合规定
    async verifyUserFrom(protectorInfo) {
      var isverify = false;
      //验证HKID(调用接口)
      if (this.userTotalInfo.form.HKID1 != "") {
        let HKID = this.userTotalInfo.form.HKID1;
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
    //点击返回按钮-----------------------------------------------------/////
    toPrePage() {
      this.$router.push("/EmployerDetail");
    },
    //处理身份证和护照按钮处理----------------------------------------/////
    inputHkid() {
      //如果有值就把select改为2
      this.userTotalInfo.form.HKID_passport = "";
      this.select = 1;
    },
    inputPassport() {
      this.userTotalInfo.form.HKID1 = "";
      this.select = 2;
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
            `${this.userTotalInfo.userData.datebirth.replace(
              /-/g,
              "/"
            )} 00:00:00`
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
          who_age: "insured",
          others_insured_list: [
            {
              dob: form.datebirth
            }
          ]
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
    ...mapState(["helperInfo", "product_id", "language", "plan", "userAddress"])
  },
  async mounted() {
    const loading = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    //显示加载动画
    loading.show();
    const res = await this.$http.post(
      "/wesupromo/web/dictionary/getHkAddress",
      {
        territory_id: ""
      }
    );
    if (res.status == 100) {
      //数据加载完关闭加载动画
      this.$nextTick(() => {
        loading.hide();
      });
      for (var i = 0; i < res.data.length; i++) {
        var obj2 = {};
        obj2.text = res.data[i].name_eng;
        obj2.value = res.data[i].id;
        this.territoryInfo.push(obj2);
      }
      // switch (this.language) {
      //   case "tc": {
      //     for (var i = 0; i < res.data.length; i++) {
      //       var obj = {};
      //       obj.text = res.data[i].name_tc;
      //       obj.value = res.data[i].id;
      //       this.territoryInfo.push(obj);
      //     }
      //     break;
      //   }
      //   case "eng": {
      //     for (var i = 0; i < res.data.length; i++) {
      //       var obj2 = {};
      //       obj2.text = res.data[i].name_eng;
      //       obj2.value = res.data[i].id;
      //       this.territoryInfo.push(obj2);
      //     }
      //     break;
      //   }
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 34px;
  background: #fff;
  padding-bottom: 60px;
  position: relative;
  padding-top: 120px;

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
  .center_contain {
    width: 690px;
    margin: 0 auto;
    .top {
      p {
        font-size: 28px;
        margin-top: 30px;
        margin-bottom: 10px;
      }
      input {
        height: 60px;
        width: 660px;
        border-radius: 10px;
        border: 2px solid #ccc;
        padding-left: 10px;
        font-size: 26px;
        color: rgb(0, 0, 0);
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
        margin-top: 20px;
      }
      .GenderDiv {
        height: 60px;
        width: 660px;
        border-radius: 10px;
        font-size: 26px;
        border: 2px solid rgba(155, 155, 155, 0.5);
        color: rgb(233, 233, 233);
        line-height: 60px;
        text-align: left;
        padding-left: 10px;
        cursor: pointer;
      }
      .blank {
        color: rgb(0, 0, 0);
        font-weight: bold;
      }
    }
  }
  .text {
    margin-top: 50px;
    p {
      font-size: 25px;
    }
    span {
      color: red;
    }
  }
  .table_address {
    width: 670px;
    margin-top: 20px;
    background-color: #fff;
    border: 2px solid rgba(23, 37, 54, 0.3);
    .content {
      margin-left: 20px;
      width: 649px;
      input {
        height: 80px;
        width: 100%;
        font-size: 26px;
        font-weight: bold;
      }
      input::-webkit-input-placeholder {
        color: rgb(233, 233, 233);
        letter-spacing: 2px;
        font-weight: 500;
      }
      .terntory {
        width: 100%;
        height: 81px;
        color: rgb(233, 233, 233);
        line-height: 81px;
        border-bottom: 1px solid rgba(23, 37, 54, 0.8);
        font-size: 26px;
        cursor: pointer;
      }
      .distnct {
        width: 100%;
        height: 81px;
        color: rgb(233, 233, 233);
        line-height: 81px;
        border-bottom: 1px solid rgba(23, 37, 54, 0.8);
        font-size: 26px;
        cursor: pointer;
      }
      .blank {
        color: rgb(0, 0, 0);
        font-weight: bold;
      }
      .block {
        width: 100%;
        display: flex;
        height: 61px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(23, 37, 54, 0.8);
        font-size: 26px;
        input {
          flex: 1;
          height: 60px;
          display: block;
          border: 0;
          border-radius: 0;
          font-size: 26px;
          border-right: 1px solid rgba(23, 37, 54, 0.8);
          &:last-child {
            border-right: 0;
            padding-left: 10px;
          }
          &:nth-child(2) {
            padding-left: 10px;
          }
        }
      }
      .building {
        width: 100%;
        font-size: 26px;
      }
    }
  }
  .HKID {
    width: 333px;
    height: 56px;
    color: white;
    font-size: 30px;
    outline: none;
    border: none;
    background: rgb(233, 233, 233);
    border-radius: 10px;
    margin-top: 40px;
    cursor: pointer;
  }
  .passport {
    width: 333px;
    height: 56px;
    padding: 0;
    text-align: center;
    color: white;
    font-size: 30px;
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
      input::-webkit-input-placeholder {
        color: rgb(233, 233, 233);
        letter-spacing: 2px;
        font-weight: 500;
      }
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