// import './RegisterModal.css';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../../Modal';
import { storage, db } from '../../../../firebase';
import firebase from 'firebase/compat/app';
import { ref as storageRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const PostModal = ({ openModal, setOpenModal, user }) => {
  const [postTitle, setPostTitle] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setPostTitle('');
    setNewFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [openModal])

  const newPost = (e) => {
    e.preventDefault();

    if (!newFile) {
      alert('Selecione um arquivo antes de postar.');
      return;
    }

    const fileName = newFile.name;
    const fileRef = storageRef(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, newFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (error) => {
        alert(error.message || 'ocorreu um ao fazer o upload do arquivo');
      },
      () => {
        // quando terminar, pega a URL usando getDownloadURL
        getDownloadURL(fileRef)
          .then((url) => {
            db.collection('posts').add({
              title: postTitle,
              image: url,
              userName: user,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setPostTitle('');
            setNewFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            setOpenModal(false);
            alert('Publicado com sucesso!');
          })
          .catch((err) => {
            alert(err.message || 'Erro ao obter URL do arquivo');
          });
      }
    );
  };

  return(
    <Modal
      open={openModal}
      setOpenModal={setOpenModal}
      title='Nova publicação'
    >
      <div className='registerModal'>
        <form onSubmit={(e) => newPost(e)}>
          <progress value={progress} />
          <input
            type="text"
            placeholder="Título da publicação..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={(e) => setNewFile(e.target.files[0])}
          />
          <div className='buttonSumit'>
            <input type='submit' value='Postar' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PostModal;