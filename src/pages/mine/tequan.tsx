/**
 * @filename tequan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 特权
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absB,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mb,
  ml,
  mr,
  mt,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/tequan';
import * as shopActions from '../../actions/shop';
import {Image, ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import LinearGradientView from "../../compoments/linear-gradient-view2/index";
import LevelItem from "../../compoments/level-item/index";
import TaoCanItem from "../../compoments/taocan-item/index";
import {NetworkState} from "../../api/httpurl";
import {ShopStatus, timeMap} from "../../const/global";
import NavigationBar from "../../compoments/navigation_bar";

interface Props {
  //获取特权套餐
  packageList: any;
  //购买套餐
  purchasePackage: any;
  packageStatus: any;
  getShop: any;
}

interface State {
  packageId: number;
  currentIndex: number;
  title1: string;
  subtitle1: string;
  title2: string;
  subtitle2: string;
  packageList: any[];
  scrollTop: number;
  //访客特权
  visitor: number;
  //人脉特权
  connection: number;
  shopStatus: ShopStatus;
}

@connect(state => state.login, {...actions, ...shopActions})
class TeQuan extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {}

  constructor(props) {
    super(props);
    console.log(this.viewRef);
    this.state = {
      shopStatus: ShopStatus.NO_APPLY,
      packageId: 0,
      currentIndex: 0,
      title1: '获取人脉资源，增加客户来源',
      subtitle1: '开通人脉扩展功能，突破每日推送人脉名额限制 根据您的期望人脉选择及个人名片信息，精准推送人脉，提升获客率',
      title2: '特权介绍',
      subtitle2: '• 可查看更多人脉',
      packageList: [],
      scrollTop: 0,
      visitor: 0,
      connection: 0
    }
  }

  componentDidShow() {
    this.packageList();
    this.getShop();
    this.packageStatus();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 获取店铺信息
   */
  getShop = () => {
    console.log('开始获取店铺信息')
    this.props.getShop().then((res) => {
      console.log('获取店铺', res);
      if (res !== NetworkState.FAIL) {
        this.setState({shopStatus: res.status});
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 查看套餐状态
   */
  packageStatus = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.packageStatus().then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        this.setState({visitor: res.visitor, connection: res.connection});
        console.log('查看套餐状态', res);
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 获取特权套餐
   */
  packageList = () => {
    let type = 'connection';

    let {currentIndex} = this.state, packageList: any = [];

    if (currentIndex === 0) {
      type = 'connection';
    } else if (currentIndex === 1) {
      type = 'visitor';
    }
    this.props.packageList({packageType: type}).then((res) => {
      if (res !== NetworkState.FAIL) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].purchaseTime === 'seven_days') {
            packageList.push({
              packageId: res[i].id,
              title: timeMap['seven_days'],
              subTitle: '',
              left: `￥${(res[i].price / 7).toFixed(2)}/天`,
              price: res[i].price,
              timeLimit: true
            });
          } else if (res[i].purchaseTime === 'quarter') {
            packageList.push({
              packageId: res[i].id,
              title: timeMap['quarter'],
              subTitle: '（3个月）',
              left: `￥${(res[i].price / 3).toFixed(0)}/月`,
              price: res[i].price,
            });
          } else if (res[i].purchaseTime === 'half_a_year') {
            packageList.push({
              packageId: res[i].id,
              title: timeMap['half_a_year'],
              subTitle: '（6个月）',
              left: `￥${(res[i].price / 6).toFixed(0)}/月`,
              price: res[i].price,
            });
          } else if (res[i].purchaseTime === 'one_year') {
            packageList.push({
              packageId: res[i].id,
              title: timeMap['one_year'],
              subTitle: '（12个月）',
              left: `￥${(res[i].price / 12).toFixed(0)}/月`,
              price: res[i].price,
            });
          }
        }
        this.setState({packageList, packageId: packageList.length !== 0 ? packageList[0].packageId : 0});
      }
      console.log('获取特权套餐', res);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 购买套餐
   */
  purchasePackage = (packageId) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.purchasePackage({packageId}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        console.log('购买套餐', res);
        Taro.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success(res) {
            console.log('支付成功', res);
          },
          fail(res) {
            console.log('支付失败', res);
          }
        });
      }
      console.log('获取特权套餐', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {packageId, scrollTop, title1, subtitle1, title2, subtitle2, packageList, currentIndex, visitor, connection, shopStatus} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <ScrollView
          style={styleAssign([styles.upa, absT(0), wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor)])}
          scrollY
          onScroll={(e: any) => {
            this.setState({scrollTop: e.detail.scrollTop});
            console.log(e.detail);
          }}>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 287 : 267), mt(0)])}>
            <LinearGradientView style={styleAssign([wRatio(100), h(iphoneX() ? 222 : 182)])}/>
            <Swiper
              style={styleAssign([wRatio(100), h(182), styles.uac, styles.upa, absB(0)])}
              onChange={(e) => {
                this.setState({currentIndex: e.detail.current}, () => {
                  this.packageList();
                  if (this.state.currentIndex === 0) {
                    this.setState({
                      title1: '获取人脉资源，增加客户来源',
                      subtitle1: '开通人脉扩展功能，突破每日推送人脉名额限制 根据您的期望人脉选择及个人名片信息，精准推送人脉，提升获客率',
                      title2: '特权介绍',
                      subtitle2: '• 可查看更多人脉'
                    });
                  } else if (this.state.currentIndex === 1) {
                    this.setState({
                      title1: '查看访客无限制',
                      subtitle1: '查看来访人员不再限制在7天内，开通此特权之后可查看所有访客信息，并获取专属个人访客分析',
                      title2: '特权介绍',
                      subtitle2: '• 可查看全部访客的信息'
                    });
                  } else if (this.state.currentIndex === 2) {
                    this.setState({
                      title1: '开通店铺，展示更多产品',
                      subtitle1: '开通店铺之后您将拥有专属线上店铺，我们将为您免费装修店铺并上架您的产品',
                      title2: '特权介绍',
                      subtitle2: '• 可展示更多产品\n• 可进行线上产品购买交易'
                    });
                  }
                });
              }}>
              {
                [
                  {
                    title: '结识更多人脉',
                    subTitle: '会员每月增30个精准人脉推荐',
                    bg: 'ico_tequan3.png',
                    logo: 'ico_tequan3_logo.png',
                    buttonTitle: '新用户1元试用',
                    right: '最低￥198起'
                  },
                  {
                    title: '查看全部访客',
                    subTitle: '随时了解谁对你感兴趣',
                    bg: 'ico_tequan1.png',
                    logo: 'ico_tequan1_logo.png',
                    buttonTitle: '新用户1元试用',
                    right: '最低￥198起'
                  }, {
                  title: '开通店铺',
                  subTitle: '提升你的产品线上推广效果',
                  bg: 'ico_tequan2.png',
                  logo: 'ico_tequan2_logo.png',
                  buttonTitle: '联系客服',
                  right: '免费装修店铺'
                }].map((value, index) => {
                  return <SwiperItem key={index}>
                    <LevelItem key={index} item={value}/>
                  </SwiperItem>
                })
              }
            </Swiper>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(16), styles.udr])}>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
            <Text style={styleAssign([ml(8), mr(8), color('#483311'), fSize(14)])}>功能详情</Text>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
          </View>
          <View style={styleAssign([wRatio(100), pl(20), pr(20), mt(14)])}>
            <Text style={styleAssign([color('#343434'), fSize(14)])}>{title1}</Text>
            <Text
              style={styleAssign([color('#979797'), fSize(14), mt(6)])}>{subtitle1}</Text>
          </View>
          <View style={styleAssign([wRatio(100)])}>
            <View style={styleAssign([wRatio(100), pl(20), pr(20), mt(30),
              styles.udr, styles.ujb, styles.uac])}>
              <Text style={styleAssign([color('#343434'), fSize(14)])}>{title2}</Text>
              <View style={styleAssign([styles.udr, styles.uac])}
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/mine/renmai_taocan_detail?type=${currentIndex === 0 ? 'renmai' : (currentIndex === 1 ? 'fangke' : 'shop') }&packageId=${packageList[0].packageId}&openState=${currentIndex === 0 ? connection : visitor}&shopStatus=${shopStatus}`
                      });
                    }}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>详情</Text>
                <Image style={styleAssign([w(7), h(12), ml(8)])} src={require('../../assets/ico_next_orange.png')}/>
              </View>
            </View>
            <View style={styleAssign([styles.uac, styles.udr, mt(6), ml(20)])}>
              <Text style={styleAssign([color('#979797'), fSize(14), ml(8)])}>{subtitle2}</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(18), styles.udr])}>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
            <Text
              style={styleAssign([ml(8), mr(8), color('#483311'), fSize(14)])}>{`${ currentIndex !== 2 ? '开通套餐推荐' : '开通优势介绍'}`}</Text>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
          </View>
          {
            currentIndex !== 2 && packageList.map((value, index) => {
              return <TaoCanItem key={index} item={value}
                                 onClick={() => {
                                   this.setState({packageId: value.packageId});
                                 }
                                 }
                                 checked={value.packageId === packageId}/>;
            })
          }
          {
            currentIndex !== 2 && <View style={styleAssign([styles.uf1, mb(20)])}>
              {/*开通*/}
              <View style={styleAssign([wRatio(100), h(44), styles.uac, styles.ujc, mt(20)])}>
                <View style={styleAssign([w(335), h(44), radiusA(2), styles.uac, styles.ujc, bgColor('#E2BB7B')])}
                      onClick={() => {
                        this.purchasePackage(packageId);
                      }}>
                  <Text
                    style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>{currentIndex === 0 && connection === 1 || currentIndex === 1 && visitor === 1 ? '继续开通' : '立即开通'}</Text>
                </View>
              </View>
              <View style={styleAssign([wRatio(100), pl(20), pr(20), mt(17)])}>
                <Text style={styleAssign([color('#979797'), fSize(13)])}>购买须知</Text>
                <Text style={styleAssign([color('#979797'), fSize(13)])}>支付完成之时起5分钟内生效</Text>
              </View>
            </View>
          }
          {
            currentIndex === 2 &&
            <View style={styleAssign([styles.uf1, pl(20), pr(20), mt(14)])}>
              <Text
                style={styleAssign([color('#979797'), fSize(13)])}>1.用户只需通过填写基本信息提交申请，客服会主动联系用户为用户详细介绍开通店铺相关事项及收费标准；\n2.平台会根据不同用户的需求，定制专属店铺，便于商品上架和管理；\n3.用户同意开通店铺后，我们将为用户量身打造专属店铺，并根据商品相应风格免费为用户装修店铺；</Text>
              <View style={styleAssign([wRatio(100), h(44), styles.uac, styles.ujc, mt(20)])}>
                <View style={styleAssign([w(335), h(44), radiusA(2), styles.uac, styles.ujc, bgColor('#E2BB7B')])}
                      onClick={() => {
                        if(shopStatus === ShopStatus.NO_APPLY){
                          Taro.navigateTo({
                            url: `/pages/mine/shop_apply`
                          });
                        }
                      }}>
                  <Text
                    style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>{shopStatus === ShopStatus.NO_APPLY ? '立即申请' : '已申请'}</Text>
                </View>
              </View>
              <Text
                style={styleAssign([color('#979797'), fSize(13), mt(17)])}>• 申请提交成功之后，我们客服会在12小时内联系您</Text>
            </View>
          }
        </ScrollView>
        <NavigationBar style={styleAssign([styles.upa, absT(0), op((300 - scrollTop) / 300)])}>
          <View
            style={styleAssign([wRatio(100), h(44), styles.ujb, styles.udr, styles.uac])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_back_white.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <Text style={styleAssign([fSize(19), color(commonStyles.whiteColor)])}>特权开通</Text>
            <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
          </View>
        </NavigationBar>
      </CustomSafeAreaView>
    );
  }
}

export default TeQuan;
