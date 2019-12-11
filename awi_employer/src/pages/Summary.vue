<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 09:01:12
 * @LastEditTime: 2019-12-11 10:28:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="page-wraps">
      <div class="headTitle">
        <i @click="toPrePage" class="cubeic-arrow"></i>
        <p>{{$t('summary')}}</p>
      </div>
      <div class="title-item">
        <span class="general">{{$t('title_general_info')}}</span>
        <span>
          <span class="editButon" @click.stop.self="edit">{{$t('firm_order_change')}}</span>
        </span>
      </div>
      <div class="check-item" v-for="(item,index) in questionsList" :key="index">
        <span
          v-show="editAbled"
          @click="checked(index)"
          :class="{'checkbox':true,'selected':item.checked}"
        ></span>
        <span class="general-item" :style="{width:generalWidth}">
          <p class="ques">{{$t('qa_ques')}}{{item.quesNumber}}</p>
          <p class="quesContent">{{item.option_content}}</p>
          <div :class="{'button':item.content=='Yes','No':item.content=='No'}">{{item.content}}</div>
        </span>
      </div>
    </div>
    <div class="button-bar">
      <button
        class="confirm"
        @click="Confirm"
      >{{!editAbled ? $t('products_proceed') : $t('firm_order_change')}}</button>
    </div>
    <!-- 提示背景 -->
    <div v-show="isShow" class="popover_back"></div>
    <div v-show="isShow" class="popover">
      <div class="Oops">
        <img src="../assets/images/Opps@3x.png" alt />
      </div>
      <p class="title">Note!</p>
      <div class="hint">{{$t('sa_question_title3')}}</div>
      <button @click="toNext" class="comfirm">OK</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      value: "",
      editAbled: false,
      questionsList: "",
      generalWidth: "",
      isShow: false,
      loading: false
    };
  },
  computed: {
    ...mapState([
      "maleData",
      "MerchantId",
      "product_id",
      "language",
      "beginProductId"
    ])
  },
  methods: {
    Confirm() {
      let question_answers = [];
      //再次编辑确认
      if (this.editAbled) {
        //使用filter循环遍历,取出item.checked为true的对象
        question_answers = this.questionsList.filter(item => item.checked);
        if (question_answers.length == 0) {
          return false;
        } else {
          this.$router.push({
            path: "/Question",
            query: {
              reEdit: JSON.stringify(question_answers)
            }
          });
        }
      } else {
        //点击继续
        //如果有答案是yes就提示
        for (var i = 0; i < this.questionsList.length; i++) {
          if (this.questionsList[i].content == "Yes") {
            this.isShow = true;
            break;
          }
        }
        if (this.isShow == false) {
          this.loading = true;
          this.$router.push("/ConfirmOrder");
        }
      }
    },
    //点击编辑显示勾选
    edit() {
      this.editAbled = !this.editAbled;
      if (this.editAbled) {
        this.generalWidth = "88%";
      } else {
        this.generalWidth = "95%";
      }
    },
    //使用set遍历改变数组中对象的key和value
    checked(index) {
      // this.questionsList[index].checked=!this.questionsList[index].checked
      const status = !this.questionsList[index].checked;
      this.$set(this.questionsList[index], "checked", status);
    },
    //返回上一页面
    toPrePage() {
      this.$router.push("/Question");
    },
    toNext() {
      this.$router.push("/ConfirmOrder");
    }
  },
  created() {
    this.questionsList = JSON.parse(JSON.stringify(this.maleData));
  }
};
</script>
<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 30px;
  padding-top: 50px;
  .page-wraps {
    padding-bottom: 100px;
    .headTitle {
      position: fixed;
      height: 100px;
      top: 0;
      width: 100%;
      left: 0;
      z-index: 99;
      background-color: rgba(253, 253, 253);
      border-bottom: 2px solid rgba(211, 209, 209, 0.25);
      .cubeic-arrow {
        color: rgb(0, 122, 255);
        display: inline-block;
        transform: rotateZ(180deg);
        font-size: 36px;
        font-weight: bold;
        position: absolute;
        left: 10px;
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
        font-size: 35px;
        font-weight: 600;
        margin-top: 40px;
      }
    }
    .title-item {
      margin-top: 90px;
      display: flex;
      justify-content: space-between;
    }
    .general {
      font-size: 36px;
      color: rgb(74, 74, 74);
    }
    .editButon {
      display: inline-block;
      width: 70px;
      height: 40px;
      line-height: 42px;
      border-radius: 7px;
      background: @blue;
      color: white;
      text-align: center;
      cursor: pointer;
      font-size: 26px;
    }
    .check-item {
      > span {
        vertical-align: middle;
        &.checkbox {
          display: inline-block;
          width: 44px;
          height: 44px;
          background: url("../assets/images/TickOff@3x.png") no-repeat center
            center/44px 44px;
          cursor: pointer;
        }
        &.selected {
          background: url("../assets/images/Tick@3x.png") no-repeat center
            center/44px 44px;
        }
      }

      .general-item {
        display: inline-block;
        box-shadow: 5px 5px 5px 5px rgba(65, 64, 64, 0.14);
        border-radius: 8px;
        margin-top: 40px;
        padding: 15px;
        width: 95%;
        .ques {
          color: rgb(24, 95, 146);
          letter-spacing: 1px;
          font-weight: bold;
          margin-bottom: 15px;
          font-size: 26px;
        }
        .quesContent {
          margin-bottom: 30px;
          font-size: 26px;
        }
        .button {
          width: 90px;
          height: 40px;
          color: white;
          background: rgb(126, 211, 33);
          text-align: center;
          font-size: 28px;
          line-height: 40px;
          border-radius: 10px;
        }
        .No {
          width: 90px;
          height: 40px;
          color: white;
          background: rgb(245, 166, 35);
          text-align: center;
          font-size: 28px;
          line-height: 40px;
          border-radius: 10px;
        }
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
    margin-top: 300px;
    //border-top: 3px solid rgba(211, 209, 209, 0.25);
    //background-color: rgba(250, 250, 250);
  }
  .confirm {
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
  //弹出框
  .popover_back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.4;
  }
  .popover {
    width: 600px;
    height: 600px;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50% - 2px), calc(-50% - 2px));
    background-color: #fff;
    border-radius: 25px;
    padding: 30px;
    .Oops {
      width: 150px;
      height: 150px;
      margin: 0 auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      height: 80px;
      font-size: 40px;
      width: 100%;
      text-align: center;
      color: rgb(12, 129, 255);
    }
    .hint {
      text-align: center;
      color: rgb(3, 3, 3);
      line-height: 32px;
      font-size: 26px;
      height: 170px;
      margin-top: 50px;
    }
    .comfirm {
      display: block;
      height: 100px;
      margin: 0 auto;
      font-size: 33px;
      color: #fff;
      width: 300px;
      background-color: rgb(2, 164, 71);
      border-radius: 15px;
      border: 0;
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
    .page-wraps {
      .headTitle {
        width: 900px;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
    .button-bar {
      width: 900px;
    }
  }
}
</style>
