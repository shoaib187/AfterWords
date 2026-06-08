import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';

const Stories = () => {
  const [storiesData, setStoriesData] = useState([
    {
      id: '1',
      username: 'johndoe',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      timestamp: Date.now(),
      isViewed: false,
      media: [
        {
          type: 'image',
          url: 'https://picsum.photos/id/1/400/800',
        },
        {
          type: 'image',
          url: 'https://picsum.photos/id/2/400/800',
        },
      ],
    },
    {
      id: '2',
      username: 'janedoe',
      userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      timestamp: Date.now() - 3600000,
      isViewed: false,
      media: [
        {
          type: 'image',
          url: 'https://picsum.photos/id/3/400/800',
        },
      ],
    },
    {
      id: '3',
      username: 'mike_roberts',
      userAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      timestamp: Date.now() - 7200000,
      isViewed: true,
      media: [
        {
          type: 'image',
          url: 'https://picsum.photos/id/4/400/800',
        },
        {
          type: 'image',
          url: 'https://picsum.photos/id/5/400/800',
        },
        {
          type: 'image',
          url: 'https://picsum.photos/id/6/400/800',
        },
      ],
    },
    {
      id: '4',
      username: 'sarah_wilson',
      userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      timestamp: Date.now() - 86400000,
      isViewed: false,
      media: [
        {
          type: 'image',
          url: 'https://picsum.photos/id/7/400/800',
        },
      ],
    },
  ]);
  const handleStoryPress = index => {
    const updatedStories = [...storiesData];
    updatedStories[index].isViewed = true;
    setStoriesData(updatedStories);
  };

  const renderStory = ({ item, index }) => (
    <StoryItem story={item} onPress={() => handleStoryPress(index)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={storiesData}
        renderItem={renderStory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );
};

const StoryItem = ({ story, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.storyRing}>
        <Image source={{ uri: story.userAvatar }} style={styles.storyAvatar} />
        {story.isViewed && <View style={styles.viewedOverlay} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: Spacing.tiny,
    width: Responsive.width(60),
    marginTop: Spacing.tiny,
  },
  storyRing: {
    width: Responsive.width(55),
    height: Responsive.width(55),
    borderRadius: Radius.circle * 4,
    borderWidth: 2,
    borderColor: '#E4405F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    position: 'relative',
  },
  storyAvatar: {
    width: Responsive.width(45),
    height: Responsive.width(45),
    borderRadius: Radius.circle * 4,
  },
  viewedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 31,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Stories;
