/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 极致名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Button, Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {
  absB,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {cloudBaseUrl} from "../../api/httpurl";
import {CompanyCardModel} from "../../const/global";
import SingleLineText from "../singleline-text";


interface Props {
  display?: any;
  companyCard: CompanyCardModel;
}

interface State {
}

export default class CompanyCard extends PureComponent<Props, State> {

  render() {
    let {display, companyCard} = this.props;

    return (
      <View style={styleAssign([wRatio(90), {display: display ? display : 'inline-block'}])}>
        <View
          style={styleAssign([{width: '95%'}, {marginLeft: '2.5%'}, mt(16), h(177), bgColor(commonStyles.whiteColor)])}>

          <View style={styleAssign([styles.uac])}>
            <View style={styleAssign([styles.udr, styles.ujb, pl(16), pt(16), pr(16)])}>
              <View style={styleAssign([])}>
                <Text style={styleAssign([fSize(18), color(commonStyles.colorTheme)])}>{companyCard.name}</Text>
                <SingleLineText
                  style={styleAssign([fSize(14), color(commonStyles.colorTheme), mt(4)])} text={`${companyCard.company}·${companyCard.position}`}/>
              </View>
              <Image style={styleAssign([w(66), h(66), radiusA(33)])}
                     src={companyCard.avatar}/>
            </View>
            <View style={styleAssign([wRatio(100)])}>
              <View style={styleAssign([ml(16), styles.udr, styles.uac])}>
                <Image style={styleAssign([w(12), h(10)])} src={`${cloudBaseUrl}ico_wechat_gray.png`}/>
                <Text
                  style={styleAssign([fSize(12), color('#979797'), ml(4)])}>{companyCard.wechat}</Text>
              </View>
              <View style={styleAssign([ml(16), styles.udr, styles.uac])}>
                <Image style={styleAssign([w(12), h(10)])} src={`${cloudBaseUrl}ico_phone_gray.png`}/>
                <Text
                  style={styleAssign([fSize(12), color('#979797'), ml(4)])}>{companyCard.phone}</Text>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), styles.upa, absB(0)])}>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View
              style={styleAssign([wRatio(100), h(44), styles.udr, styles.uac])}>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                <View style={styleAssign([styles.udr, styles.uac])}
                      onClick={() => {
                        Taro.makePhoneCall({
                          phoneNumber: companyCard.phone
                        })
                      }}>
                  <Image style={styleAssign([w(18), h(18)])} src={`${cloudBaseUrl}ico_call.png`}/>
                  <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), ml(11)])}>拨打电话</Text>
                </View>
              </View>
              <View style={styleAssign([w(1), h(19), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                <Button openType={'share'}
                        style={styleAssign([styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
                  <Image style={styleAssign([w(18), h(18)])} src={`${cloudBaseUrl}ico_share.png`}/>
                  <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), ml(11)])}>分享名片</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}