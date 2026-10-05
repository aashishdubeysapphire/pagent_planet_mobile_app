// import HTMLView from 'react-native-htmlview';
import RenderHtml from 'react-native-render-html';
import {openWebLink} from '../../utils/helperFunction';
import {StyleSheet, View} from 'react-native';
import {width} from '../../utils/responsiveSize';

interface Props {
  value?: any;
  innerHtmlContentStyle?: any;
  outerHtmlStyle?: any;
}

const CommonHtmlViewer = ({
  value = '',
  innerHtmlContentStyle,
  outerHtmlStyle,
}: Props) => {
  const updatedValue = value
    ?.replace(/<ol>/g, '<ol>\n')
    ?.replace(/<div>/g, '')
    ?.replace(/<\/div>/g, '');
  console.log(updatedValue, 'hTML');
  const source = {
    html: `${value}`,
  };
  return (
    // <HTMLView
    //   value={updatedValue}
    //   stylesheet={{
    //     ...innerHtmlContentStyle,
    //     div: styles.div,
    //   }}
    //   style={outerHtmlStyle}
    //   onLinkPress={url => openWebLink(url)}
    //   addLineBreaks={false}
    //   paragraphBreak={true}

    // />
    <View style={outerHtmlStyle}>
      <RenderHtml contentWidth={width} source={source} />
    </View>
  );
};

export default CommonHtmlViewer;
const styles = StyleSheet.create({div: {borderWidth: 1, margin: 0}});
