import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import ManaCost from './ManaCost';

const OracleText = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Spacer = styled.View`
  flex: 1;
`;
const HorizontalView = styled.View`
  display: flex;
  flex-direction: row;
`;
const CardView = (props) => {
  const { item } = props;

  const {
    name,
    mana_cost: manaCost,
    oracle_text: rulesText,
    power,
    toughness,
    loyalty,
    type_line: typeLine,
    set,
  } = item;

  return (
    <View>
      <HorizontalView>
        <Text>{name}</Text>
        <Spacer />
        {manaCost && <ManaCost cost={manaCost} />}
      </HorizontalView>
      <Text>{typeLine}</Text>
      <OracleText>{rulesText}</OracleText>
      <HorizontalView>
        <Text>{set.toUpperCase()}</Text>
        <Spacer />
        {power && (
          <Text>
            {power}/{toughness}
          </Text>
        )}
        {loyalty && <Text>{loyalty}</Text>}
      </HorizontalView>
    </View>
  );
};

export default CardView;
