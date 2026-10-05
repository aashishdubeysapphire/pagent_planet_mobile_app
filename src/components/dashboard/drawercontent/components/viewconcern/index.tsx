import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import {color} from '../../../../../assets/colorConstant';

interface Props {
  reasonType?: string;
  comment?: string;
  disputeStatus?: number;
}

const ViewConcern = ({reasonType, comment, disputeStatus}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.reasonSection}>
        <Text style={styles.headingLabel}>{translations.REASON_ + ': '}</Text>
        <View style={styles.statusType}>
          <Text style={styles.reasonTypeLabel}>{reasonType}</Text>
          <Text
            style={{
              ...styles.statusLabel,
              color: disputeStatus === 0 ? color.UPCOMING : color.RED,
            }}>
            {disputeStatus === 0 ? translations.OPEN : translations.CLOSED}
          </Text>
        </View>
      </View>
      <View style={styles.commentSection}>
        <Text style={styles.headingLabel}>{translations.COMMENT + ': '}</Text>
        <Text style={styles.commentBodyLabel} numberOfLines={8}>
          {comment}
        </Text>
      </View>
    </View>
  );
};

export default ViewConcern;
