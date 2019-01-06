import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  issuesContainer: {
    margin: metrics.baseMargin * 1.5,
    marginHorizontal: metrics.baseMargin * 1.5,
    flex: 1,
    marginBottom: metrics.baseMargin / 1.2,
  },
  loading: {
    marginTop: metrics.baseMargin,
    alignSelf: 'center',
  },
  error: {
    marginTop: metrics.baseMargin,
    color: colors.danger,
    fontSize: 14,
    // color: colors.darker,
    alignSelf: 'center',
  },
  filterContainer: {
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: metrics.basePadding / 3,
    alignItems: 'center',
    marginBottom: metrics.baseMargin / 1.2,
  },
  filterOption: {
    fontSize: 12,
  },
  filterOptionEnabled: {
    fontWeight: 'bold',
    color: colors.darker,
  },
});

export default styles;
