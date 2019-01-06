import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class RepositoryItem extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  goToIssues = () => {
    const { repository, navigation } = this.props;
    navigation.navigate('Issues', {
      repository: repository.full_name,
    });
  }

  render() {
    const { repository } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{repository.name}</Text>
          <Text style={styles.owner}>{repository.owner.login}</Text>
        </View>
        <TouchableOpacity onPress={this.goToIssues}>
          <Icon name="chevron-right" size={16} color="#DDD" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(RepositoryItem);
