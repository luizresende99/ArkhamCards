import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Switch from '@components/core/Switch';
import typography from '@styles/typography';
import space from '@styles/space';
import COLORS from '@styles/colors';
import StyleContext, { StyleContextType } from '@styles/StyleContext';

interface Props {
  code: string;
  name: string;
  color?: string;
  selected: boolean;
  onChoiceToggle: (code: string) => void;
  editable: boolean;
}

export default class CheckListItemComponent extends React.Component<Props> {
  static contextType = StyleContext;
  context!: StyleContextType;

  _toggle = () => {
    const {
      onChoiceToggle,
      code,
    } = this.props;
    onChoiceToggle(code);
  };

  render() {
    const {
      name,
      editable,
      color,
      selected,
    } = this.props;
    const { gameFont } = this.context;
    if (!editable && !selected) {
      return null;
    }
    return (
      <View style={[
        styles.row,
        space.paddingS,
        space.paddingSideM,
        color ? { backgroundColor: color } : {},
      ]}>
        <Text style={[
          typography.mediumGameFont,
          { fontFamily: gameFont },
          styles.nameText,
          color ? { color: 'white' } : {},
        ]}>
          { name }
        </Text>
        { editable ? (
          <Switch
            onValueChange={this._toggle}
            customColor="white"
            customTrackColor={color ? '#ccc' : undefined}
            value={selected}
          />
        ) : (
          <MaterialCommunityIcons
            name="check"
            size={18}
            color={color ? 'white' : COLORS.darkText}
          />
        ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontWeight: '600',
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
