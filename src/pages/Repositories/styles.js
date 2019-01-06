import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  searchContainer: {
    margin: metrics.baseMargin * 1.5,
    paddingBottom: metrics.basePadding / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.light,
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: 3,
    paddingHorizontal: 10,
    color: colors.darker,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.light,
  },
  addIcon: {
    margin: 0,
    marginLeft: metrics.baseMargin,
    color: colors.darker,
  },
  listContainer: {
    marginHorizontal: metrics.baseMargin * 1.5,
    flex: 1,
    marginBottom: metrics.baseMargin / 1.2,
  },
});

export default styles;
