<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 09:45:03
 * @LastEditTime: 2019-12-06 16:43:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="run">
      <img src="@/assets/images/run-man-run-min.gif" alt />
    </div>
    <form
      id="starrPayForm"
      ref="starrPayForm"
      name="payFormCcard"
      method="post"
      :action="inform.starrWebviewPaymentUrl"
    >
      <input type="hidden" name="merchantId" :value="inform.merchantId" />
      <input type="hidden" name="amount" :value="inform.amount" />
      <input type="hidden" name="orderRef" :value="inform.orderRef" />
      <input type="hidden" name="currCode" :value="inform.currCode" />
      <input type="hidden" name="mpsMode" :value="inform.mpsMode" />
      <input type="hidden" name="successUrl" :value="inform.successUrl" />
      <input type="hidden" name="cancelUrl" value="" />
      <input type="hidden" name="failUrl" value="" />
      <input type="hidden" name="lang" :value="inform.lang" />
      <input type="hidden" name="payMethod" :value="inform.payMethod" />
      <input type="hidden" name="payType" :value="inform.payType" />
      <input type="hidden" name="secureHash" :value="inform.secureHash" />
      <input type="hidden" name="remark" :value="inform.remark" />
      <button class="submitClass" type="submit"></button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      inform: {}
    };
  },
  computed: {
    ...mapState([
      "session_id",
      "product_id",
      "language",
      "userId",
      "session_id",
      "appid"
    ])
  },
  async mounted() {
    try {
      const res = await this.$http.get(
        `/wesupromo/web/webview/starrPayForm?id=${this.userId}&application_id=${this.appid}&language=${this.language}`
      );
      if (res.status == 100) {
        this.inform = res.data;
        if(this.inform.starrWebviewPaymentUrl != null){
           const timer = setTimeout(() => {
          this.$refs.starrPayForm.submit();
        }, 1000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once("hook:beforeDestroy", () => {
          clearTimeout(timer);
        });
        }else{
          location.reload(true)   
        }
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
  },
  methods:{
    
  }

};
</script>

<style lang="less" scoped>
.run {
  width: 420px;
  height: 420px;
  margin: 0 auto;
  margin-top: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.submitClass {
  opacity: 0;
}
</style>