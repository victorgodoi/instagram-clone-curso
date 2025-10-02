import './RegisterModal.css';
import Modal from '../../../Modal';
import { auth } from '../../../../firebase';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterModal = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  // const [loading, setLoading] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    if (!email || !password || !userName) {
      alert('Preencha todos os campos!');
      return;
    }
    // setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: userName });
      alert('Conta criada com sucesso!');
      setEmail('');
      setPassword('');
      setUserName('');
      setOpenModal(false);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      alert(error.message || 'Erro ao criar conta');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    setUserName('');
  }, [openModal]);

  return(
    <Modal
      open={openModal}
      setOpenModal={setOpenModal}
      title='Criar conta'
    >
      <div className='registerModal'>
        <form onSubmit={(e) => createAccount(e)}>
          <input
            type="text"
            placeholder="Seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Seu username..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='buttonSumit'>
            <input type='submit' value='Criar conta' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default RegisterModal;