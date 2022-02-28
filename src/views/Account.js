import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useFocusEffect } from '@react-navigation/native';
import theme from "../theme";
import useComment from '../hooks/useComment';
import useMedia from "../hooks/useMedia";
import Post from "../components/Post";
import Event from "../components/Event";


const Account = ( { navigation } ) => {
  const { user } = useAuthStorage();
  const authStorage = useAuthStorage();
  const [ update, setUpdate ] = useState( false ); // eslint-disable-line
  const { getCurrentUserComments } = useComment();
  const [ comments, setComments ] = useState([]);
  const { getUserMedia, userMedia} = useMedia();
  const [ loading, setLoading ] = useState( false );

  getCurrentUserComments().then( comments => setComments( comments ) );

  const logoutHandler = async () => {
    await authStorage.logout();
    user.isLogged && navigation.navigate( 'AccountTab', { Screen: 'Account' } );
    // setUpdate( true );
  };

  const getMediaForUser = useMemo( async () => {
      await getUserMedia( user.token )
  }, [] );

  useEffect( async () => {
      setLoading( true );
      await getMediaForUser;
      console.log(loading);
      setLoading( false )
  }, [] );

  /*  If user is logged in
   *   Hide Authentication view and move to Account view
   * */

  useFocusEffect(
      useCallback( () => {
        return () => {
          user.isLogged && navigation.navigate( 'HomeTab', {Screen: 'Home'} );
          setUpdate( false );
        };
      }, [ update ] ),
  );

    const EmptyListMessage = () => <Text>No events </Text>;

  return (
          <View style={theme.profile}>
              <View style={theme.profilePicAndInfo}>
                  { user.avatar ?
                      <Image
                          source={ { uri: user.avatar } }
                          style={ theme.profilePic }
                      />
                      :
                      <Image
                          source={require('../../assets/defaultPic.jpg')}
                          style={theme.profilePic}
                      />
                  }


                  <View style={theme.profileInfoCard}>
                      <Text>User: { user.username }</Text>
                      <Text>UserID: { user.user_id }</Text>
                      <Text>{ user.email }</Text>
                      <Text>{ user.full_name }</Text>
                  </View>
              </View>

              <Button title={'Modify your account details'} onPress={() => navigation.navigate('ModifyAccount')} />
              <Text style={{color: '#fff'}}>User status: { user.isLogged && 'logged in' }</Text>
              <TouchableOpacity style={theme.generalBtn} onPress={ logoutHandler }>
                  <Text style={theme.loginButtonText}>Log Out</Text>
              </TouchableOpacity>
              <Text style={{color: '#fff'}}>Comments posted: { comments.length > 0 ? comments.length : 0 }</Text>
              <FlatList
                  data={userMedia}
                  ListEmptyComponent={EmptyListMessage}
                  keyExtractor={ ( item ) => item.file_id }
                  renderItem={ ( { item } ) => {
                      switch (item.description.mediaType) {
                          case 'post':
                              return <Post postMedia={ item }/>
                          case 'event':
                              return <Event eventDetails={ item }/>
                          default:
                              return <Text style={{color: '#fff'}}>This is an avatar</Text>
                      }

                  } } />
          </View>
  );
};

export default Account;
