import React, { Component } from 'react';
import {
  View, TextInput, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator, StatusBar, Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RepositoryItem from '../../components/RepositoryItem';
import Header from '../../components/Header';
import styles from './styles';
import api from '../../services/api';

export default class Repositories extends Component {
  state = {
    repositoryInput: '',
    loading: false,
    refreshing: false,
    repositories: [],
  };

  componentDidMount() {
    this.loadReposFromStorage();
  }

  loadReposFromStorage = async () => {
    this.setState({ refreshing: true });
    const repositories = JSON.parse(await AsyncStorage.getItem('@GitIssues:repositories') || '[]');
    this.setState({ repositories, refreshing: false });
  }

  fetchNewRepository = async () => {
    const { repositoryInput } = this.state;
    if (repositoryInput) {
      try {
        this.setState({ loading: true });

        const { data } = await api.get(`/repos/${repositoryInput}`);
        this.saveNewRepository(data);

        this.setState(({ repositories }) => ({
          repositories: [...repositories, data],
          loading: false,
          repositoryInput: '',
        }));
      } catch (err) {
        this.setState({ loading: false });
        Alert.alert('Error', 'Repository not found!');
      }
    }
  }

  saveNewRepository = async (newRepository) => {
    const { repositories } = this.state;
    await AsyncStorage.setItem('@GitIssues:repositories', JSON.stringify([...repositories, newRepository]));
  }

  handleRepositoryInput = text => this.setState({ repositoryInput: text });

  renderList = () => {
    const { repositories, refreshing } = this.state;
    return <FlatList data={repositories} keyExtractor={repo => String(repo.id)} renderItem={this.renderListItem} onRefresh={this.loadReposFromStorage} refreshing={refreshing} />;
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  render() {
    const { loading, repositoryInput } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header title="GitIssues" />
        <View style={styles.searchContainer}>
          <TextInput style={styles.input} value={repositoryInput} autoCapitalize="none" autoCorrect={false} placeholder="user/repository" underlineColorAndroid="transparent" onChangeText={this.handleRepositoryInput} />
          {loading ? <ActivityIndicator size={17} color="#333" style={styles.addIcon} /> : (
            <TouchableOpacity onPress={this.fetchNewRepository}>
              <Icon name="plus" style={styles.addIcon} size={17} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.listContainer}>
          {this.renderList()}
        </View>
      </View>
    );
  }
}
