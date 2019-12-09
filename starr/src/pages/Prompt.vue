<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:33:52
 * @LastEditTime: 2019-12-06 16:42:57
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
      <div :class="{'desc':flag}">{{data.desc1}}</div>
      <span class="more" @click="clickmore">{{flag ? $t('product_decs_key_more') : $t('hide')}}</span>
    </div>

    <div class="individual" v-html="data.descHtml"></div>

    <div class="button-bar">
      <router-link to="/MemberData">
        <button class="proceed">{{$t('confirm')}}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      data: "",
      more: false,
      flag: true
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
          this.data = res.data;
          //数据加载完关闭加载动画
          this.$nextTick(() => {
            loading.hide();
          });
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
          txt: this.$t("request_error_toast2"),
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
    padding-bottom: 35px;
    white-space: pre-line;
    position: relative;
    font-size: 28px;
    line-height: 30px;
    color: rgb(74, 74, 74);
  }
  .desc {
    font-size: 28px;
    color: rgb(74, 74, 74);
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* autoprefixer:off */
    -webkit-box-orient: vertical;
    /* autoprefixer:on */
    -webkit-line-clamp: 6;
  }
  .more {
    color: @blue;
    position: absolute;
    right: 0;
    bottom: 0;
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