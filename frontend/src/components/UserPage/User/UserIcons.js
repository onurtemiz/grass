import React,{useEffect,useState} from 'react'
import UserIcon from './UserIcon'
const UserIcons = ({achievements})=>{
  const [activeAchievements,setActiveAchievements] = useState([])

  useEffect(() => {
    if(achievements){
  const actives = [];
  for (const key of Object.keys(achievements)) {
    if(achievements[key] === true){
           actives.push(key)
         }
  }
   setActiveAchievements(actives)
    }
  }, [])
  return(
  activeAchievements.map((achievement)=>{
      return (<span style={{marginRight:'0.5em'}}><UserIcon themeColor='purple' achievement={achievement} key={achievement}/></span>)
    })
  )
}
export default UserIcons