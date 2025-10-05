import './hero.css';
import Post from './components/Post';

const Hero = ({ posts, user }) => {

  return(
    <div>
      <div className='container'>
        <div className='cards'>
          {posts?.map((item, index) => {
            return(
              <Post
                data={item.info}
                id={item.id}
                user={user}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Hero;