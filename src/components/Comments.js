import SingleEventHeader from './SingleEventHeader'
import theme from '../theme'
import NoComments from './NoComments'
import Comment from './Comment'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import useMedia from '../hooks/useMedia'
import useComment from '../hooks/useComment'
import Loading from './Loading'
import { useEffect, useState } from 'react'
import PostComment from './PostComment'
import AddComment from '../../assets/icons/AddComment.svg'

const Comments = ( { fileId } ) => {
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()
  const { getMediaComments } = useComment()
  const [ mediaComments, setMediaComments ] = useState( [] )
  const [ updateView, setUpdateView ] = useState( false )
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' )
    setIsWriteComment( !isWriteComment )
  }

  useEffect( async () => {
    setLoading( true )
    await getMediaById( fileId ).then( async () => {
      await getMediaComments( fileId ).
        then( comments => setMediaComments( comments ) )
    } ).finally( () => {
      setUpdateView( false )
      setLoading( false )
    } )
    setUpdateView( false )
  }, [ fileId, updateView ] )

  const updateComments = () => setUpdateView( true )

  if ( loading ) return <Loading />

  return (
    <>

      <TouchableOpacity onPress={ onWriteCommentHandler }>
        <AddComment width={ 32 } height={ 32 } />
      </TouchableOpacity>
      <View style={ { alignItems: 'center' } }>
        { isWriteComment &&
        <PostComment file_id={ fileId } display={ setIsWriteComment }
                     updateComments={ updateComments }
        /> }
      </View>
      <FlatList
        style={ [ theme.singleMediaComments ] }
        data={ mediaComments }
        ListEmptyComponent={ <NoComments /> }
        keyExtractor={ ( item ) => item.comment_id }
        renderItem={ ( { item } ) => <Comment commentObj={ item }
                                              setUpdateSingleEventView={ setUpdateView }
                                              type={ 'event' } /> }
      />
    </>
  )
}

export default Comments