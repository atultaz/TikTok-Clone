import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import InViewPort from '@coffeebeanslabs/react-native-inviewport';

import Video from 'react-native-video';
import styles from './styles';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Post = props => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);

  const [paused, setPaused] = useState(false);
  const [push, setPush] = useState(false);
  // const [isVisible, setVisible] = useState(true);

  const video = useRef();

  const playVideo = () => {
    if (video) {
      setPaused(false);
    }
  };

  const pauseVideo = () => {
    if (video) {
      setPaused(true);
    }
  };

  const handlePlaying = isVisible => {
    isVisible ? playVideo() : pauseVideo();
    console.log(`It is visible ${paused}`);
  };

  const onPlayPausePress = () => {
    setPush(!push);
    // console.log(push);
  };

  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <InViewPort onChange={handlePlaying}>
          <View>
            <Video
              ref={ref => {
                video.current = ref;
              }}
              source={{uri: post.videoUri}}
              style={styles.video}
              onError={e => console.log(e)}
              resizeMode={'cover'}
              repeat={true}
              paused={paused || push}
            />

            <View style={styles.uiContainer}>
              <View style={styles.rightContainer}>
                <Image
                  style={styles.profilePicture}
                  source={{uri: post.user.imageUri}}
                />

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onLikePress}>
                  <AntDesign
                    name={'heart'}
                    size={40}
                    color={isLiked ? 'red' : 'white'}
                  />
                  <Text style={styles.statsLabel}>{post.likes}</Text>
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                  <FontAwesome name={'commenting'} size={40} color="white" />
                  <Text style={styles.statsLabel}>{post.comments}</Text>
                </View>

                <View style={styles.iconContainer}>
                  <Fontisto name={'share-a'} size={35} color="white" />
                  <Text style={styles.statsLabel}>{post.shares}</Text>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <View>
                  <Text style={styles.handle}>@{post.user.username}</Text>
                  <Text style={styles.description}>{post.description}</Text>

                  <View style={styles.songRow}>
                    <Entypo name={'beamed-note'} size={24} color="white" />
                    <Text style={styles.songName}>{post.songName}</Text>
                  </View>
                </View>

                <Image
                  style={styles.songImage}
                  source={{uri: post.songImage}}
                />
              </View>
            </View>
          </View>
        </InViewPort>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;
