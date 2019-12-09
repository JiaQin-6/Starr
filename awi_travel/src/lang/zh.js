/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 18:32:32
 * @LastEditTime: 2019-12-07 10:53:19
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import Vuex from 'vuex';
import store from '../store/index';
Vue.use(Vuex);
export default {
    //index.vue
    loading:'讀取中...',
    account_customer_service: '客戶服務',
    products_choose_plan_coverage_title1: '保障內容',
    product_decs_key_title: '主要特點',
    product_decs_key_more: '更多', //更多
    language:'語言/Language',
    hide: '隱藏',
    Quote:'報價',
    btn_back:'返回',
    products_proceed:'繼續',
    In_one_policy:"單一保單買滿:",
    discount500:"HKD1,000,即减HKD500",
    discount100:"HKD200,即减HKD100",
    discount50:"HKD100,即减HKD50",
    terms_notice:"Starr Insurance Companies 保留一切權利修改，增加，取消有關條款而不作另行通知！",
    request_error_toast2:"請求失敗！",
    //travelinfo.vue
    pc_tra_title1: '旅遊保險',
    departure_return: '出發日期及回程日期',
    quote_departure_date: '出發日期',
    quote_return_date: '回程日期',
    products_return_data:'回程日期',
    member_companion: '同行者',
    quote_members: '名成員',
    ship_myself:'本人',
    ship_my_spouse:'伴侣',
    ship_child:'子女',
    age_below:'小於16歲',
    Family_friends:"親朋好友",
    product_show_my_results:'顯示價錢',
    insurance_toast:'請輸入所需信息',
    setPolicyholder:'未滿18歲的兒童不符合成爲保單持有人的資格!請添加一個保單持有人繼續您的購買!投保人不需要是其中一名同伴',
    moreThanEight:'我們只能接受投保起保期不多於 180天。請遲些再遞交你的申請！',
    minPeople:'同行者的最大數量是',
    travel_annaul_toast:'選擇的日期應該大於今天的日期',
    moreDays:'我們只接受在今天起計開始不超過180天的申請，請稍後重新再試',
    //infocinfirm
    Days:'天',
    //login.vue
    login_welcome:'歡迎!',
    input_number_email:'請繼續輸入您的手機號碼和電子郵件',
    input_number:'請輸入你的手機號碼',
    login_email_1:'請輸入你的電郵地址',
    ePolicy:'(電子保單將發送到您的上述電子郵件地址)',
    clickNext:'如果你點擊下面的“下一步”，這意味着你同意我們的',
    otg_terms:'條款',
    and:'和',
    privacy_policies:'隱私政策',
    info_doc_data_next:'資料正確往下一步',
    login_wel_content:'輸入你的手機號碼以繼續.',
    validPhone:'請輸入有效手機號碼',
    validEmail:'請輸入有效郵箱號', //有效郵箱
    //prompt.vue
    hl_insurance_start_notes1:'重要事項',
    et_enter:'輸入',
    //MemberData.vue
    account_add_member:'加入成員',
    confirm:'確認',
    LastNameIncorrect:'姓氏輸入有誤,只能輸入全英文且不能爲空',//姓氏輸入有誤
    NameIncorrect:'姓名輸入有誤,只能輸入全英文且不能爲空',
    passportErr:'護照號碼輸入有誤',
    onlyOne:'香港身份證和護照只能選其中一個',
    member_toast_age:"不符合該保單年齡要求",
    card_hk_desc:'香港身份證號碼為 A123456(7), 請輸入 A1234567',
    children_Years:"小童應該小於16歲",		
    companions_Years:"其他同行者應該16歲或以上",			
    //WFormItem.vue
    quote_member:'成員',
    sex_title_1:'性别 *',
    account_info_lastname2:'姓 (英文)*',
    account_info_firstname2:'名(英文)*',
    Date_of_Birth:'出生日期 *',
    personal_hkid:'香港身份證',
    info_passport:'護照號碼',
    account_info_hkid:'身份證號碼',
    cancel:'取消',
    Female:'女',
    Male:'男',
    //confirmOrder
    firm_order_title:'你的訂單',
    firm_order_plan_name:'所選計劃',
    firm_order_premium:'保費',
    firm_order_star_date:'本保單之開始日期由',
    firm_order_end_date:'結束日期為',
    firm_order_change:'修改',
    //WOrder.vue
    relationship:'關係',
    Gender:'性别',
    sur_name:'姓 (英文)',
    Given_Name_English:'名（英文)',
    account_info_birthday:'出生日期',
    //payment
    menu_payment:'支付方式',
    products_departure_data:'出發日期',
    travel_checkout_subtotal:'小計',
    agreed_confirm:'請確認您已閱讀並同意',
    we_travel_declarations:'聲明',
    FillInfo_Email_Desc2:'收集個人資料聲明',
    confirm_payment:'選擇支付方式',
    Checkout:'結算',
    checkout_no_levy:'香港保險業監管局由2018年1月1日起收取的保費徵費已包含在保險保費內。有關詳情，可瀏覽保險公司或保險業監管局的網頁',
    
    AddFamilyMember_SelfFlag:'本人',
    adult:'成人',
    child:'小童',
    days:'天',
    checkout_no_levy_message:'已包含保費徵費',
    travel_checkout_total:'總計',
    fail_FAILED:'交易失敗',
    fail_Transaction:'無法處理交易',
    coupon_title:"優惠劵折扣",
    moreLevy:"(瞭解更多關於 保費徵費)",
    levy:"徵費",
    //policyholder.vue
    policyholder:'投保人',
    policy_holder_title:"保單持有人",
    policyholder_number:'投保人必須年滿18周歲',
    policy_holder_age:'保單持有人必須在 {min_age} 至 {max_age} 歲',
    //complete.vue
    travel_successful_title:'完成購買',
    policy_number:'保單號碼:',
    confirm_of_cover:'投保確認書',
    issurer_emailed:'感謝購買！ 保單已經由保險公司透過電郵寄出。',
    agree_acknowledge:'按保險公司之私隱政策，我承認並同意保險公司可以使用本人所提供的個人資料作保險服務用途。',
    //
    'button': '按钮'
}