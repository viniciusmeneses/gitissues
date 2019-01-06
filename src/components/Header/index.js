import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  goBack = async () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {title !== 'GitIssues' && (
        <TouchableOpacity onPress={this.goBack}>
          <Icon name="exchange" size={16} style={styles.icon} />
        </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        <View />
      </View>
    );
  }
}

export default withNavigation(Header);
