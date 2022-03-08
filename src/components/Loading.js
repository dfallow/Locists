import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import PropTypes from 'prop-types'

const Loading = ( { text } ) => {
  const animation = React.createRef()
  useEffect( () => {
    animation.current?.play()
  }, [] )

  return (
    <View style={ {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } }>
      <LottieView
        ref={ animation }
        source={ require( '../../assets/loadSpinner.json' ) }
        style={ styles.spinner }
        loop={ false }
      />
      <Text style={ { color: 'white', fontSize: 20, marginTop: 20 } }>{!text ? 'Loaading media' : text}...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 100,
    height: 100,
  },
} )

Loading.propTypes = {
  text: PropTypes.string,
}