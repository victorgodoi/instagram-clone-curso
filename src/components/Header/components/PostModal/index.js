import './PostModal.css';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../../Modal';
import { db } from '../../../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const PostModal = ({ openModal, setOpenModal, user }) => {
  const [postTitle, setPostTitle] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // ADICIONADO: upload para Cloudinary com callback de progresso
  const uploadToCloudinaryWithProgress = async (file, onProgress) => {
    const url = `https://api.cloudinary.com/v1_1/dzcrm8gcx/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'instagram-clone-curso');

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && typeof onProgress === 'function') {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res.secure_url || res.url);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(xhr.statusText || `Upload failed (status ${xhr.status})`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(formData);
    });
  }

  const newPost = async (e) => {
    e.preventDefault();

    if (!newFile) {
      alert('Selecione um arquivo antes de postar.');
      return;
    }

    try {
      setProgress(5);
      const imageUrl = await uploadToCloudinaryWithProgress(newFile, setProgress);

      // salva no Firestore (modular)
      await addDoc(collection(db, 'posts'), {
        title: postTitle,
        image: imageUrl,
        userName: user,
        timestamp: serverTimestamp(),
      });

      // limpeza e feedback
      setProgress(0);
      setPostTitle('');
      setNewFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setOpenModal(false);
      alert('Publicado com sucesso!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro no upload');
      setProgress(0);
    }
  };

  useEffect(() => {
    setProgress(0);
    setPostTitle('');
    setNewFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [openModal]);

  return(
    <Modal
      open={openModal}
      setOpenModal={setOpenModal}
      title='Nova publicação'
    >
      <div className='postModal'>
        <form onSubmit={(e) => newPost(e)}>
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
          <progress value={progress} />
          <div className='buttonSumit'>
            <input type='submit' value='Postar' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PostModal;