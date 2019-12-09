<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 19:43:40
 * @LastEditTime: 2019-12-06 17:37:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <!-- 标题 -->
    <div class="headTitle">
      <i @click="toPrePage" class="cubeic-arrow"></i>
      <p>{{$t('Employer_detail')}}</p>
    </div>
    <!-- 主要内容 -->
    <div class="contain">
      <p>{{$t('input_address_1')}}</p>
      <div class="table_address">
        <div class="content">
          <div
            class="terntory"
            :class="{blank:address.Territory!=$t('ws_territory')}"
            @click="showPicker('Territory')"
          >{{address.Territory}}</div>
          <div
            class="distnct"
            :class="{blank:address.District!=$t('insurance_address_District')}"
            @click="showPicker('District')"
          >{{address.District}}</div>
          <!-- $t('insurance_address_District') -->
          <div class="block">
            <input
              type="text"
              @blur="address.block=address.block.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="address.block"
              :placeholder="$t('ws_block')"
            />
            <input
              type="text"
              @blur="address.floor=address.floor.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="address.floor"
              :placeholder="$t('insurance_address_Floor1')"
            />
            <input
              type="text"
              @blur="address.room=address.room.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="address.room"
              :placeholder="$t('insurance_address_Room1')"
            />
          </div>
          <div class="building">
            <input
              type="text"
              v-model="address.building"
              @blur="address.building=address.building.replace(/[\u4E00-\u9FA5]/g,'')"
              :placeholder="$t('insurance_address1')"
            />
          </div>
        </div>
      </div>

      <div class="form-item">
        <p>{{$t('hl_employer_desc23')}}</p>
        <!-- @blur="genderBlur" -->
        <div
          @click="showPicker('Industry')"
          :class="{blank:address.Industry!=$t('hl_employer_desc3')}"
          class="GenderDiv"
          ref="Industry"
        >{{address.Industry}}</div>
      </div>
      <p>*{{$t('AddEmergencyContact_FillInfo_Required')}}</p>
    </div>
    <!-- 底部按钮 -->
    <div class="button-bar">
      <button @click="confirm" class="proceed">{{$t('info_doc_data_next')}}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      address: {
        Territory: this.$t("ws_territory"),
        District: this.$t("insurance_address_District"),
        block: "",
        floor: "",
        room: "",
        building: "",
        Industry: this.$t("hl_employer_desc3")
      },
      data_type_two: "",
      territoryInfo: [], //保存territory的选项
      districtInfo: [] //保存district的选项
    };
  },
  created() {
    this.getProtectorInfo();
  },
  computed: {
    ...mapState(["userAddress", "language"])
  },
  methods: {
    ...mapMutations(["setUserAddress"]),
    //点击选择地址或职业---------------------------------------------------/////
    showPicker(type) {
      this.data_type_two = type;
      let title = "";
      let column1 = [];
      if (type == "Territory") {
        column1 = this.territoryInfo;
        title = this.$t("ws_territory");
      } else if (type == "District") {
        column1 = this.districtInfo;
        title = this.$t("insurance_address_District");
      } else if (type == "Industry") {
        title = this.$t("hl_employer_desc3");
        column1 = [
          {
            text: this.$t("AccountingAuditing"),
            value: "AcAccounting & Auditingcounting"
          },
          {
            text: this.$t("AdvertisingMedia"),
            value: "Advertising, Media & Public Relations"
          },
          {
            text: this.$t("AmusementEntertainment"),
            value: "Amusement & Entertainment"
          },
          {
            text: this.$t("ArchitectureSurveying"),
            value: "Architecture & Surveying"
          },
          { text: this.$t("BankingFinance"), value: "Banking & Finance" },
          {
            text: this.$t("BuildingConstruction"),
            value: "Building & Constructio"
          },
          {
            text: this.$t("CulturalRecreationServices"),
            value: "Cultural & Recreation Services"
          },
          {
            text: this.$t("DecorationRepair"),
            value: "Decoration, Repair & Maintenance"
          },
          {
            text: this.$t("EngineeringTechnicalServices"),
            value: "Engineering & Technical Services"
          },
          { text: this.$t("Government"), value: "Government" },
          { text: this.$t("HotelTourism"), value: "Hotel & Tourism" },
          {
            text: this.$t("InformationTechonology"),
            value: "Information Techonology"
          },
          { text: this.$t("home_bottom_i"), value: "Insurance" },
          {
            text: this.$t("InvestmentSecurities"),
            value: "Investment & Securities"
          },
          { text: this.$t("LegalServices"), value: "Legal Services" },
          { text: this.$t("Manufacturing"), value: "Manufacturing" },
          {
            text: this.$t("MedicalHealth"),
            value: "Medical, Health & Veterinary Services"
          },
          {
            text: this.$t("PrintingPublishing"),
            value: "Printing & Publishing"
          },
          { text: this.$t("Property"), value: "Property" },
          { text: this.$t("PublicUtilities"), value: "Public Utilities" },
          {
            text: this.$t("ReligiousSocial"),
            value: "Religious & Social Organisations"
          },
          { text: this.$t("ResearchEducation"), value: "Research & Education" },
          { text: this.$t("RestaurantsBars"), value: "Restaurants & Bars" },
          { text: this.$t("Retail"), value: "Retail" },
          { text: this.$t("Telecommunications"), value: "Telecommunications" },
          {
            text: this.$t("TransportationLogistics"),
            value: "Transportation & Logistics"
          },
          {
            text: this.$t("WholesaleTrading"),
            value: "Wholesale, Trading, Import, Export"
          },
          { text: this.$t("hl_helper_desc54"), value: "Others" },
          { text: this.$t("NotProvided"), value: "NotProvided" }
        ];
      }
      //改变插件中的默认title和data
      setTimeout(() => {
        this.picker.$updateProps({
          title: title,
          data: [column1]
        });
      }, 0);
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: this.$t("Gender"),
          data: [column1],
          cancelTxt: this.$t("cancel"),
          confirmTxt: this.$t("confirm"),
          onSelect: this.selectGender,
          onCancel: this.cancelGender
        });
      }
      this.picker.show();
    },
    //选择点击确认事件
    async selectGender(selectedVal, selectedIndex, selectedText) {
      this.address[this.data_type_two] = selectedText.join(" ");
      if (this.data_type_two == "Territory") {
        const loading = this.$createToast({
          time: 0,
          txt: this.$t("loading")
        });
        //显示加载动画
        loading.show();
        this.address.District = this.$t("insurance_address_District");
        this.districtInfo = [];
        try {
          const res = await this.$http.post(
            "/wesupromo/web/dictionary/getHkAddress",
            {
              territory_id: selectedVal[0]
            }
          );
          if (res.status == 100) {
            //数据加载完关闭加载动画
            this.$nextTick(() => {
              loading.hide();
            });
            let newArr = [];
            for (var i = 0; i < res.data.length; i++) {
              var obj2 = {};
              obj2.text = res.data[i].name_eng;
              obj2.value = res.data[i].id;
              newArr.push(obj2);
            }
            this.districtInfo = newArr;
            // switch (this.language) {
            //   case "tc": {
            //     for (var i = 0; i < res.data.length; i++) {
            //       var obj = {};
            //       obj.text = res.data[i].name_tc;
            //       obj.value = res.data[i].id;
            //       newArr.push(obj);
            //     }
            //     this.districtInfo = newArr;
            //     break;
            //   }
            //   case "eng": {
            //     for (var i = 0; i < res.data.length; i++) {
            //       var obj2 = {};
            //       obj2.text = res.data[i].name_eng;
            //       obj2.value = res.data[i].id;
            //       newArr.push(obj2);
            //     }
            //     this.districtInfo = newArr;
            //     break;
            //   }
            // }
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
              txt: this.$t("request_error_toast2"),
              time: 3000,
              type: "txt"
            }).show();
          }
        }
      }
    },
    //选择性别点击取消事件
    cancelGender() {},

    //点击确认按钮------------------------------------------------------///////
    confirm() {
      //验证信息是否都填写完毕
      if (
        this.address.Territory == this.$t("ws_territory") ||
        this.address.Territory == "" ||
        this.address.District == this.$t("insurance_address_District") ||
        this.address.District == "" ||
        this.address.block == "" ||
        this.address.floor == "" ||
        this.address.room == "" ||
        this.address.building == "" ||
        this.address.Industry == this.$t("hl_employer_desc3")
      ) {
        this.$createToast({
          txt: this.$t("notInformation"),
          time: 3000,
          type: "txt"
        }).show();
        return false;
      }
      //将地址信息保存到vuex中
      this.setUserAddress(this.address);
      this.$router.push("/HelperDetails");
    },
    toPrePage() {
      this.$router.push("/Employer");
    },
    //如果vuex中有保单人信息,获取渲染到页面-----------------------------///
    getProtectorInfo() {
      //console.log(JSON.parse(JSON.stringify(this.helperInfo))["address"]);
      if (this.userAddress) {
        for (var key in this.userAddress) {
          this.address[key] = this.userAddress[key];
        }
      }
    }
  },
  async mounted() {
    const loading = this.$createToast({
      time: 0,
      txt: this.$t("loading")
    });
    //显示加载动画
    loading.show();
    try {
      const res = await this.$http.post(
        "/wesupromo/web/dictionary/getHkAddress",
        {
          territory_id: ""
        }
      );
      if (res.status == 100) {
        //数据加载完关闭加载动画
        this.$nextTick(() => {
          loading.hide();
        });
        for (var i = 0; i < res.data.length; i++) {
          var obj2 = {};
          obj2.text = res.data[i].name_eng;
          obj2.value = res.data[i].id;
          this.territoryInfo.push(obj2);
        }

        // switch (this.language) {
        //   case "tc": {
        //     for (var i = 0; i < res.data.length; i++) {
        //       var obj = {};
        //       obj.text = res.data[i].name_tc;
        //       obj.value = res.data[i].id;
        //       this.territoryInfo.push(obj);
        //     }
        //     break;
        //   }
        //   case "eng": {
        //     for (var i = 0; i < res.data.length; i++) {
        //       var obj2 = {};
        //       obj2.text = res.data[i].name_eng;
        //       obj2.value = res.data[i].id;
        //       this.territoryInfo.push(obj2);
        //     }
        //     break;
        //   }
        // }
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
          txt: this.$t("request_error_toast2"),
          time: 3000,
          type: "txt"
        }).show();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~style/mixin.less";
.page-wrap {
  padding: 34px;
  background: #fff;
  padding-bottom: 60px;
  position: relative;
  padding-top: 120px;
  .button-bar {
    text-align: center;
   // position: fixed;
    width: 100%;
    height: 200px;
    //bottom: 0;
    //left: 50%;
    //transform: translateX(-50%);
    margin-top:50px;
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
  .contain {
    width: 670px;
    margin: 0 auto;
    padding-bottom: 260px;
    p {
      font-size: 30px;
      margin-top: 50px;
    }
    .table_address {
      width: 670px;
      margin-top: 20px;
      background-color: #fff;
      border: 2px solid rgba(23, 37, 54, 0.3);
      .content {
        margin-left: 20px;
        width: 649px;
        input {
          height: 80px;
          width: 100%;
          color: #000;
          font-weight: bold;
        }
        input::-webkit-input-placeholder {
          color: rgb(233, 233, 233);
          letter-spacing: 2px;
          font-weight: 500;
        }
        .terntory {
          width: 100%;
          height: 81px;
          color: rgb(233, 233, 233);
          line-height: 81px;
          border-bottom: 1px solid rgba(23, 37, 54, 0.8);
          font-size: 20px;
          cursor: pointer;
        }
        .distnct {
          width: 100%;
          height: 81px;
          color: rgb(233, 233, 233);
          line-height: 81px;
          border-bottom: 1px solid rgba(23, 37, 54, 0.8);
          font-size: 20px;
          cursor: pointer;
        }
        .blank {
          color: rgb(0, 0, 0);
          font-weight: bold;
        }

        .block {
          width: 100%;
          height: 61px;
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid rgba(23, 37, 54, 0.8);
          input {
            flex: 1;
            display: block;
            height: 60px;
            border: 0;
            border-radius: 0;
            border-right: 1px solid rgba(23, 37, 54, 0.8);
            &:last-child {
              border-right: 0;
              padding-left: 10px;
            }
            &:nth-child(2) {
              padding-left: 10px;
            }
          }
        }
        .building {
          width: 100%;
        }
      }
    }
    .industry {
      height: 80px;
      width: 670px;
      border-radius: 10px;
      background-color: #fff;
      margin-top: 20px;
      input {
        width: 650px;
        display: block;
        height: 100%;
        border: 2px solid rgba(23, 37, 54, 0.5);
        border-radius: 10px;
        padding-left: 20px;
      }
    }
    .form-item {
      p {
        color: rgb(0, 0, 0);
        margin-bottom: 20px;
      }
      margin-top: 20px;
    }
    .GenderDiv {
      height: 60px;
      width: 660px;
      border-radius: 10px;
      font-size: 20px;
      background-color: #fff;
      border: 2px solid rgba(155, 155, 155, 0.5);
      color: rgb(233, 233, 233);
      line-height: 60px;
      text-align: left;
      padding-left: 10px;
      cursor: pointer;
    }
    .blank {
      color: rgb(0, 0, 0);
      font-weight: bold;
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