import React, {Component} from 'react';
import {
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {BORDER_COLOR, PRIMARY_COLOR, TEXT_COLOR} from '../constants/colors';
import {store} from '../../store';
import {actionTypes} from '../reducers/bills';
import {v4 as uuidv4} from 'uuid';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      category: '',
      description: '',
      amount: '',
      error: '',
    };
  }

  componentDidMount() {
    const item = this.props.route.params?.item ?? false;

    if (item) {
      const {category, description, amount, date, id} = item;
      this.setState({
        category,
        description,
        amount,
        date,
        id,
      });
    }
  }

  updateState = (key, value) => {
    this.setState({
      [key]: value,
      error: '',
    });
  };

  onSaveClick = () => {
    const {category, description, amount, date} = this.state;
    if (!description) {
      this.setState({
        error: '* Please enter the description of the bill',
      });

      return;
    }
    if (!category) {
      this.setState({
        error: '* Please enter your category',
      });
      return;
    }

    if (!amount) {
      this.setState({
        error: '* Please enter the bill amount.',
      });
      return;
    }
    const item = this.props.route.params?.item ?? false;

    if (item) {
      store.dispatch({
        type: actionTypes.UPDATE_BILL,
        payload: {
          id: item.id,
          description,
          category,
          amount,
          date,
        },
      });
      this.props.navigation.goBack();

      return;
    }

    store.dispatch({
      type: actionTypes.ADD_BILL,
      payload: {
        id: Date.now(),
        description,
        category,
        amount,
        date,
      },
    });
    this.props.navigation.goBack();
  };

  onDelete = () => {
    const {id} = this.state;
    const item = this.props.route.params?.item ?? false;

    store.dispatch({
      type: actionTypes.DELETE_BILL,
      payload: {
        id,
        amount: item.amount,
      },
    });
    this.props.navigation.goBack();
  };

  render() {
    const {
      container,
      inputContainer,
      inputTitleText,
      saveButtonStyle,
      buttonTextStyle,
    } = styles;

    const {description, category, amount, date, error, id} = this.state;

    return (
      <ScrollView style={container}>
        <Text style={{fontSize: 10, color: 'red'}}>{error}</Text>
        <Text style={inputTitleText}>Description</Text>
        <TextInput
          style={inputContainer}
          value={description}
          onChangeText={(text) => this.updateState('description', text)}
        />

        <Text style={inputTitleText}>Category</Text>
        <TextInput
          style={inputContainer}
          value={category}
          onChangeText={(text) => this.updateState('category', text)}
        />

        <Text style={inputTitleText}>Amount</Text>
        <TextInput
          style={inputContainer}
          value={amount}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          onChangeText={(text) => this.updateState('amount', text)}
        />

        <Text style={inputTitleText}>Date</Text>

        <DatePicker
          style={{width: '100%', marginTop: 16, border: 0}}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 4,
              marginLeft: 0,
              borderWidth: 0,
            },
            dateInput: {
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: BORDER_COLOR,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({date: date});
          }}
        />

        <TouchableOpacity style={saveButtonStyle} onPress={this.onSaveClick}>
          <Text style={buttonTextStyle}>{id ? 'Update' : 'Save'}</Text>
        </TouchableOpacity>

        {id && (
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 16}}
            onPress={this.onDelete}>
            <Text style={{color: PRIMARY_COLOR}}>Delete</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  inputContainer: {
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    padding: 16,
  },
  inputTitleText: {
    marginTop: 8,
  },
  saveButtonStyle: {
    alignSelf: 'center',
    padding: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 32,
    backgroundColor: PRIMARY_COLOR,
  },
  buttonTextStyle: {
    color: TEXT_COLOR,
  },
});
