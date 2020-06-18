import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';

const Chart = (props) => {
  const data = props.bills.reduce((acc, cur) => {
    if (acc[cur.category]) {
      return {
        ...acc,
        [cur.category]: Number(acc[cur.category]) + Number(cur.amount),
      };
    } else {
      return {...acc, [cur.category]: cur.amount};
    }
  }, {});
  const categoriesList = props.bills.map((item) => item.category);
  const categories = [...new Set(categoriesList)];

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Text style={{padding: 16}}>Current Bill's</Text>
      <LineChart
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.keys(data).map((item) => data[item]),
            },
          ],
        }}
        width={Dimensions.get('screen').width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          margin: 8,
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  total: state.bills.total,
  bills: state.bills.bills,
});

export default connect(mapStateToProps)(Chart);
