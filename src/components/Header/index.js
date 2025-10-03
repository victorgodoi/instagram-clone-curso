import { useState } from 'react';
import './header.css';
import RegisterModal from './components/RegisterModal';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PostModal from './components/PostModal';

const Header = ({ user, setUser }) => {
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logar = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.displayName || user.email);
        alert('Logado com sucesso!');
      })
      .catch((error) => {
        alert(error.message || 'Erro ao logar na conta');
      });
  };

  return(
    <header>
      <div className='container'>
        <div className='contentHeader'>
          <div className='logo'>
            <a href="/">
              <img
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='Logo do instagram'
                title='Logo do instagram'
                />
            </a>
          </div>
          {user ?
            <div className='logadoInfo'>
              <span>Olá <strong>{user}</strong></span>
              <button
                type="button"
                className="link-button"
                onClick={() => setOpenPostModal(true)}
              >
                Postar
              </button>
            </div>
          :
            <>
              <div className='login'>
                <form onSubmit={(e) => logar(e)}>
                  <input
                    type='text'
                    placeholder='Login...'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                   />
                  <input
                    type='password'
                    placeholder='senha...'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type='submit'
                    value='Logar'
                    name='action'
                  />
                </form>
                <div className='register'>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setOpenModalRegister(true)}
                  >
                    Criar Conta!
                  </button>
                </div>
              </div>
            </>
          }
        </div>
      </div>
      <RegisterModal openModal={openModalRegister} setOpenModal={setOpenModalRegister} />
      <PostModal
        openModal={openPostModal}
        setOpenModal={setOpenPostModal}
        user={user}
      />
    </header>
  )
}

export default Header;