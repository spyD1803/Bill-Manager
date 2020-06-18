import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DISABLED_COLOR, PRIMARY_COLOR} from '../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MONTHS = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

export default class TodaysTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      container,
      dateContainer,
      dateStyle,
      monthStyle,
      categoryText,
      reasonText,
      amountContainer,
    } = styles;

    const {
      backgroundColor,
      dateColor,
      positive,
      description,
      amount,
      category,
      date,
      month,
      onPress,
    } = this.props;

    return (
      <TouchableOpacity style={container} onPress={onPress}>
        <View style={[dateContainer, {backgroundColor}]}>
          <Text style={[dateStyle, {color: dateColor}]}>{date}</Text>
          <Text style={[monthStyle, {color: dateColor}]}>{MONTHS[month]}</Text>
        </View>
        <View style={{flex: 1, marginLeft: 16}}>
          <Text style={reasonText}> {description} </Text>
          <Text style={categoryText}> {category} </Text>
        </View>
        <View style={amountContainer}>
          <Text
            style={{
              color: PRIMARY_COLOR,
              fontSize: 16,
              marginLeft: 8,
            }}>
            {amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },

  dateContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  dateStyle: {
    fontSize: 24,
  },

  monthStyle: {
    fontSize: 16,
  },

  descriptionStyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
  },

  reasonText: {
    fontSize: 20,
  },

  categoryText: {
    fontSize: 14,
    color: DISABLED_COLOR,
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});
