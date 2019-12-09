<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 16:42:17
 * @LastEditTime: 2019-12-05 15:29:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="contain_div">
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>Terms and Conditions</p>
    </div>
    <div class="content" v-html="contain"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      contain: ""
    };
  },
  computed: {
    ...mapState(["language"])
  },
  async mounted() {
    const loading = this.$createToast({
      time: 0,
      txt: this.$t('loading')
    });
    //显示加载动画
    loading.show();
    const res = await this.$http.post(
      "/wesupromo/web/webview/termsAndConditionsList",
      {
        language: this.language
      }
    );
    console.log(res);
    if (res.status == 100) {
      //数据加载完关闭加载动画
      this.$nextTick(() => {
        loading.hide();
      });
      this.contain = res.data[0].terms_and_conditions_html;
      console.log(this.contain);
    }
  },
  methods: {
    toPrePage() {
      this.$router.push('/Login');
    },
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.contain_div {
  width: 100%;
  padding-top: 100px;
  .content {
    padding: 20px;
    padding-bottom: 100px;
    @{deep} div {
      width: 100% ;
      h4 {
        font-size: 50px;
      }
       strong {
        font-weight: bold;
      }
       p {
        margin-top: 20px;
      }
    }
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