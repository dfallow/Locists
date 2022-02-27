import { baseUrl } from '../../config';
import axios from 'axios';
import { useState } from 'react';

const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [mediaComments, setMediaComments] = useState([]);

  const getMediaComments = async ( mediaId ) => {
    const URL = `${ baseUrl }comments/file/${ mediaId }`;
    try {
      setLoading( true );
      const comments = await axios.get( URL );
      setMediaComments( comments.data );
      setLoading( false );
    } catch ( e ) {
      console.log( e );
      setLoading( false );
    }
  };

  return {
    getMediaComments,
    mediaComments,
    loading,
  }

}

export default useComment;