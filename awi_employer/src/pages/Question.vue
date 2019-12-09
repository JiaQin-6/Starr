<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 09:01:12
 * @LastEditTime: 2019-12-06 14:31:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('title_general_info')}}</p>
    </div>
    <p class="answer">
      {{$t('answer')}}
      <br />
      <span class="insured">{{$t('insuredPerson')}}</span>
    </p>
    <div class="wrapper">
      <swiper ref="mySwiper" :options="swiperOption" class="swiper-container">
        <!-- slides -->
        <swiper-slide
          class="swiper-item"
          v-for="(item,index) in questionsList"
          data-index="index"
          :key="item.question_id"
        >
          <!-- 问题number -->
          <p class="questions">{{$t('qa_ques')}} {{item.question_number}}</p>
          <!-- 判断的问题 -->
          <p
            class="quesContent"
            :class="{'quesType':item.question_type=='FREETEXT'}"
          >{{item.option_content}}</p>
          <!-- 输入的问题 -->
          <p v-if="item.question_type === 'FREETEXT' ">
            <input
              class="quesInput"
              type="text"
              v-model="dataForm[item.question_number]"
              :placeholder="item.option_content"
            />
          </p>
          <!-- 判断是否的按钮 -->
          <div class="buttons">
            <div
              class="yes"
              @click="answer('Yes', item, index)"
              v-if="item.question_type === 'YES/NO' "
            >{{$t('claim_travel_ques51')}}</div>
            <div
              class="no"
              @click="answer('No', item, index)"
              v-if="item.question_type === 'YES/NO' "
            >{{$t('sa_question_no')}}</div>
            <div class="confirm" @click="confirm(item, index)" v-else>{{$t('confirm')}}</div>
          </div>
        </swiper-slide>
        <!-- Optional controls ,显示小点-->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import { mapState, mapMutations } from "vuex";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      questionsList: [
        {
          option_content: this.$t('ishas_medical_attention'),
          pass_answer: "No",
          question_id: "5d8c3aa040f87f1e0a74f52c1",
          question_number: "1",
          question_type: "YES/NO"
        },
        {
          option_content:this.$t('isrejected_medical_attention'),
          pass_answer: "No",
          question_id: "5d8c3aa040f87f1e0a74f52c2",
          question_number: "2",
          question_type: "YES/NO"
        }
      ],
      swiperOption: {
        // 参数选项,显示小点
        //pagination: ".swiper-pagination",
        pagination: {
          el:".swiper-pagination",
        },
        //循环
        // loop:true,
        //每张播放时长3秒，自动播放
        // autoplay:2000,
        //滑动速度
        speed: 1000,
        // delay:1000
        // initialSlide: 4,
        activeIndex: 1
      },
      dataForm: [],
      answerList: [],
      questionContent: [],
    };
  },
  computed: {
    ...mapState([
      "maleData",
      "protectorInfo",
      "userId",
      "product_id",
      "language"
    ]),
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // this.swiper()
        //如果是从答案统计页编辑回来的,就显示需要修改的那些问题
        let editquestion = [];
        if (this.$route.query.reEdit) {
          JSON.parse(this.$route.query.reEdit).forEach(item => {
            this.questionsList.forEach(val => {
              if (item.question_id === val.question_id) {
                editquestion.push(val);
                if (val.question_type === "FREETEXT") {
                  this.dataForm[val.question_number] = item.content;
                }
              }
            });
          });
          this.questionsList = editquestion;
        }
  },
  created() {
  },
  methods: {
    ...mapMutations(["setMale"]),
   
    toPrePage() {
      this.$router.push("/HelperDetails");
    },
    answer(content, item, index) {
      const maleData = {
        question_id: item.question_id,
        type: item.question_type,
        quesNumber: item.question_number,
        content,
        option_content: item.option_content,
        checked:false
      };
      //选择一个删除一个问题对象信息
      this.questionsList.splice(index, 1);
      if (this.$route.query.reEdit) {
        //从修改页面调到此页面的时候
        this.maleData[item.question_number - 1] = maleData;
        this.answerList = this.maleData;
      } else {
        //首次到达此页面的时候
        this.answerList[item.question_number - 1] = maleData;
      }
      //最后没有问题的时候
      if (this.questionsList.length === 0) {
        this.setMale(this.answerList);
        this.$router.push("/Summary");
      }
    },

    // setFontSize(length) {
    //   const fontSize = Number.parseInt((570 / length) * 18);
    //   return fontSize > 34 ? "34px" : `${fontSize}px`;
    // },

    confirm(item, index) {
      const maleData = {
        question_id: item.question_id,
        type: item.question_type,
        quesNumber: item.question_number,
        content: this.dataForm[item.question_number],
        option_content: item.option_content,
        checked: false
      };
      if (!this.dataForm[item.question_number]) {
        const toast = this.$createToast({
          time: 3000,
          txt: "请先回答问题"
        });
        toast.show();
        return;
      }

      this.questionsList.splice(index, 1);
      if (this.$route.query.reEdit) {
        this.maleData[item.question_number - 1] = maleData;
        this.answerList = this.maleData;
      } else {
        this.answerList[item.question_number - 1] = maleData;
      }

      if (this.questionsList.length === 0) {
        this.setMale(this.answerList);
        this.$router.push("/Summary");
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
body,
html {
  height: 100%;
  width: 100%;
}
.page-wrap {
  padding: 35px;
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
  .swiper-container {
    margin-top: 20px;
    overflow: visible;
    padding: 5px;
    border-radius: 10px;
    .swiper-wrapper {
      .swiper-item {
        //overflow: auto;
        p {
          .quesInput {
            width: 90%;
            height: 45px;
            margin: 0 auto;
            border-bottom: 1px solid rgb(74, 74, 74);
            position: absolute;
            transform: translateX(-50%);
            top: 50%;
            left: 50%;
          }
        }
      }
    }
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -70px;
  }
  @{deep} .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
  }
  @{deep} .swiper-pagination-bullet-active {
    background: rgb(74, 74, 74);
    opacity: 0.7;
  }
  .swiper-slide {
    height: 700px;
    padding-top: 25px;
    box-shadow: 8px 10px 15px 15px rgba(139, 139, 139, 0.14);
    border-radius: 20px;
  }

  .answer {
    font-size: 38px;
    letter-spacing: 1px;
    color: rgb(74, 74, 74);
    line-height: 50px;
    margin-top: 90px;
    .insured {
      font-weight: bold;
    }
  }
  .questions {
    text-align: center;
    font-size: 40px;
    color: rgb(24, 95, 146);
    font-weight: bold;
  }
  .quesContent {
    text-align: center;
    font-weight: bold;
    padding: 0 30px;
    font-size: 38px;
    margin-top: 65px;
    // line-height: 38px;
  }
  .quesType {
    font-size: 16px !important;
    text-align: left;
    margin-top: 290px;
  }
  .buttons {
    position: absolute;
    width: 100%;
    height: 100px;
    padding: 100px 0;
    bottom: -300px;
    display: flex;
    justify-content: space-between;
    .yes {
      width: 220px;
      height: 90px;
      color: white;
      background: rgb(245, 166, 35);
      text-align: center;
      font-size: 40px;
      line-height: 90px;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-left: 40px;
      cursor: pointer;
    }
    .no {
      width: 220px;
      height: 90px;
      color: white;
      background: rgb(126, 211, 33);
      text-align: center;
      font-size: 40px;
      line-height: 90px;
      border-radius: 10px;
      position: absolute;
      right: 0;
      margin-right: 40px;
      cursor: pointer;
    }
    .confirm {
      background: rgb(2, 164, 71);
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border-radius: 15px;
      color: white;
      font-weight: 550;
      font-size: 35px;
      outline: none;
      border: none;
      margin-right: 40px;
      margin-left: 40px;
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
    .wrapper {
      height: 1200px;
      overflow: hidden;
      .swiper-item {
        width: 100% !important;
      }
    }
  }
}
</style>