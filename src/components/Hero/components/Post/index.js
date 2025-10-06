import "./post.css";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { useNotification } from "../../../../hooks/useNotification";

const Post = ({data, id, user}) => {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState([]);
  const { notify } = useNotification();

  const handleComment = async (idComment, e) => {
    e.preventDefault();

    if (!user) {
      notify({
        type: 'error',
        title: 'Você não está logado!',
        description: 'Faça login no sistema antes de enviar um comentário.',
        duration: 5000
      });
      return;
    }

    const currentComment = (commentText[idComment] || '').trim();

    if (!currentComment) {
      notify({ type: 'error', title: 'Comentário vazio!', description: 'Escreva algo antes de enviar seu comentário.', duration: 5000 });
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
      notify({ type: 'success', title: 'Comentário enviado!', description: 'Seu comentário foi publicado.', duration: 3000 });
    } catch (err) {
      notify({ type: 'error', title: 'Erro ao enviar comentário!', description: 'Não foi possível publicar o comentário. Tente novamente.', duration: 5000 });
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