//3rd party
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

//module
import { doSearch } from '../api/scryfall';
import CardView from '../components/CardView';
import Separator from '../components/Separator';
import useLoadData from '../hooks/useLoadData';
import styled from 'styled-components';

const keyExtractor = (item) => item.id;

const StyledIndicator = styled(ActivityIndicator)`
  margin-top: 5px;
`;

const SearchResults = (props) => {
  const { route } = props;
  const term = route.params.searchTerm;
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, isLoading, error, setData] = useLoadData(
    {
      requestFn: doSearch,
      args: [term],
      defaultValue: {},
    },
    [term]
  );

  useEffect(() => {
    console.log('Search Results Initialized');
  }, []);

  const {
    has_more: hasMore,
    data: items,
    next_page: nextPage,
    total_cards: totalCards,
  } = data;

  if (isLoading) {
    return (
      <View>
        <StyledIndicator size="large" />
        {/* <Text>Loading...</Text> */}
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const onLoadMore = async (...args) => {
    setLoadingMore(true);
    const { data: newData } = await axios.get(nextPage);

    setData({
      ...data,
      has_more: newData.has_more,
      data: [...items, ...newData.data],
      next_page: newData.next_page,
    });
    setLoadingMore(false);
  };

  return (
    <View>
      <Text>
        {`Found ${totalCards} card(s) that match
  "${route.params.searchTerm}"`}
      </Text>
      <Separator />
      <FlatList
        data={items}
        renderItem={(cprops) => <CardView {...cprops} />}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
      {hasMore && !loadingMore && (
        <Button title="Load More" onPress={onLoadMore} />
      )}
      {loadingMore && <Text>Loading More...</Text>}
    </View>
  );
};

export default SearchResults;
