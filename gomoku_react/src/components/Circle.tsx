
import style from './Circle.module.css'
import { CIRCLE_STATUS } from '../constants'

type CircleProps = {
    id: number
    finished: () => boolean
    waiting: () => boolean
    updateWhiteState:(id: number, status: CIRCLE_STATUS) => void
    updateBlackState:(id: number, status: CIRCLE_STATUS) => void
    status: CIRCLE_STATUS[]
}


export default function Circle(props: CircleProps) {
    const { id, finished, waiting, updateBlackState, updateWhiteState, status } = props
    let turn: number = 1
    for(var i = 0; i < status.length; i++){
        if(status[i] === "BLACK" || status[i] === "WHITE"){
            turn++;
        }
           
    }
  
    const getClassName = () => {
        const className = style.circle
        switch(status[id]) {
            case CIRCLE_STATUS.FREE:
                return `${className} ${style.free}`
            case CIRCLE_STATUS.BLACK:
                return `${className} ${style.black}`
            case CIRCLE_STATUS.WHITE:
                return `${className} ${style.white}`
            default:
                return className
        }
    }


    

     const HandleClick = () => {
        if (finished() === false && waiting() === false){
            if (turn % 2 !== 0){
                turn +=1
                updateBlackState(id, CIRCLE_STATUS.BLACK)
            } else if (turn % 2 === 0) {
                turn +=1
                updateWhiteState(id, CIRCLE_STATUS.WHITE)
            }
        } 
     }
 

  return (
    <div className={getClassName()} onClick={HandleClick}/>
  )
}
