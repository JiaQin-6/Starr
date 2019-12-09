<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:36:14
 * @LastEditTime: 2019-12-02 10:56:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>Coverage Details</p>
    </div>
    <!-- <div class="">Coverage Details</div> -->
    <div class="contain">
      <div class="pageNum" v-for="(item,index) in datalist" :key="index">
        <p class="title">{{index +1 }}.{{item.name}}</p>
        <p class="details-item">{{item.details}}</p>
        <p class="details" v-for="(items,i) in item.tnclist" :key="i">
          <span class="desc">{{items.desc}}</span>
          <span>{{items.insured_sum}}</span>
        </p>
      </div>
    </div>
    <div class="button-bar">
      <button class="proceed" @click="proceed">Quote</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { VueBetterScroll } from "vue2-better-scroll";
export default {
  data() {
    return {
      datalist: ""
    };
  },
  computed: {
    ...mapState(["product_id", "language", "plan"])
  },
  components: {
    VueBetterScroll
  },
  mounted() {
    // var productId = this.product_id;
    // console.log(productId);

    const params = {
      product_id: this.product_id,
      language: this.language
    };

    this.$http.post("/wesupromo/web/tpc/getProductTerms", params).then(res => {
     
      this.datalist = res.data.product_terms_list;
    });
  },
  methods: {
    proceed() {
      this.$router.go(-1);
    },
    //跳转到上一页
    toPrePage() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
@import "~style/mixin.less";
.page-wrap {
  position: relative;
  height: 100%;
  .contain {
    padding: 0 50px;
    padding-bottom: 240px;
    margin-top: 150px;
    .pageNum {
      margin-top: 60px;
      .title {
        color: @blue;
        font-size: 35px;
        border-bottom: 1px solid rgb(209, 208, 208);
        padding-bottom: 20px;
      }
      .details-item {
        border-bottom: 1px solid rgb(209, 208, 208);
        padding-bottom: 20px;
        padding-top: 25px;
      }
      .details {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(209, 208, 208);
        padding-bottom: 15px;
        padding-top: 25px;
        span {
          line-height: 35px;
        }
        .desc {
          display: inline-block;
          width: 70%;
        }
      }
    }
  }
  .button-bar {
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 240px;
    border-top: 3px solid rgba(211, 209, 209, 0.25);
    background-color: rgba(250, 250, 250);
    transform: translateX(-50%);
  }

  .proceed {
    width: 388px;
    height: 130px;
    line-height: 130px;
    border: none;
    border-radius: 10px;
    margin-top: 50px;
    background: rgb(239, 69, 95);
    color: #fff;
    text-align: center;
    font-size: 36px;
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
</style>