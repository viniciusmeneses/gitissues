import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, TouchableOpacity, Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const IssueItem = ({ issue }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{issue.title}</Text>
      <Text style={styles.owner}>{issue.user.login}</Text>
    </View>
    <TouchableOpacity onPress={() => Linking.openURL(issue.html_url)}>
      <Icon name="chevron-right" size={16} color="#DDD" />
    </TouchableOpacity>
  </View>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
  }).isRequired,
};

export default IssueItem;
