import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import useLoadData from '../hooks/useLoadData';
import { getSymbol } from '../api/scryfall';

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
`;
const ManaCostImage = styled.Image`
  width: 19px;
  margin-right: 5px;
`;

const getManaSymbols = (cost) => {
  const shavedCost = cost.slice(1, cost.length - 1);
  return shavedCost.split('}{').map((cost) => `{${cost}}`);
};
const getManaSymbolsForCost = (cost) =>
  Promise.all(getManaSymbols(cost).map((symbol) => getSymbol(symbol)));

const dataSelector = (i) => i;
const ManaCost = (props) => {
  const { cost } = props;
  const [data, isLoading] = useLoadData(
    { requestFn: getManaSymbolsForCost, args: [cost], dataSelector },
    []
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <StyledView>
      {data.map((symbol, idx) => (
        <ManaCostImage source={{ uri: symbol.svg_uri }} key={idx} />
      ))}
    </StyledView>
  );
};

export default ManaCost;
