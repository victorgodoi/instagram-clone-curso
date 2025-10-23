import './button.css';

const Button = ({ onClick, children, variant }) => {
  return (
    <button
      type="button"
      className={variant === 'secondary' ? 'buttonSecondary' : 'button'}
      variant="button" onClick={onClick}
    >
      {children ? children : 'Value'}
    </button>
  )
}

export default Button;