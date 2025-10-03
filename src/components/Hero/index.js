import { useState } from 'react';
import './hero.css';

const Hero = ({ posts }) => {
  const [showComment, setShowComment] = useState(false);

  const handleComment = (id, event) => {
    alert('enviar comentário para o banco')    
  }

  return(
    <div>
      <div className='container'>
        <div className='cards'>
          {posts?.map((item) => {
            return(
              <div className='postCard'>
                <div className='imageCard' style={{ backgroundImage: `url(${item.info.image})` }} />
                <div className='textCard'>
                  <strong>{item.info.userName}: {' '}</strong>
                  <p>{item.info.title}</p>
                </div>
                <p className='comment' onClick={() => setShowComment(!showComment)}>
                  {showComment ? 'Esconder comentários' : 'Mostrar comentários'}
                </p>
                {showComment && (
                  <div className='descriptionPost'>
                    <form onSubmit={(e) => handleComment(item.id, e)}>
                      <textarea />
                      <input type='submit' value='Comentar!' />
                    </form>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Hero;