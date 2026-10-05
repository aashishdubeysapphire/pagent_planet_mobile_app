import React from 'react';
import {useCallback, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {styles} from './styles';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Props {
  videoId: string;
  videoType: string;
}

const VideoComponent = ({videoId, videoType}: Props) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <>
      {videoId !== '' && videoType === 'youtube' ? (
        <View style={styles.imageContainer}>
          <YoutubePlayer
            height={moderateScaleVertical(215)}
            width={Dimensions.get('window').width}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
          />
        </View>
      ) : null}
    </>
  );
};

export default VideoComponent;
