import './RegisterModal.css';
import Modal from '../../../Modal';
import { auth } from '../../../../firebase';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNotification } from '../../../../hooks/useNotification';

const RegisterModal = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  // const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const createAccount = async (e) => {
    e.preventDefault();
    if (!email || !password || !userName) {
      notify({ type: 'error', title: 'Dados incompletos!', description: 'Preencha todos os campos para criar sua conta.', duration: 5000 });
      return;
    }
    // setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: userName });
      notify({ type: 'success', title: 'Conta criada!', description: 'Sua conta foi criada com sucesso. Já pode fazer login.', duration: 3000 });
      setEmail('');
      setPassword('');
      setUserName('');
      setOpenModal(false);
    } catch (error) {
      notify({ type: 'error', title: 'Erro ao criar conta!', description: 'Não foi possível criar a conta. Verifique os dados e tente novamente.', duration: 5000 });
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