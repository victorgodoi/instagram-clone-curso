import './button.css';

const Button = ({ onClick, children, variant }) => {

  const variantStyles = (variant) => {
    const styles = {
      primary: 'button',
      secondary: 'buttonSecondary',
      link: 'buttonLink',
    };

    return styles[variant] || 'button';
  };

  return (
    <button
      className={variantStyles(variant)}
      onClick={onClick}
    >
      {children ? children : 'Value'}
    </button>
  )
}

export default Button;