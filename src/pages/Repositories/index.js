import React, { Component } from 'react';
import {
  View, TextInput, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator,
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
    const repositories = JSON.parse(await AsyncStorage.getItem('@GitIssues:repositories'));
    this.setState({ repositories, refreshing: false });
  }

  fetchNewRepository = async () => {
    const { repositoryInput } = this.state;
    this.setState({ loading: true });

    const { data } = api.get(repositoryInput);
    this.saveNewRepository(data);

    this.setState(({ repositories }) => ({
      repositories: [...repositories, data],
      loading: false,
    }));
  }

  saveNewRepository = async (newRepository) => {
    const { repositories } = this.state;
    await AsyncStorage.setItem('@GitIssues', JSON.stringify([...repositories, newRepository]));
  }

  handleRepositoryInput = text => this.setState({ repositoryInput: text });

  renderList = () => {
    const { repositories, refreshing } = this.state;
    return <FlatList data={repositories} keyExtractor={repo => String(repo.id)} renderItem={this.renderListItem} onRefresh={this.loadReposFromStorage} refreshing={refreshing} />;
  }

  renderListItem = ({ repo }) => <RepositoryItem repository={repo} />;

  render() {
    const { loading, repositoryInput } = this.state;

    return (
      <View>
        <Header title="GitIssues" />
        <View>
          <TextInput value={repositoryInput} autoCapitalize="none" autoCorrect={false} placeholder="user/repository" underlineColorAndroid="transparent" onChangeText={this.handleRepositoryInput} />
          {loading ? <ActivityIndicator /> : (
            <TouchableOpacity onPress={this.fetchNewRepository}>
              <Icon name="add" size={16} />
            </TouchableOpacity>
          )}
        </View>
        <View>
          {this.renderList()}
        </View>
      </View>
    );
  }
}
