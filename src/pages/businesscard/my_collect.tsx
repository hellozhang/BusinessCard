/**
 * @filename my_collect.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 我的收藏
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign, toast} from "../../utils/datatool";
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
  mb,
  ml,
  mr,
  mt,
  op,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/business_card';
import {CollectItemModel, User} from "../../const/global";
import {ScrollView, Text, View} from "@tarojs/components";
import CollectItem from "./collect-item";
import BusinessCardRemoveNoticeModal from "./businesscard-remove-notice";

interface Props {
  userInfo: User;
  //获取我收藏的名片列表
  myCollectList: any;
}

interface State {
  currentIndex: number;
  subCurrentIndex: number;
  showOperate: boolean;
  showDeleteNotice: boolean;
  userList: CollectItemModel[];
}

@connect(state => state.login, {...actions})
class MyCollect extends Component<Props, State> {

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
    console.log(this.viewRef);
    this.state = {
      currentIndex: 0,
      subCurrentIndex: 0,
      showOperate: false,
      showDeleteNotice: false,
      userList: []
    }
  }


  componentDidMount() {
    this.myCollectList();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/9
   * @function: 获取我收藏的名片列表
   */
  myCollectList = () => {
    this.props.myCollectList({type: this.state.subCurrentIndex}).then((res) => {
      console.log('获取我收藏的名片列表', res);
      this.setState({userList: res.userList});
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {
    let {currentIndex, subCurrentIndex, showOperate, showDeleteNotice,userList} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View
            style={styleAssign([wRatio(100), h(44), styles.udr, styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac, styles.udr])}
                  onClick={() => {
                    this.setState({currentIndex: 0});
                  }}>
              <View style={styleAssign([styles.uac])}>
                <Text style={styleAssign([fSize(18), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>访客</Text>
                <View
                  style={styleAssign([w(36), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
              </View>
            </View>
            <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                  onClick={() => {
                    this.setState({currentIndex: 1});
                  }}>
              <View style={styleAssign([styles.uac])}>
                <Text style={styleAssign([fSize(18), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>收藏</Text>
                <View
                  style={styleAssign([w(36), h(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
              </View>
            </View>
          </View>
          {
            currentIndex === 1 &&
            <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, styles.udr, mt(10), mb(20)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <View
                  style={styleAssign([styles.uac, styles.ujc, bgColor(subCurrentIndex === 0 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2)])}
                  onClick={() => {
                    this.setState({subCurrentIndex: 0}, () => {
                      this.myCollectList();
                    });
                  }}>
                  <Text
                    style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(subCurrentIndex === 0 ? commonStyles.whiteColor : '#343434')])}>谁收藏了我</Text>
                </View>
                <View
                  style={styleAssign([styles.uac, styles.ujc, bgColor(subCurrentIndex === 1 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2), ml(63)])}
                  onClick={() => {
                    this.setState({subCurrentIndex: 1}, () => {
                      this.myCollectList();
                    });
                  }}>
                  <Text
                    style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(subCurrentIndex === 1 ? commonStyles.whiteColor : '#343434')])}>我收藏了谁</Text>
                </View>
              </View>
            </View>
          }
          <ScrollView
            style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
            scrollY>
            {
              userList.map((value, index) => {
                console.log(value);
                return (<CollectItem key={index} operate={() => {
                  this.setState({showOperate: true});
                }} item={value}/>);
              })
            }
          </ScrollView>
        </View>
        {
          showOperate && <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                               onClick={() => {
                                 this.setState({showOperate: false, showDeleteNotice: true});
                               }}>
            <View
              style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
            <View
              style={styleAssign([wRatio(100), h(120), bgColor(commonStyles.whiteColor), radiusTL(10), radiusTR(10),
                styles.upa, absB(0)])}>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                    }}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>移除名片</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>取消</Text>
              </View>
            </View>
          </View>
        }

        {
          showDeleteNotice && <BusinessCardRemoveNoticeModal cancelCallback={() => {
            this.setState({showDeleteNotice: false});
          }
          } confirmCallback={() => {
            toast('删除成功');
          }
          }/>
        }

      </CustomSafeAreaView>);
  }
}

export default MyCollect;
