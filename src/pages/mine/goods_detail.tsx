/**
 * @filename goods_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 商品详情
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {parseData, styleAssign} from "../../utils/datatool";
import {
  absB,
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  pa,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import {Goods} from "../../const/global";

interface Props {
}

interface State {
  itemData: Goods;
  currentIndex: number;
  carouselUrls: string[];
  detailUrls: string[];
}

@connect(state => state.login, {...actions})
class GoodsDetail extends Component<Props, State> {


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
    let itemData = parseData(this.$router.params.itemData);

    console.log('接受的参数', itemData);

    this.state = {
      itemData: itemData,
      carouselUrls: itemData ? parseData(itemData.carouselUrl) : [],
      detailUrls: itemData ? parseData(itemData.detailUrl) : [],
      currentIndex: 0
    }
  }


  render() {
    let {itemData, currentIndex, carouselUrls,detailUrls} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'商品详情'}/>
        <View style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor),
          pt(5)])}>
          <ScrollView scrollY style={styleAssign([styles.uf1])}>
            {/*商品大图轮播*/}
            <View style={styleAssign([wRatio(100), h(366)])}>
              <View style={styleAssign([wRatio(100), h(313)])}>
                <Swiper
                  style={styleAssign([wRatio(100), hRatio(100)])}
                  circular
                  autoplay
                  onChange={(e) => {
                    this.setState({currentIndex: e.detail.current});
                  }}>
                  {
                    carouselUrls.map((value, index) => {
                      return (<SwiperItem key={index}>
                        <Image style={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0)])}
                               src={value}/>
                      </SwiperItem>);
                    })
                  }
                </Swiper>
                <View style={styleAssign([bgColor('rgba(84,84,84,0.6)'), w(48), h(22), radiusA(10),
                  styles.uac, styles.ujc, styles.upa, absR(19), absB(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{`${currentIndex + 1}/${carouselUrls.length}`}</Text>
                </View>
              </View>
              {/*价格描述*/}
              <View style={styleAssign([wRatio(100), h(54), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
                bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([fSize(21), color('#FA541C')])}>{`¥${itemData.price}`}</Text>
                <Text style={styleAssign([fSize(14), color('#242424')])}>{itemData.name}</Text>
              </View>
            </View>
            {/*商品详情*/}
            <View style={styleAssign([wRatio(100), mt(10), bgColor(commonStyles.whiteColor), styles.uac])}>
              <View style={styleAssign([wRatio(100)])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(20)])}>商品详情</Text>
              </View>
              <View style={styleAssign([wRatio(100), pa(30)])}>
                <Text
                  style={styleAssign([fSize(14), color('#787878')])}>{itemData.introduction}</Text>
              </View>
              {/*图片列表*/}
              {
                detailUrls.map((value, index) => {
                  console.log(value)
                  return (<Image
                    key={index}
                    style={styleAssign([w(336), h(245), mt(8)])}
                    src={value}/>);
                })
              }
            </View>
          </ScrollView>
          {/*分享按钮*/}
          <View style={styleAssign([wRatio(100), h(64), bgColor(commonStyles.whiteColor), styles.uac, styles.ujc])}>
            <TouchableButton
              customStyle={styleAssign([w(335), h(48), styles.uac, styles.ujc, bgColor(commonStyles.colorTheme), radiusA(2)])}>
              <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>立即分享</Text>
            </TouchableButton>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default GoodsDetail;