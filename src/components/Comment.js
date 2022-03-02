import { View, Text, Image, Alert, Button } from 'react-native';
import TimeAgo from '@andordavoti/react-native-timeago';
import useAuthStorage from '../hooks/useAuthStorage';
import useComment from '../hooks/useComment';
import theme from "../theme";

const Comment = ( { commentObj, avatar } ) => {
  const { user } = useAuthStorage();
  const { deleteComment } = useComment();
  const isOwner = commentObj.user_id === user.user_id

  // console.log( 'comObj', commentObj, isOwner );

  const onDeleteHandler = (id) => {
    deleteComment(id).then(res => {
      if(deleteComment) {
        Alert.alert(res.message);
      }
    })
  }

  return (
      <View style={ theme.comment }>
          <View style={ theme.commentInfo }>
              <Image source={ { uri: 'http://placekitten.com/35/35' } }
                     style={ theme.commentUser }/>
              <Text>{ commentObj.comment }</Text>
          </View>
          <View>
              <Text>Likes</Text>
              <TimeAgo dateTo={ new Date( commentObj.time_added ) }/>
              {isOwner && <Button title={'Delete'} onPress={() => onDeleteHandler(commentObj.comment_id)}>Delete</Button>}
          </View>

        {/*<Text>comment_id: {commentObj.comment_id}</Text>*/}

      </View>
  );
};

export default Comment;