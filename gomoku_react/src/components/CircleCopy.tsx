
import style from './CircleCopy.module.css'
import { CIRCLE_STATUS } from '../constants'

type CircleProps = {
    id: number
    status: any[] | undefined | null
    getWhiteOrder: () => any[] | undefined | null
    getBlackOrder: () => any[] | undefined | null
}

export default function CircleCopy(props: CircleProps) {
    const { id, status, getWhiteOrder, getBlackOrder } = props
    const blackOrder = getBlackOrder() as number[]
    const whiteOrder = getWhiteOrder() as number[]
    const allOrder: number [] = []
    let length = status?.length as number
    const organise = () => {
      if (status !== null || status !== undefined){
            for (let i = 0; i < length; i++){
                let blackTemp = blackOrder[i]
                let whiteTemp = whiteOrder[i]
                if (blackTemp !== null)
                    allOrder[blackTemp] = i+(i*1)+1
                if (whiteTemp !== null)
                    allOrder[whiteTemp] = i+(i*1)+2
                else
                    allOrder[i] = null as any
            }
      }
    }
  
    const getClassName = () => {
        organise()
        const className = style.circle
        if (status !== null && status !== undefined){
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
    }


     const HandleClick = () => {
        console.log(allOrder[id])
     }


  return (
    <div>
    <div className={getClassName()} data-content={allOrder[id]} onClick={HandleClick}/>
    </div>
  )
}
