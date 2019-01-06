import React, { Component } from 'react';
import {
  View, FlatList, ActivityIndicator, Text, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../../services/api';
import Header from '../../components/Header';
import IssueItem from '../../components/IssueItem';
import styles from './styles';

class Issues extends Component {
  state = {
    issues: [],
    repository: this.props.navigation.getParam('repository'),
    refreshing: false,
    loading: true,
    filter: 'all',
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async (filter = 'all') => {
    this.setState({ loading: true, filter });
    const { repository } = this.state;
    const { data } = await api.get(`/repos/${repository}/issues?state=${filter}`);
    this.setState({
      issues: data,
      loading: false,
    });
  }

  renderList = () => {
    const { issues, refreshing } = this.state;
    if (!issues.length) {
      return <Text style={styles.error}>No issues found</Text>;
    }
    return <FlatList data={issues} keyExtractor={issue => String(issue.id)} renderItem={this.renderListItem} onRefresh={this.loadIssues} refreshing={refreshing} />;
  }

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  render() {
    const { repository, loading, filter } = this.state;
    return (
      <View style={styles.container}>
        <Header title={repository} />
        <View style={styles.issuesContainer}>
          <View style={styles.filterContainer}>
            <TouchableOpacity onPress={() => this.loadIssues()}>
              <Text style={[styles.filterOption, filter === 'all' && styles.filterOptionEnabled]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.loadIssues('open')}>
              <Text style={[styles.filterOption, filter === 'open' && styles.filterOptionEnabled]}>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.loadIssues('closed')}>
              <Text style={[styles.filterOption, filter === 'closed' && styles.filterOptionEnabled]}>Closed</Text>
            </TouchableOpacity>
          </View>
          {loading ? <ActivityIndicator size={22} color="#333" style={styles.loading} /> : this.renderList()}
        </View>
      </View>
    );
  }
}

export default withNavigation(Issues);
