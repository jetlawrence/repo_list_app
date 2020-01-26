import React from 'react';
import { IRepository } from '../../common/types';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

interface IProps {
  repository: IRepository;
  onPress?: (repository: IRepository) => any;
}

const RepoListItem = React.memo((props: IProps) => (
  <TouchableOpacity
    style={styles.mainContainer}
    onPress={() => props.onPress && props.onPress(props.repository)}>
    <View style={styles.nameContainer}>
      <Text>{props.repository.name}</Text>
    </View>
    <View>
      <Text>{'\u2605' + `${props.repository.stargazersCount}`}</Text>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
  },
});

export default RepoListItem;
