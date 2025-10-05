import "./post.css";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";

const Post = ({data, id, user}) => {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState([]);

  const handleComment = async (idComment, e) => {
    e.preventDefault();

    const currentComment = (commentText[idComment] || '').trim();

    if (!currentComment) {
      alert('Escreva algo antes de comentar.');
      return;
    }

    try {
      // adiciona na subcoleção comments do post (coleção "posts")
      await addDoc(collection(db, 'posts', idComment, 'comments'), {
        name: user,
        comment: currentComment,
        timestamp: serverTimestamp(),
      });

      // limpa o campo do comentário para esse post
      setCommentText(prev => ({ ...prev, [idComment]: '' }));
      alert('Comentário feito com sucesso');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      alert(err.message || 'Erro ao enviar comentário');
    }
  };

  useEffect(() => {    
    const commentsCol = collection(db, "posts", id, "comments");
    const q = query(commentsCol, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({
        id: doc.id,
        info: doc.data(),
      })));
    });

    return () => unsubscribe();
  }, [id]);


  return (
    <div className='postCard'>
      <div className='imageCard' style={{ backgroundImage: `url(${data.image})` }} />
      <div className='textCard'>
        <strong>{data.userName}: {' '}</strong>
        <p>{data.title}</p>
      </div>
      <p className='comment' onClick={() => setShowComment(!showComment)}>
        {showComment ? 'Esconder comentários' : 'Mostrar comentários'}
      </p>
      {showComment && (
        <div className='descriptionPost'>
          <div className='comments' style={{ display: comments.length > 0 ? 'flex' : 'none'}}>
          {comments.map((item, index) => (
            <div className='commentSingle' key={index}>
              <strong>{item.info.name}: {' '}</strong>
              <p>{item.info.comment}</p>
            </div>
          ))}
          </div>
          <form onSubmit={(e) => handleComment(id, e)}>
            <textarea
              value={commentText[id] || ''}
              onChange={(e) => setCommentText(prev => ({ ...prev, [id]: e.target.value }))}
            />
            <input type='submit' value='Comentar!' />
          </form>
        </div>
      )}
    </div>
  )
}

export default Post;