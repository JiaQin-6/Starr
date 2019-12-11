<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:43:40
 * @LastEditTime: 2019-12-10 16:25:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('account_add_member')}}</p>
    </div>
    <WFormItem :ref="'input'+index" v-for="(item, index) in formData" :key="index" :formdata="item"></WFormItem>

    <div class="button-bar">
      <button @click="confirm" class="proceed">{{$t('confirm')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import WFormItem from "components/WFormItem.vue";

export default {
  components: {
    WFormItem
  },
  data() {
    return {
      //保存用户输入的信息
      formData: [],
      //保存人数
      people: "",
      //年龄
      ages: "",
      adultNum: {
        adult: 0,
        child: 0
      },
      loading: false
    };
  },

  computed: {
    ...mapState([
      "travelInfo",
      "userInfo",
      "userId",
      "protectorInfo",
      "ageInfo",
      "product_id"
    ])
  },
  created() {
    //判斷是否登陸過
    // if(this.userId == null){
    //   this.$router.push('/login')
    // }
    //清除报单人的信息
    // const resetFile = ["protectorInfo"];
    // this.reset(resetFile);
    const toast = this.$createToast({
      time: 1000,
      txt: this.$t("loading")
    });
    toast.show();
    this.getFormData();
  },
  methods: {
    ...mapMutations([
      "reset",
      "setUserInfo",
      "setProtectorInfo",
      "setCertificateId",
      "setadult"
    ]),
    //1.获取到信息保存到vuex中
    async confirm() {
      console.log(this.$refs.input0);
      //循环遍历获取表单数据
      const { count } = this.travelInfo;
      console.log(count);
      let num = 0;
      //接收表单输入的所有用户信息
      let getUserInfo = [];
      for (let key in count) {
        if (count[key] > 0) {
          //在循环遍历count[key]里面的数量
          for (var i = 0; i < count[key]; i++) {
            var inputNum = "input" + num;
            console.log(inputNum);
            //关键:获取到的信息
            console.log(this.$refs[inputNum][0].form);
            //把获取到的数据先保存到数组中
            getUserInfo.push(this.$refs[inputNum][0].form);
            num++;
          }
        }
      }
      console.log(getUserInfo);

      //验证信息是否都填写完毕
      for (var i = 0; i < getUserInfo.length; i++) {
        //验证是否全部填写
        if (
          getUserInfo[i].datebirth == "" ||
          getUserInfo[i].givename == "" ||
          getUserInfo[i].gender == "" ||
          getUserInfo[i].surname == ""
        ) {
          this.$createToast({
            txt: this.$t("insurance_toast"),
            time: 3000,
            type: "txt"
          }).show();
          return false;
        }
        if (getUserInfo[i].HKID1 == "" && getUserInfo[i].HKID_passport == "") {
          this.$createToast({
            txt: this.$t("insurance_toast"),
            time: 3000,
            type: "txt"
          }).show();
          return false;
        }
        //验证年龄
        if (getUserInfo[i].title == this.$t("child")) {
          console.log(getUserInfo[i].datebirth);
          console.log(this.getYears(getUserInfo[i].datebirth));
          if (this.getYears(getUserInfo[i].datebirth) >= 16) {
            this.loading = false;
            this.$createToast({
              txt: this.$t("children_Years"),
              time: 3000,
              type: "txt"
            }).show();
            return false;
          }
        } else {
          if (this.getYears(getUserInfo[i].datebirth) < 16) {
            this.loading = false;
            this.$createToast({
              txt: this.$t("companions_Years"),
              time: 3000,
              type: "txt"
            }).show();
            return false;
          }
        }
        this.loading = true;
        //调用验证方法,验证信息填写是否符合规定
        var isverify1 = await this.verifyUserFrom(getUserInfo[i]);
        if (isverify1 == false) {
          return false;
        }
      }
      //1-3.如果年龄验证不通过
      if (!(await this.verifyAge(getUserInfo))) {
        return false;
      }
      //计算成人和小童
      for (var i = 0; i < getUserInfo.length; i++) {
        if (this.getYears(getUserInfo[i].datebirth) > 18) {
          this.adultNum.adult++;
        } else {
          this.adultNum.child++;
        }
      }
      //如果验证都通过
      if (isverify1 == true) {
        //把数据存到vuex中
        console.log(getUserInfo);
        this.setUserInfo(getUserInfo);
        console.log(this.travelInfo.count.myself);
        this.getYears(getUserInfo[0].datebirth);
        console.log(this.getYears(getUserInfo[0].datebirth));
        //保存成人和小孩的人数
        this.setadult(this.adultNum);
        //如果本人大于十八岁
        if (this.travelInfo.count.myself == 0) {
          // let cer_id = "noMyself";
          // this.setCertificateId(cer_id);
          this.$router.push({ path: "/Policyholder" });
          // const resetFile = ["protectorInfo"];
          // this.reset(resetFile);
        } else if (this.getYears(getUserInfo[0].datebirth) < 18) {
          //如果有myself且小于18岁
          // let cer_id = "lessEighteen";
          // this.setCertificateId(cer_id);
          // const resetFile = ["protectorInfo"];
          // this.reset(resetFile);
          this.$router.push({ path: "/Policyholder" });
        } else if (this.getYears(getUserInfo[0].datebirth) > 18) {
          //如果有myself且大于18岁,保存自己的信息当做投保人信息
          this.$router.push({ path: "/Policyholder" });
        }

        // this.$router.push({ path: "/Policyholder" });

        // if (this.travelInfo.count.myself == 0) {
        //   let cer_id = "noMyself";
        //   this.setCertificateId(cer_id);
        //   this.$router.push({ path: "/Policyholder" });
        // } else if (this.getYears(getUserInfo[0].datebirth) < 18) {
        //   //如果有myself且小于18岁
        //   let cer_id = "lessEighteen";
        //   this.setCertificateId(cer_id);
        //   this.$router.push({ path: "/Policyholder" });
        // } else {
        //   //当他返回到添加成员如果修改了年龄大于18岁就要把protectorInfo清除
        //   const resetFile = ["protectorInfo"];
        //   this.reset(resetFile);
        //   this.$router.push({ path: "/confirmOrder" });
        // }
      }
    },
    //2.第一次到信息页(获取输入的信息保存到vuex);第二次到信息页(获取vuex中的信息再提交后保存到vuex中)
    getFormData() {
      let num = 1;
      let index = 0;
      const titleEnum = {
        child: this.$t("child"),
        friends: this.$t("Family_friends"),
        myself: this.$t("ship_myself"),
        spouse: this.$t("ship_my_spouse")
      };
      const { count } = this.travelInfo;
      console.log(count);
      for (let key in count) {
        if (count[key] > 0) {
          //在循环遍历count[key]里面的数量
          for (var i = 0; i < count[key]; i++) {
            //判断userInfo有没有值
            //当用户点击exit返回到编辑也得时候,将vuex中把编辑后的数据取出来
            if (this.userInfo) {
              var gender = this.userInfo[index].gender;
              var surname = this.userInfo[index].surname;
              var givename = this.userInfo[index].givename;
              var datebirth = this.userInfo[index].datebirth;
              var HKID1 = this.userInfo[index].HKID1;
              var HKID_passport = this.userInfo[index].HKID_passport;
            }
            index++;
            this.people++;
            //通过formData来渲染页面
            this.formData.push({
              title: titleEnum[key],
              member: num++,
              //当用户点击exit返回到编辑页的时候,将vuex中把编辑后的数据取出来
              //以下可用赋值简写
              gender: gender || "",
              surname: surname || "",
              givename: givename || "",
              datebirth: datebirth || "",
              HKID1: HKID1 || "",
              HKID_passport: HKID_passport || ""
            });
          }
        }
      }
      console.log(this.formData);
    },
    //3.封装判断用户输入的信息是否符合规定
    async verifyUserFrom(getUserInfo) {
      var isverify = false;
      //验证HKID
      if (getUserInfo.HKID1 != "") {
        let HKID = getUserInfo.HKID1;
        //P1032651
        console.log(HKID);
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
      console.log(isverify);
      return isverify;
    },
    //4.返回上一页
    toPrePage() {
      this.$router.push("/Prompt");
    },
    //5.获取当天的天数
    getToday(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    },
    //6.计算年龄(是否大于十八岁)
    getYears(date) {
      let todayDate = this.getToday(new Date());
      let years = Math.ceil(
        (new Date(`${todayDate} 00:00:00`).getTime() -
          new Date(`${date.replace(/-/g, "/")} 00:00:00`).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      this.ages = Math.floor(years / 365);
      console.log(this.ages + "岁");
      return this.ages;
    },
    //7.验证年龄的方法
    async verifyAge(form) {
      var arr_age = [];
      for (var i = 0; i < form.length; i++) {
        arr_age.push({ dob: form[i].datebirth });
      }
      try {
        const res = await this.$http.post("/wesupromo/web/product/checkAge", {
          product_id: this.product_id,
          who_age: "insured",
          others_insured_list: arr_age
        });
        console.log(res);
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
        console.log(error);
        const toast = this.$createToast({
          time: 3000,
          type: "txt",
          txt: error.msg
        });
        toast.show();
        return false;
      }
      return true;
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
  padding-bottom: 60px;
  position: relative;
  padding-top: 120px;
  .imgs {
    width: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
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
    font-size: 30px;
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