import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {BORDER_COLOR} from '../constants/colors';
import TodaysTransaction from '../components/BillItem';

const Estimate = (props) => {
  const [budget, setBudget] = useState('');
  const {container, textInputStyle} = styles;
  const {bills} = props;

  const getBudgetItems = (budget) => {
    let remainingBudget = Number(budget);
    const bills = props.bills;
    bills.sort((a, b) =>
      a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0,
    );
    let inbudgetBills = [];

    for (let index = 0; index < bills.length; index++) {
      const element = bills[index];
      if (Number(element.amount) <= remainingBudget) {
        inbudgetBills = [...inbudgetBills, element];
        remainingBudget = remainingBudget - Number(element.amount);
      }
    }

    return inbudgetBills;
  };
  const inBudget = getBudgetItems(budget);

  return (
    <View style={container}>
      <Text>Budget</Text>
      <TextInput
        value={budget}
        style={textInputStyle}
        keyboardType={'numeric'}
        textContentType={'telephoneNumber'}
        onChangeText={(budget) => setBudget(budget)}
      />
      {budget !== '' ? (
        inBudget.length > 0 ? (
          <FlatList
            data={inBudget}
            renderItem={({item, index}) => (
              <View>
                <TodaysTransaction
                  key={item}
                  description={item.description}
                  category={item.category}
                  amount={item.amount}
                  date={item.date.slice(8, 11)}
                  month={item.date.slice(5, 7)}
                  onPress={() => {}}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.id || index}
          />
        ) : (
          <Text style={{marginTop: 16, textAlign: 'center'}}>
            No bills available
          </Text>
        )
      ) : (
        <Text style={{marginTop: 16, textAlign: 'center'}}>
          Please enter your budget
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textInputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    padding: 16,
  },
});

const mapStateToProps = (state) => ({
  bills: state.bills.bills,
});

export default connect(mapStateToProps)(Estimate);
