import './header.css';


const Header = ({ user }) => {
  return(
    <header>
        <div className='container'>
          <div className='contentHeader'>
            <div className='logo'>
              <a href='#'>
                <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
              </a>
            </div>
            {user ?
              <div className='logadoInfo'>
                <span>Olá <strong>{user}</strong></span>
                <a href='#'>Postar</a>
              </div>
            :
              <>
                <div className='login'>
                  <form>
                    <input type='text' placeholder='Login...' name='userName' />
                    <input type='password' placeholder='senha...' name='password' />
                    <input type='submit' value='Logar' name='action' />
                  </form>
                  <div className='register'>
                    <a href='#'>Criar Conta!</a>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </header>
  )
}

export default Header;