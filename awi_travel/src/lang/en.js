

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 18:32:50
 * @LastEditTime: 2019-12-07 10:53:32
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import Vuex from 'vuex';
import store from '../store/index';
Vue.use(Vuex);
export default {
    //index.vue
    loading:'loading...',
    account_customer_service:'Customer Service',
    products_choose_plan_coverage_title1:'Coverage Details',
    product_decs_key_title:'Key Features',
    product_decs_key_more:'more', //更多
    hide:'hide',
    Quote:'Quote',
    btn_back:'Back',
    products_proceed:'Proceed',
    In_one_policy:"In one policy:",
    discount500:"HKD 500 discount/off for any purchases of HKD 1,000 or above",
    discount100:"HKD 100 discount/off for any purchases of HKD 200 or above",
    discount50:"HKD 50 discount/off for any purchases of HKD 100 or above",
    terms_notice:"Starr Insurance Companies reserves the right to change, add or delete any terms and conditions herein, without prior notice.",
    request_error_toast2:"The request failed!",
    language:'語言/Language',
    //travelinfo.vue
    pc_tra_title1:'Travel Insurance',
    departure_return: 'Departure and Return Date',
    quote_departure_date: 'DEPARTURE DATE',
    quote_return_date: 'RETURN DATE',
    products_return_data:'Return Date',
    member_companion: 'Companion(s)',
    quote_members: 'Members',
    ship_myself:'Myself', //本人
    ship_my_spouse:'My Spouse', //伴侣
    ship_child:'My Child', //子女
    age_below:'aged below 16',
    Family_friends:"Family and friends",
    product_show_my_results:'Show My Results',//显示价钱
    insurance_toast:'Please type in the required information before you proceed.',
    setPolicyholder:'Child under 18 is not eligible to be the Policyholder! Please add a Policyholder to proceed your purchase! The Policyholder does not need to be one of the companions',
    moreThanEight:'We can only issue policy with commencement date not more than 180 days from today. Please re-submit the application later.',
    minPeople:'The maximum number of companion is ',
    travel_annaul_toast:'The date of choice should be greater than the date of the day.',
    moreDays:'We can only issue policy with commence date no more than 180 days from today. Please re-submit the application later.',
    //infocinfirm
    Days:'Days',
    //login.vue
    login_welcome:'Welcome!',
    input_number_email:'Enter your mobile number and email to continue',
    input_number:'Enter your mobile number',
    login_email_1:'Enter Your Emai',
    ePolicy:'(ePolicy will be sent to your email address written above)',
    clickNext:'If you click on “Next” below, it means that you agree to our',
    otg_terms:'Terms',
    and:'and',
    privacy_policies:'privacy policies',
    info_doc_data_next:'Next',
    login_wel_content:'Enter your mobile number to continue.',
    validPhone:'Please enter a valid phone number',
    validEmail:'Please enter valid email number', //有效郵箱
    //prompt.vue
    hl_insurance_start_notes1:'Important notes',
    et_enter:'Enter',
    //MemberData.vue
    account_add_member:'Add Member',
    confirm:'Confirm',
    notInformation:'There is information not filled in',
    LastNameIncorrect:'Incorrect last name,English only and not null',//姓氏輸入有誤
    NameIncorrect:'The name cannot be empty',
    passportErr:'The passport input error',
    member_toast_age:"Does not meet the requirement of insurance age",
    card_hk_desc:'HKID Card number is A123456(7), please input A1234567',
    children_Years:"Children should be under 16 years old",	
    companions_Years:"The other companion(s) should be over 16 years old",


    //WFormItem.vue
    quote_member:'Member',
    sex_title_1:'Gender *',
    Date_of_Birth:'Date of Birth*',
    personal_hkid:'HKID', //香港身份证
    info_passport:'Passport Number',
    account_info_hkid:'HKID Number',
    cancel:'Cancel',
    Female:'Female',
    Male:'Male',
    onlyOne:'Hong Kong identity card and passport can only be one or the other',
    //confirmOrder
    firm_order_title:'Your Order',
    firm_order_plan_name:'Your Plan',
    firm_order_premium:'Premium',
    firm_order_star_date:'Policy is effective from',
    firm_order_end_date:'End date',
    firm_order_change:'Edit',
    //WOrder.vue
    relationship:'Relationship',
    Gender:'Gender',
    account_info_lastname2:'Surname (English) *',
    account_info_firstname2:'Given Name(English)*',
    account_info_birthday:'Date of Birth*',
    //payment
    menu_payment:'Payment',
    products_departure_data:'Departure Date',
    travel_checkout_subtotal:'Subtotal',
    agreed_confirm:'Please confirm you have read and agreed with the',
    we_travel_declarations:'Declarations',
    FillInfo_Email_Desc2:'Personal Information Collection Statement',
    confirm_payment:'Payment Method',
    Checkout:'Checkout',
    checkout_no_levy:'Levy on insurance premium imposed by the Insurance Authority of Hong Kong effective 01 Jan 2018 has been included in the premium. For details, you can visit the website of the insurer or Insurance Authority',
    
    AddFamilyMember_SelfFlag:'Me',
    adult:'adult',
    child:'child',
    days:'days',
    checkout_no_levy_message:'Levy Inclusive',
    travel_checkout_total:'Total',
    fail_FAILED:'Transaction FAILED',
    fail_Transaction:'Failed to Process Transaction',
    coupon_title:"Discount",
    
    moreLevy:"(Know more about IA Levy collection)",
    levy:"Levy",	
    //policyholder.vue
    policyholder:'Policyholder',
    policy_holder_title:"Policy holder",
    policyholder_number:'Policyholder must be 18 or above',
    policy_holder_age:"Policy holder age must be {min_age} to {max_age} years old",
    //complete.vue
    travel_successful_title:'Purchase Complete',
    policy_number:'Policy Number:',
    confirm_of_cover:'Confirmation of Cover',
    issurer_emailed:'Thank you! Insurer has already emailed you the policy!',
    agree_acknowledge:"I acknowledge and agree that insurer shall use the Personal data I have provided for the purposes of providing insurance services in accordance with insurer's Privacy policy",
    //
    'button': 'button'
}