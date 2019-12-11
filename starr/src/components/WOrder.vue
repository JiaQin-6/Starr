<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 16:31:56
 * @LastEditTime: 2019-12-11 18:07:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="members">
      <span>
        <p class="memb" v-if="!isProtector">
          {{$t('quote_member')}}
          <span>{{indexList+1}}</span>
        </p>
        <p class="memb" v-if="isProtector">
          {{$t('policy_holder_title')}}
        </p>
        <p>{{$t('relationship')}}</p>
        <p>{{$t('Gender')}}</p>
        <p>{{$t('account_info_lastname2')}}</p>
        <p>{{$t('account_info_firstname2')}}</p>
        <p>{{$t('account_info_birthday')}}</p>
        <p>{{isHkid}}</p>
      </span>
      <span class="members-right">
        <p @click="toMemberList" class="edit">{{$t('firm_order_change')}}</p>
        <p>{{userData.title}}</p>
        <p>{{userData.gender}}</p>
        <p>{{userData.surname}}</p>
        <p>{{userData.givename}}</p>
        <p>{{userData.datebirth}}</p>
        <!-- HKID或者passport -->
        <p>{{HkidpassportData}}</p>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "order",
  props: {
    userData: {
      require: true,
      type: Object
    },
    indexList: {
      require: true,
      type: Number
    },
    isProtector: {
      require: true,
      type: Boolean
    }
  },
  data() {
    return {
      //定义一个属性来显示KHID或者passport
      isHkid: this.$t('account_info_hkid'),
      //用来保存HKID或者passport
      HkidpassportData: ""
    };
  },
  methods: {
    HkidPassport() {
      if (
        this.userData.HKID1.trim() == "" 
      ) {
        this.isHkid = this.$t('info_passport');
        this.HkidpassportData = this.userData.HKID_passport;
      }else {
        this.HkidpassportData =
          this.userData.HKID1;
      }
    },
    //点击编辑跳转到成员信息列表
    toMemberList() {
      if (this.userData.title == this.$t('policyholder')) {
        this.$router.push("/Policyholder");
      } else {
        this.$router.push("/MemberData");
      }
    }
  },
  created() {
    this.HkidPassport();
  }
};
</script>
<style lang="less" scoped>
@import "~style/mixin.less";
.members {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  font-size: 26px;
  span {
    line-height: 40px;
    .memb {
      color: #9b9b9b;
      margin-bottom: 20px;
    }
    .edit {
      margin-bottom: 20px;
      text-align: right;
      color: @blue;
      cursor: pointer;
    }
  }
  .members-right {
    text-align: right;
  }
}
</style>