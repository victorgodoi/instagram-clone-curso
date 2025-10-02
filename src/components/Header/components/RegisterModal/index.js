import './RegisterModal.css';
import Modal from '../../../Modal';

const RegisterModal = ({ openModal, setOpenModal }) => {

  return(
    <Modal
      open={openModal}
      setOpenModal={setOpenModal}
      title='Criar conta'
    >
      <div className='registerModal'>
        <form>
          <input type='text' placeholder='Seu e-mail...' />
          <input type='text' placeholder='Seu username...' />
          <input type='password' placeholder='Sua senha...' />
          <div className='buttonSumit'>
            <input type='submit' value='Criar conta' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default RegisterModal;