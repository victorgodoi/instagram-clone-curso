import './notification.css'

// const Notification = () => {
//   return (
//     <div className="notification">
//       <div className='textNotification'>
//         <h4>Erro: Ocorreu um erro ao se logar!</h4>
//         <p>Descrição: Coloque um email e senha válido</p>
//       </div>
//     </div>
//   )
// }

// export default Notification;
  
const Icon = ({ type }) => {
  if (type === 'error') return <span className="notif-icon">✖</span>;
  if (type === 'success') return <span className="notif-icon">✔</span>;
  return <span className="notif-icon">ℹ</span>;
};

const NotificationItem = ({ n, onRemove }) => {
  return (
    <div className={`notification ${n.type}`}>
      <div className="notif-left">
        <Icon type={n.type} />
      </div>
      <div className="textNotification">
        {n.title && <h4>{n.title}</h4>}
        {n.description && <p>{n.description}</p>}
      </div>
      <button className="closeBtn" onClick={() => onRemove(n.id)} aria-label="fechar">×</button>
    </div>
  );
};

const NotificationList = ({ notifications = [], onRemove = () => {} }) => {
  return (
    <div className="notification-wrapper">
      {notifications.map((n) => (
        <NotificationItem key={n.id} n={n} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default NotificationList;
