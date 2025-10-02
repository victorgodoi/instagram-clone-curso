import './modal.css';
import closeIcon from '../../icons/closeIcon.svg';

const Modal = ({ open, setOpenModal, title, children }) => {

  if (!open) return null;

  return(
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => setOpenModal(false)}
    >
      <div className='heroModal' onClick={(e) => e.stopPropagation()}>
        <div className='headerModal'>
          <h3>{title}</h3>
          <div className='closeIcon' onClick={() => setOpenModal(false)}>
            <img 
              src={closeIcon}
              alt='fechar'
              title='fechar'
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className='contentModal'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;