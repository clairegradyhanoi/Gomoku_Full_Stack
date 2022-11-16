import { useState, useEffect, useRef } from "react"
import { Input, Button } from '../components'
import { useNavigate } from 'react-router-dom'
import style from './Home.module.css'

export default function Home() {
  const [boardSize, setBoardSize] = useState('')
  const navigate = useNavigate()
  const boardSizeInput = useRef<HTMLInputElement | null>(null)
  function handleOnClick() {
    let bs: unknown = boardSize
    if ((bs as number) > 4 && (bs as number) < 21){
      navigate('game', {state: boardSize});
    }
    else if ((bs as string) !== null){
      window.alert("You have to enter a NUMBER between 5-20")
  }
}
useEffect(() => {
  if (boardSizeInput.current){
    boardSizeInput.current.focus() 
  }
}, [])

  return (
    
    <form className={style.container}>
     <Input ref = {boardSizeInput} name="board-size" placeholder="  Board Size" value={boardSize} onChange={(b) => {
        setBoardSize(b.target.value)}}/>
        <Button type="submit" disabled={!boardSize} onClick={ handleOnClick }>Start</Button>
        </form>
  )
}

