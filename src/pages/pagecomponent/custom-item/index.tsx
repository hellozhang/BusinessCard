/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {CustomerModel} from "../../../const/global";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  onClick: any;
  genJinCallback:any;
  customer: CustomerModel;
}

interface State {
}

export default class CustomItem extends PureComponent<Props, State> {

  render() {
    let {onClick, customer,genJinCallback} = this.props;

    return (
      <TouchableButton
        onClick={onClick}
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, h(142), bgColor(commonStyles.whiteColor), mt(14)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
          <View style={styleAssign([styles.uac, styles.udr, mt(20)])}>
            <View style={styleAssign([w(60), h(60), ml(16)])}>
              <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                     src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
              <Image style={styleAssign([w(16), h(16), styles.upa, absB(0), absR(0)])}
                     src={customer.sex === 1 ?`${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
            </View>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>{customer.name}</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), mt(4)])}>{customer.position}</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), mt(3)])}>来自小程序搜索</Text>
            </View>
          </View>
          <View style={styleAssign([bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc,
            w(72), h(28), radiusA(4), mr(16)])}
                onClick={(e) => {
                  e.stopPropagation();
                  genJinCallback(customer);
                  console.log('添加跟进');
                }}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>添加跟进</Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr])}>
          <View style={styleAssign([hRatio(100), styles.uac, styles.ujc])}>
            <Text style={styleAssign([color('#979797'), fSize(14), ml(16)])}>最后转入 12-16 11:15</Text>
          </View>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc, styles.utxdu])}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(14)])}>查看名片</Text>
            </View>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(14), styles.utxdu])}>拨打电话</Text>
            </View>
          </View>
        </View>
      </TouchableButton>
    );
  }
}