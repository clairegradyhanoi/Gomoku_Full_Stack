import { useContext, useState } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context'
import { Circle, Button } from '../components'
import style from './Game.module.css'
import { CIRCLE_STATUS } from '../constants'
import { get, post, put, del } from '../utils/http'
import { Games } from '../types/Games'



export default function Game() {
    
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)
    const [ whiteMoves, setWhiteMoves ] = useState<any[]>([])
    const [ blackMoves, setBlackMoves ] = useState<any[]>([])
    const [ status, setStatus] = useState<any[]>([])
    const [ gameId, setGameId ] = useState<number>()
    const [ res, setResponse ] = useState<string>("Current Player: Black")
    const [ wait, setWait ] = useState<boolean>(false)
    const { state } = useLocation()
    let board: number = parseInt(state)
    

    function gameWaiting() {
      return wait
    }

    if (!user) return <Navigate to="/login" replace />

    const resetState = () => {
      finished_game = false
      setWait(false)
      setResponse("Current Player: Black")
      setStatus([])
      setBlackMoves([])
      setWhiteMoves([])
    }

    const updateBlackState = async (index: number, status_update: CIRCLE_STATUS) => {
      finished_game = false
      if (status[index] !== "BLACK" && status[index] !== "WHITE" ){
         status[index] = "BLACK"
         setStatus([...status])
         blackMoves.push(index)
         setBlackMoves([...blackMoves])
       
        if (blackMoves.length === 1){
          const prevGames = await fetchPrevGame()
          const response = postGameToDB(prevGames)
          response.then(function(result){
           let resultString = JSON.stringify(result).split('"', 5)[3]
            setResponse(resultString)
          })
        }
        else if (blackMoves.length > 1){
          const response = putGameToDB()
          response.then(function(result){
            let resultString = JSON.stringify(result).split('"', 5)[3]
            setResponse(resultString)
            if (resultString === "Black is the WINNER!" || resultString === "Game is a DRAW!"){
              setResponse(resultString)
              finished_game = true
              gameFinished()
            }
           })
        }
      } 
    }

    const updateWhiteState = async (index: number, status_update: CIRCLE_STATUS) => {
      finished_game = false
      if (status[index] !== 'BLACK' && status[index] !== 'WHITE'){
        status[index] = "WHITE"
        setStatus([...status])
        whiteMoves.push(index)
        setWhiteMoves([...whiteMoves])
        if (whiteMoves.length === 1){
          const response = putGameToDB()
          response.then(function(result){
           let resultString = JSON.stringify(result).split('"', 5)[3]
            setResponse(resultString)
           })
        }
        else if (whiteMoves.length > 1){
          const response = putGameToDB()
          response.then(function(result){
            let resultString = JSON.stringify(result).split('"', 5)[3]
            setResponse(resultString)
            if (resultString === "White is the WINNER!" || resultString === "Game is a DRAW!"){
              setResponse(resultString)
              finished_game = true
              gameFinished()
            }
           })
        }
      }
    }

  const fetchPrevGame = async () => {
    try{
      setWait(true)
      const userGames = await get<Games[]>(`/api/games/${user._id}`)
      if (userGames.length === undefined || userGames.length === 0){
        setGameId(1)
      }
      else{
        setGameId(userGames.length+1)
      }
      setWait(false)
      return userGames.length+1 as number
      
      
    }catch (error){
      console.log((error as Error).message)
      logout()
      navigate('/')
    }
  }

  

  const putGameToDB = async () => {
      let winner:string = ""
      if (res!== undefined){
        winner = res
      if (user){ 
            const resp = await put (`/api/games`, {
            userId: user._id,
            gameId: gameId,
            boardsize: board,
            result: winner,
            whiteMoves: whiteMoves,
            blackMoves: blackMoves,
            status: status,
            date: new Date().toLocaleDateString()
          })
          return resp
      }
    }
    }

    const deleteGameFromDB = async () => {
      if (user){ 
        await del (`/api/games/${user?._id}/${gameId}`)
      }
    }
  


    const postGameToDB = async (currGameId: number | undefined) => {
      let winner:string = ""
      winner = "Current Player: White"
      if (user){
        const res = await post (`/api/games`, {
          userId: user._id,
          gameId: currGameId,
          boardsize: board,
          result: winner,
          whiteMoves: whiteMoves,
          blackMoves: blackMoves,
          status: status,
          date: new Date().toLocaleDateString()
        })
        return res
      }
    }

    const onHandleClick = () => {
      if (finished_game === true){
          putGameToDB()
          resetState()
      }else if (finished_game === false){
        deleteGameFromDB()
        resetState()
        navigate('/')
      }     
    }
   
    return (
      
      <div className={style.container}>
        <div className={style.container} style={{ gridTemplateColumns: `repeat(${parseInt(state)}, 1fr)`}}>
        {[...Array(parseInt(state) * parseInt(state))].map((_, index) => (
            <Circle key={`game_circle-${index}`} id={index}
          finished={() => gameFinished()}
          waiting={() => gameWaiting()}
          updateWhiteState={() => updateWhiteState(index, CIRCLE_STATUS.WHITE)}
          updateBlackState={() => updateBlackState(index, CIRCLE_STATUS.BLACK)} status={status} />
        ))}
        </div>
        <div className={style.title}> {res as string} </div>
        <Button type='submit' onClick = {onHandleClick}>Leave</Button>
        <Button type='submit' onClick = {()=> {resetState()}}>Reset Board</Button>
      </div>
      
    )
}
let finished_game: boolean = false
function gameFinished() {
  return finished_game
}




