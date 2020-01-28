/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 客户资料界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  mb,
  ml,
  mt,
  padding,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign, wrapSafe} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import {CustomerDetailModel} from "../../const/global";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
  getCustomerDetail?: any;
}

interface State {
  customer: CustomerDetailModel;
}

@connect(state => state.login, {...actions})
class CustomerZiLiao extends Component<Props, State> {
  private id: string;
  private viewRef;

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.id = this.$router.params.id;
    this.state = {
      customer: {
        aboutUrl: '',
        avatar: '',
        birthday: '',
        city: '',
        company: '',
        createTime: '',
        customerUserId: 0,
        detailAddress: '',
        email: '',
        id: 0,
        industry: '',
        intentionGrade: '',
        label: '',
        name: '',
        phone: '',
        position: '',
        province: '',
        remark: '',
        sex: 0,
        type: 0,
        updateTime: '',
        userId: 0,
        wechat: '',
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.getCustomerDetail();
  }

  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/14
   * @function: 获取客户详细资料
   */
  getCustomerDetail = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getCustomerDetail({id: this.id}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res) {
        this.setState({customer: res});
      }
      console.log('获取客户详细资料', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {customer} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'客户详细资料'}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*头像*/}
          <View style={styleAssign([wRatio(100), h(86), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
            <Image style={styleAssign([w(66), h(66), ml(21)])}
                   src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : require('../../assets/ico_default.png')}/>
            <View style={styleAssign([w(240), hRatio(100), styles.ujb,
              ml(15)])}>
              <Text style={styleAssign([fSize(18), mt(17), color('#343434')])}>
                {customer.name}
              </Text>
              <View style={styleAssign([w(240), mb(23), styles.udr, styles.uac, styles.ujb])}>
                <Text style={styleAssign([fSize(14), color('#353535')])}>
                  {customer.position}
                </Text>
                <View style={styleAssign([styles.uac, styles.udr])}
                onClick={()=>{
                  Taro.navigateTo({
                    url: `/pages/customer/customer_remark?id=${this.id}`
                  });
                }}>
                  <Text style={styleAssign([fSize(14), color('#343434')])}>
                    添加备注
                  </Text>
                  <Image style={styleAssign([w(12), h(12), ml(10)])} src={require('../../assets/ico_edit_mark.png')}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {
            [{title: '来源', value: customer.type === 1 ? '平台' : '手动录入'},
              {title: '手机', value: wrapSafe(customer.phone)},
              {title: '性别', value: customer.sex === 1 ? '男' : '女'},
              {title: '公司', value: wrapSafe(customer.company)},
              {title: '行业', value: wrapSafe(customer.industry)},
              {title: '职位', value: wrapSafe(customer.position)},].map((value, inedx) => {
              return <View key={inedx} style={styleAssign([wRatio(100), styles.uac, bgColor(commonStyles.whiteColor)])}>
                <View
                  style={styleAssign([wRatio(100), h(50), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor),
                    pl(20), pr(20)])}>
                  <Text style={styleAssign([fSize(14), color('#727272')])}>
                    {value.title}
                  </Text>
                  <Text style={styleAssign([fSize(14), color('#343434')])}>
                    {value.value}
                  </Text>
                </View>
                <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              </View>;
            })
          }
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {
            [{title: '地区', value: wrapSafe(customer.province + customer.city)},
              {title: '详细地址', value: wrapSafe(customer.detailAddress)},
              {title: '生日', value: wrapSafe(customer.birthday)},
              {title: '微信号', value: wrapSafe(customer.wechat)},
              {title: '邮箱', value: wrapSafe(customer.email)}].map((value, inedx) => {
              return <View key={inedx} style={styleAssign([wRatio(100), styles.uac, bgColor(commonStyles.whiteColor)])}>
                <View
                  style={styleAssign([wRatio(100), h(50), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor),
                    pl(20), pr(20)])}>
                  <Text style={styleAssign([fSize(14), color('#727272')])}>
                    {value.title}
                  </Text>
                  <Text style={styleAssign([fSize(14), color('#343434')])}>
                    {value.value}
                  </Text>
                </View>
                <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              </View>;
            })
          }
          {/*常用标签*/}
          <View style={styleAssign([wRatio(100), h(154), mt(8), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#727272'), ml(20), mt(16)])}>Ta的标签</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(8),
              styles.uWrap])}>
              {
                ['90后', '看电影', '电竞游戏', '运动', '健身', '看书', '旅行'].map((value, index) => {
                  return (<TouchableButton key={index}
                                           customStyle={styleAssign([ml(24), mt(12), radiusA(14), padding([6, 16, 6, 16]),
                                             bgColor('#EFEFEF')])}>
                    <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme)])}>{value}</Text>
                  </TouchableButton>);
                })
              }
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}


export default CustomerZiLiao