<!--
 * @Author: your name
 * @Date: 2019-11-23 09:16:53
 * @LastEditTime: 2019-11-23 09:51:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \starrd:\project\whe\src\pages\productImg.vue
 -->
<template>
  <div>
      <img :src=item alt v-for="(item,index) in productImg" :key="index"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      productImg: []
    };
  },
  computed: {
    ...mapState(["product_id", "language", "beginProductId"])
  },
  async mounted() {
    if (this.$route.query.title == "coverage") {
      this.productImg = [
        "https://dev-wesurance814.com/wesupromo/tpc/pb/coverage_details/AWI_Helper_Insurance_001_tc.png",
        "https://dev-wesurance814.com/wesupromo/tpc/pb/coverage_details/AWI_Helper_Insurance_001_eng.png"
      ];
    }
  }
};
</script>

<style lang='less' scoped>
    img{
        width: 100%;
    }
</style>