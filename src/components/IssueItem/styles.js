import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    borderColor: colors.lighter,
    padding: metrics.basePadding / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: metrics.baseMargin / 1.5,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
    marginLeft: metrics.baseMargin,
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    lineHeight: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darker,
  },
  owner: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.regular,
  },
});

export default styles;
