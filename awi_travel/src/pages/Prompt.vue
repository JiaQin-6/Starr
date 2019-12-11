<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:33:52
 * @LastEditTime: 2019-12-10 19:32:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <!-- 标题 -->
    <div class="headTitle">
      <i @click="toPreviousPage" class="cubeic-arrow"></i>
      <p>{{$t('hl_insurance_start_notes1')}}</p>
    </div>
    <div class="head_imgs progressive">
      <img class="head-img" :src="data.logo_path" alt />
    </div>

    <div class="Starr">
      <div :class="{'desc':flag}" v-html="data.desc1"></div>
      <span class="more" @click="clickmore">{{flag ? $t('product_decs_key_more') : $t('hide')}}</span>
    </div>

    <div class="individual" v-html="data.descHtml"></div>

    <div class="button-bar">
      <button class="proceed" @click="confirm">{{$t('confirm')}}</button>
    </div>
    <cube-loading v-show="loading"></cube-loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      data: "",
      more: false,
      flag: true,
      loading: false
    };
  },
  created() {
    const toast = this.$createToast({
      time: 1000,
      txt: this.$t("loading")
    });
    toast.show();
  },
  mounted() {
    var params = {
      product_id: this.product_id,
      language: this.language
    };
    const loading = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    //显示加载动画
    loading.show();
    this.$http
      .post("/wesupromo/web/tpc/getImportantNotes", params)
      .then(res => {
        if (res.status == 100) {
          console.log(res);
          this.data = res.data;
          //数据加载完关闭加载动画
          this.$nextTick(() => {
            loading.hide();
          });
          console.log(this.ReplaceUrl(res.data.desc1));
          this.data.desc1 = this.ReplaceUrl(res.data.desc1);
        }
      })
      .catch(error => {
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
  methods: {
    clickmore() {
      this.flag = !this.flag;
    },
    //点击返回键
    toPreviousPage() {
      this.$router.push("/login");
    },
    //获取链接
    ReplaceUrl(text) {
      var re = /(http||https:\/\/)*?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?\/*?([a-zA-Z0-9][-a-zA-Z0-9]{0,62})\/*?([a-zA-Z0-9][-a-zA-Z0-9]{0,62})/g;
      var s = text.replace(re, function(a) {
        return (
          '<a href="' +
          a +
          '" target=_blank style="color:#0c81ff;text-decoration:underline;">' +
          a +
          "</a>"
        );
      });
      console.log(s);
      return s;
    },
    confirm() {
      this.loading = true;
      this.$router.push("/MemberData");
    }
  },
  computed: {
    ...mapState(["language", "product_id"])
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
@deep: ~">>>";
.page-wrap {
  padding: 34px;
  padding-bottom: 60px;
  padding-top: 120px;
  position: relative;
  background: @background;

  .head_imgs {
    width: 400px;
    height: 200px;
    margin: 0 auto;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Starr {
    margin-top: 40px;
    border-bottom: 1px solid rgb(209, 208, 208);
    padding-bottom: 60px;
    white-space: pre-line;
    position: relative;
    font-size: 28px;
    line-height: 30px;
    color: rgb(74, 74, 74);
    
  }
  .desc {
    font-size: 28px;
    color: #4a4a4a;
    overflow: hidden;
    line-height: 32px;
    // position: relative;
    height: 97px;
  }
  .desc:after {
    content: "...";
    text-align: left;
    position: absolute;
    bottom: 25px;
    left: 0;
    // width: 30px;
    // height: 30px;
    font-size: 40px;
    // background: linear-gradient(
    //   to right,
    //   rgba(255, 255, 255, 0),
    //   rgba(255, 255, 255, 1) 50%
    // );
    // background-color: #fff;
  }
  .more {
    color: @blue;
    position: absolute;
    right: 0;
    bottom: 0px;
    cursor: pointer;
  }

  .individual {
    margin-top: 30px;
    padding-left: 18px;
    padding-bottom: 30px;
    font-size: 28px;
    color: rgb(74, 74, 74);
    line-height: 32px;
    margin-bottom: 5px;
    @{deep} a {
      color: @blue;
      text-decoration: underline;
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