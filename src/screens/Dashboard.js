import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import GradientCard from '../components/card';
import {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR} from '../constants/colors';
import TodaysTransaction from '../components/BillItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

function Dashboard(props) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {gradientStyle, balanceText, balanceTitle, button} = styles;
  const onItemPress = (item) =>
    props.navigation.navigate('BillModify', {
      item,
    });

  const categoriesList = props.bills.map((item) => item.category);
  const categories = [...new Set(categoriesList)];

  const bills = selectedCategory
    ? props.bills.filter(
        (bill) => bill.category.toLowerCase() === selectedCategory,
      )
    : props.bills;

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      }}>
      <GradientCard
        style={gradientStyle}
        onPress={() => props.navigation.navigate('Chart')}
        colors={[PRIMARY_COLOR, SECONDARY_COLOR]}>
        <View>
          <Text style={balanceTitle}>Total</Text>
          <Text style={balanceText}>{props.total}</Text>
        </View>
        <View>
          <Text style={balanceTitle}>Bills</Text>
          <Text style={balanceText}>{props.bills.length}</Text>
        </View>
      </GradientCard>

      {/* <Text>{JSON.stringify(props.bills)}</Text> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('BillModify');
          }}>
          <Text style={[button, {backgroundColor: '#E1F5FE'}]}>Add Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Estimate');
          }}>
          <Text style={[button, {backgroundColor: '#FFE0B2'}]}>Estimate</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{...balanceTitle, color: PRIMARY_COLOR, marginVertical: 16}}>
          Bills
        </Text>
        <Text
          style={{paddingHorizontal: 8}}
          onPress={() => setShowFilters(true)}>
          Filter
        </Text>
      </View>

      <FlatList
        data={bills}
        renderItem={({item, index}) => (
          <TodaysTransaction
            key={item.id}
            description={item.description}
            category={item.category}
            amount={item.amount}
            date={item.date.slice(8, 11)}
            month={item.date.slice(5, 7)}
            onPress={() => onItemPress(item)}
          />
        )}
        keyExtractor={(item, index) => String(item.id) + index}
      />

      <View>
        <Modal
          isVisible={showFilters}
          onBackdropPress={() => setShowFilters(false)}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 4,
              width: '70%',
            }}>
            <Text
              style={{marginTop: 8}}
              onPress={() => {
                setSelectedCategory(null);
                setShowFilters(false);
              }}>
              All
            </Text>
            {categories.map((category) => (
              <Text
                style={{marginTop: 8}}
                onPress={() => {
                  setSelectedCategory(category.toLowerCase());
                  setShowFilters(false);
                }}>
                {category}
              </Text>
            ))}
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    height: 160,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  balanceTitle: {
    fontSize: 24,
    color: TEXT_COLOR,
  },
  balanceText: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  total: state.bills.total,
  bills: state.bills.bills,
});

export default connect(mapStateToProps)(Dashboard);
