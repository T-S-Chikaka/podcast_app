import React, { FC, useEffect, useState, createContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { episodes } from '../../mockData/stations'
import { Audio } from 'expo-av'
export const { Provider } = createContext()

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: true,
})

const Player: FC = () => {
  const [currentVocalTrack, setCurrentVocalTrack] = useState({})
  const [vocalPlaybackObj, setVocalPlaybackObj] = useState(null)
  const [vocalSoundStatus, setVocalSoundStatus] = useState(null)

  const handleVocalPlaybackObj = async audio => {
    console.log('vocalStatus', vocalSoundStatus)

    if (vocalPlaybackObj === null) {
      const playbackObj = new Audio.Sound()
      const status = await playbackObj.loadAsync(
        { uri: audio },
        { shouldPlay: true }
      )
      console.log('vocalStatus', status)
      setCurrentVocalTrack(audio)
      setVocalPlaybackObj(playbackObj)
      setVocalSoundStatus(status)
    }
    //@ts-ignore
    if (vocalSoundStatus.isPlaying) {
      const status = await pauseVocals(vocalPlaybackObj)
      setVocalSoundStatus(status)
    }
  }

  const pauseVocals = async audio => {
    try {
      //@ts-ignore
      await audio.playback.pauseAsync()
    } catch (e) {
      console.log('problem with pausing vocal audio', e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleVocalPlaybackObj('https://www.listennotes.com/e/p/a5170fb3178941ae81704814a04bf006/')} style={styles.button}>
          <Text style={styles.text}>Play/Pause</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
//634
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  button2: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 180,
  },
})

export default Player
