/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的商品
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, pa, radiusA, w, wRatio} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  goToMoreGoods: any;
  goToGoodsDetail: any;
}

interface State {
}

export default class MyGoods extends PureComponent<Props, State> {

  render() {

    let {goToMoreGoods,goToGoodsDetail} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的商品</Text>
        </View>
        <View style={styleAssign([styles.uWrap, styles.udr, styles.uja, wRatio(100), mt(16)])}>
          {
            [1, 2, 3, 4].map((value, index) => {
              console.log(value);
              return (
                <TouchableButton customStyle={styleAssign([w(163), h(233), pa(8), bgColor(commonStyles.whiteColor)])} key={index}
                onClick={goToGoodsDetail}>
                  <Image style={styleAssign([w(147), h(152), radiusA(4)])}
                         src={require('../../../assets/ico_default.png')}/>
                  <Text
                    style={styleAssign([fSize(12), color(commonStyles.colorTheme), ml(8), mt(12)])}>现代简约双人木床</Text>
                  <Text style={styleAssign([fSize(10), color('#FA6B57'), ml(8), mt(12), mt(8)])}>￥688</Text>
                </TouchableButton>);
            })
          }
        </View>
        {/*查看更多*/}
        <TouchableButton customStyle={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(16)])}
        onClick={goToMoreGoods}>
          <Text style={styleAssign([fSize(12), color('#979797')])}>查看更多</Text>
        </TouchableButton>
      </View>
    );
  }
}
