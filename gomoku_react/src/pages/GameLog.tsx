import style from '../pages/GameLog.module.css'
import { CircleCopy, Button } from '../components';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '../context';
import { Games } from '../types/Games'
import { get } from '../utils/http'


export default function GameLog() {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const [ result, setResult ] = useState<string>()
  const [ boardS, setBoardSize ] = useState<any>(0)
  const [ whiteMoves, setWhiteMoves ] = useState<number[]>()
  const [ blackMoves, setBlackMoves ] = useState<number[]>()
  const [ status, setStatus ] = useState<any[] | null> ()
  const { state } = useLocation()


  
  const glBlackOrder = () => {
    return blackMoves
  }

  const glWhiteOrder = () => {
    return whiteMoves
  }


  const fetchGames = useCallback(async () => {
    try{
      const getOne = await get<Games>(`/api/games/${user?._id}/${state}`)
      setResult(getOne?.result)
      setBoardSize(getOne?.boardsize)
      setWhiteMoves(getOne?.whiteMoves)
      setBlackMoves(getOne?.blackMoves)
      setStatus(getOne?.status)
    }catch (error){
      console.log((error as Error).message)
      logout()
      navigate('/')
    }
  }, [logout, navigate, user?._id, state])

  useEffect(() => {
    if (!user) return
    fetchGames()
  }, [fetchGames, user])

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className={style.container}>
      <>
      <h1 className={style.header}>
        Game Details
      </h1>
      <div className={style.container}>
        <div className={style.title}>
              Result: {result}
      
      </div>
      <div>

      <div className={style.container_game} style={{ gridTemplateColumns: `repeat(${boardS}, 1fr)`}}>
      {[...Array(boardS * boardS)].map((_, index) => (
            <CircleCopy key={`game_circle-${index}`} id={index} status={status}
            getWhiteOrder={() => glWhiteOrder()}
            getBlackOrder={() => glBlackOrder()}/>
        ))}
      </div>
      <div className={style.button}>
        <p>    <Button type="submit" onClick={ () => navigate(`/games`) }>Back</Button></p>
     
      </div>
      </div>
      </div>
      </>
      </div>
    
  )
  
}