import alien from 'assets/images/profile-icons/alien.png'
import beetle from 'assets/images/profile-icons/beetle.png'
import cat from 'assets/images/profile-icons/cat.png'
import dog from 'assets/images/profile-icons/dog.png'
import foreigner from 'assets/images/profile-icons/foreigner.png'
import monster from 'assets/images/profile-icons/monster.png'
import monster2 from 'assets/images/profile-icons/monster2.png'
import robot from 'assets/images/profile-icons/robot.png'
import robot2 from 'assets/images/profile-icons/robot2.png'
import robot3 from 'assets/images/profile-icons/robot3.png'
import wasp from 'assets/images/profile-icons/wasp.png'

const ProfileIcon = ({ userId }) => {
  const icons = [
    alien,
    beetle,
    cat,
    dog,
    foreigner,
    monster,
    monster2,
    robot,
    robot2,
    robot3,
    wasp
  ]

  const getIcon = () => {
    const lastChar = userId.charAt(userId.length-1)

    if(Number(lastChar)) {
      return icons[lastChar]
    }

    return icons[10]
  }

  return (
    <img
      src={getIcon()}
      alt='Imagen animada de Alien'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  )
}

export default ProfileIcon
