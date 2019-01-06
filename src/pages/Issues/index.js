import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import api from '../../services/api';

import Header from '../../components/Header';
// import styles from './styles';

class Issues extends Component {
  state = {
    issues: [],
    repository: this.props.navigation.getParam('repository'),
  };

  async componentDidMount() {
    const { repository } = this.state;
    const { data } = await api.get(`/repos/${repository}/issues`);
    this.setState({
      issues: data,
    });
  }

  render() {
    const { repository } = this.state;
    return (
      <View>
        <Header title={repository} />
      </View>
    );
  }
}

export default withNavigation(Issues);
