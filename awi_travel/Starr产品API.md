# Starr产品API

```
###接口申明
接口域名(测试): https://dev-wesurance814.com
```



## 1.预注册

```
/wesupromo/web/add
```

### 请求参数 :

```
{
  "phone":"5d15cda9971f320d262b810a",
  "phone_country_code":"03dfd96d875d43ba8ced522f3bbc0179",
  "web":"www.baidu.com",
  "email":"1448682783@qq.com"
  }
```

### 响应数据 :

```
  返回用户id
  {
    "status": 100,
    "change": null,
    "msg": null,
    "data": {
        "id": "5d65e57e84bc100aa0a03e69"
    }
  } 
```

## 2.产品详情

```
POST —  /wesupromo/web/tpc/getProductDetails
```

### 请求参数 :

```
  {
  "language": "tc",
  "product_id":"5b751d8151812ce27ce2856a",
  "phone_country_code":"852"
  }
```

##  3.重要事项

```
POST — /wesupromo/web/tpc/getImportantNotes
```

### 请求参数 :

```
 {
	"product_id":"5b1e3d3a24a7ce5d6eb334df",
	"language" : "sc"
 } 
```

## 4.产品的所有保障

```
POST — /wesupromo/web/tpc/getProductTerms
```

### 请求参数 :

```
{
	"product_id":"5b1e3d3a24a7ce5d6eb334df",
	"language" : "sc"
}
```

## 5.产品报价

```
/wesupromo/web/product/getstarrquote
```

### 请求参数 :

```
{
  "product_id":"5d15cda9971f320d262b810a",
  "language":"03dfd96d875d43ba8ced522f3bbc0179",
  "start_date":"2019-08-26",
  "end_date":"2019-08-28",
  "others_insured_list":[ 
  {
  "product_id":"5d15cda9971f320d262b810a", 
  "language":"03dfd96d875d43ba8ced522f3bbc0179", 
  "start_date":"2019-08-29",
  "end_date":"2019-08-30",
  "others_insured_list":[
  	{
  		"relation":2001
  	},{
  		"relation":2003
  	},{
  		"relation":2004
  	}
  	] 
}
```

## 6.判断日期是否符合

```
https://dev-wesurance814.com/wesupromo/web/validate/checkJourneyDate
```

### 请求参数 :

```
{
  "product_id":"5b751d8151812ce27ce2856a",  
   "language":"eng",
  "start_date":"2019-02-03",
  "end_date":"2019-08-31"
}
```

### 响应数据 :

```
返回值
{
    "status": 100,
    "change": null,
    "msg": null,
    "data": {
        "is_valid": false
    }
}
 "is_valid": true表示在这个时间之内，false表示没有在
```

## 7.验证HKID(身份证)接口

```
https://dev-wesurance814.com/wesupromo/web/validate/validateHKIDWithLng
```

### 请求参数 :

```
参数{
      language: "tc",
      hkid: "P1032651"
}
```

### 响应参数 :

```
返回值(成功情况)
{
change: null
data:{is_valid: true}
msg: null
status: 100
}
返回值(失败情况)
change: null
data: {is_valid: false}
msg: "身份證號碼有誤"
status: 102
```

## 8.存储点击量

```
https://dev-wesurance814.com/wesupromo/web/addClicks
```

### 请求参数 :

```
{
"trx_id": merchant_id + random(8digit) , //前端自己生成
"merchant_id":"5d71ceb947e5a01196f71387",
"product_id":"5d71ceb947e5a01196f71387"
}
```

## 9.获取跳转到付款页面的数据信息

```
https://dev-wesurance814.com/wesupromo/web/webview/starrPayForm?
id=${this.userId}&application_id=${this.appid}&language=${this.language}`

```



## 10.提交用户信息

```
https://dev-wesurance814.com//wesupromo/web/checkout/purchasebystarr
```

### 请求参数 :

```
         {
          application_id: this.rendomNum,         
          trx_id: this.session_id                 //index的session-id(0123456789)
          others_insured_list: 
          [
             {
               doc_firstname: "EDDDB024987EB49DF3A9187BEEF972CC",
               doc_surname: "D5410169F74E32BBE37A492038869795",
               doc_type: "idcard",
               doc_id: "2225D2FF9BAE2F46AC90972E32DBE802",    //身份證號碼
               dob: "1980-05-20",
               relation: 2001,                         //2001自己;2002配偶;2003孩紙;2004朋友
               title: "Mr.",
               is_policy_holder:"true"                 //如果是投保人就为true
             },
             {
               doc_firstname: "934F5AAC427480D6FCC9A24D9FA12FE7",
               doc_surname: "92223D5649BCE5ABC41A414988B7943E",
               doc_type: "passport",
               doc_id: "F98E41B9888658B11C4298DAC80D23EB",
               dob: "1980-05-20",
               relation: 2003,
               title: "Mr."
               is_policy_holder:"false"    //如果是受保人就为false
             }
           ],
           id: "5aaf191c9a8cc93854f23efd",      //用戶id(5aaf191c9a8cc93854f23efd)this.userId
           insured_mem_id: "5aaf191c9a8cc93854f23efd",     // 和用戶id一樣
           //login_token: "4a6d4a11b4854478af821553b853b002",    //去除
           payment_type: 12,     //默認
           product_id: this.product_id,                   // 產品id(5d15cda9971f320d262b810a)
           start_date: this.travelInfo.date.departureDate.replace(/\//g, "-"),
           end_date: this.travelInfo.date.returnDate.replace(/\//g, "-"),
           operation: this.productType,                        //首頁返回的product_type
           merchant_id: this.MerchantId,
           web_policy_holder: {
               doc_firstname: "934F5AAC427480D6FCC9A24D9FA12FE7",
               doc_surname: "92223D5649BCE5ABC41A414988B7943E",
               doc_type: "passport",
               doc_id: "F98E41B9888658B11C4298DAC80D23EB",
               dob: "1980-05-20",
               title: "Mr."
               is_policy_holder:"false"    //如果是受保人就为false
             } 
             //投保人不需要relation
        };
```

## 11.申明接口

```
web/starr/webview/showStarrDeclarationPolicywording
```

## 12.个人资料

```
web/starr/webview/showStarrPicsPolicywording
```





