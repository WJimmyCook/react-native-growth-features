import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';

const ShareableReactImage = () => {
  const viewRef = useRef();
  const [showInstagramStory, setShowInstagramStory] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('instagram://')
        .then((val) => setShowInstagramStory(val))
        .catch((err) => console.error(err));
    } else {
      Share.isPackageInstalled('com.instagram.android')
        .then(({ isInstalled }) => setShowInstagramStory(isInstalled))
        .catch((err) => console.error(err));
    }
  }, []);

  const shareDummyImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      if (showInstagramStory) {
        await Share.shareSingle({
          stickerImage: uri,
          method: Share.InstagramStories.SHARE_STICKER_IMAGE,
          social: Share.Social.INSTAGRAM_STORIES,
          backgroundBottomColor: '#FF0000',
          backgroundTopColor: '#FF0000',
        });
      } else {
        await Share.open({ url: uri });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <View style={{ padding: 20, alignItems: 'center' }} ref={viewRef}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            paddingBottom: 20,
          }}>
          Don't be a dummy!
        </Text>
        <View style={styles.dummy}></View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            textAlign: 'center',
            paddingTop: 20,
          }}>
          LEARN REACT NATIVE
        </Text>
      </View>
      <TouchableOpacity style={{ marginTop: 30 }} onPress={shareDummyImage}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
            color: 'red',
          }}>
          {showInstagramStory ? 'Share Instagram Story' : 'Share'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareableReactImage;

const styles = StyleSheet.create({
  dummy: {
    width: 0,
    height: 0,
    borderTopWidth: 120,
    borderTopColor: 'yellow',
    borderLeftColor: 'black',
    borderLeftWidth: 120,
    borderRightColor: 'black',
    borderRightWidth: 120,
    borderBottomColor: 'yellow',
    borderBottomWidth: 120,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
  },
});
