import React,{useState,useEffect} from 'react'
import {Icon,Popup} from 'semantic-ui-react'

const UserIcon = ({ iconName,themeColor,achievement }) => {
  const [selectedIconName,setSelectedIconName] = useState(iconName)
  useEffect(()=>{
    if(achievement){

    const icon =Object.keys(icons).find(key => icons[key].achievement === achievement);
    setSelectedIconName(icon)
    }
},[])
  
 

  return  (
    <>
    {selectedIconName ?  
     <Popup content={icons[selectedIconName].description} trigger={<Icon
        color={themeColor}
        name={selectedIconName }
        fitted
        />
        
      } 
      inverted
      on={['hover']}
      position='top left'
      size='mini'
      offset='-9px, 0'
      
       />
       : <></>}
     
     </>)

};

 const icons = {
    'chess pawn':{
      description: 'İlk yorumununu yaptı!',
      achievement: 'comment1'

    },
    'chess bishop':{
   
      description: '5. yorumunu yaptı!',
      achievement: 'comment5'

    },
    'chess knight':{
      
      description: '10. yorumunu yaptı!',
      achievement: 'comment10'

    },
    'chess rock':{
      
      description: '20. yorumunu yaptı!',
      achievement: 'comment120'

    },
    'chess king':{
      
      description: '50. yorumunu yaptı!',
      achievement: 'comment50'

    },
    'chess queen':{
      
      description: '100. yorumunu yaptı!',
      achievement: 'comment100'

    },

    'bolt':{
      
      description: 'İlk kez patilendi!',
      achievement: 'pati1',
    },
    'paper plane':{
      
      description: '10 kez patilendi!',
      achievement: 'pati10',
    },
    'plane':{
      
      description: '50 kez patilendi!',
      achievement: 'pati50',
    },
    'fighter jet':{
      
      description: '100 kez patilendi!',
      achievement: 'pati100',
    },
    'space shuttle':{
      
      description: '200 kez patilendi!',
      achievement: 'pati200',
    },
    'rocket':{
      
      description: '500 kez patilendi!',
      achievement: 'pati500',
    },
    'quidditch':{
      
      description: '1000 kez patilendi!',
      achievement: 'pati1000',
    },

    'leaf':{
      
      description: 'İlk tavsiyesini verdi!',
      achievement: 'tip1',
    },
    'tree':{
      
      description: '10 tavsive verdi!',
      achievement: 'tip10',
    },
    'gem':{
      
      description: 'İlk sorusunu sordu!',
      achievement: 'question1',
    },
    'tint':{
      
      description: '10 soru sordu!',
      achievement: 'question10',
    },
    'cogs':{  description: 'Beta Tester',achievement: 'betaTester' },
    'shield':{  description: 'Moderatör',achievement: 'mod' },
    'user secret':{  description: 'Admin', achievement: 'admin' },
  };
export default UserIcon;