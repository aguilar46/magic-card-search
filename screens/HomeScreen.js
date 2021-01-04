import React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import Button from '../components/Button';

const StyledInput = styled.TextInput`
  border: solid 2px black;
  margin: 5px;
  height: 25px;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const HomeScreen = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { navigation } = props;

  const onSearch = () => {
    searchTerm && navigation.navigate('Search Results', { searchTerm });
  };

  return (
    <View>
      <StyledInput
        onChangeText={setSearchTerm}
        value={searchTerm}
        onKeyPress={({ key }) => key === 'Enter' && onSearch()}
      />
      <StyledButton title="Search" onPress={onSearch} />
      <StyledButton title="Settings" />
      <Text>Search powered by Scryfall.com</Text>
    </View>
  );
};

export default HomeScreen;
