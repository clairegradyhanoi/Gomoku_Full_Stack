import { useContext, useCallback, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import style from './Games.module.css'
import { Games } from '../types/Games'
import { get } from '../utils/http'


export default function GamesPage() {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [ filteredGames, setFilteredGames ] = useState<Games[]>([])


  const fetchGames = useCallback(async () => {
    try{
      const userGames = await get<Games[]>(`/api/games/${user?._id}`)
      setFilteredGames(userGames)
    }catch (error){
      console.log((error as Error).message)
      logout()
      navigate('/')
    }
  }, [logout, navigate, user?._id])

  useEffect(() => {
    if (!user) return
    fetchGames()
  }, [fetchGames, user])

  


  if (!user) return <Navigate to="/login" />

  return (
    <div>
    <div className={style.container}>
      <h1 className={style.header}>
        Game History {filteredGames.length} </h1>
          {filteredGames.map(({ _id, gameId, result, date, whiteMoves }) => {
            return(
              <div className={style.list} key={gameId}>
                <p className={style.title}>
                Game #{gameId}    @{date}    -{result} 
                </p>
                <button className={style.button}
                onClick={() => navigate(`/game-log`, {state: gameId})}>
               View Game Log
             </button>
             </div>
            )
        }
        )}
        </div>
    </div>
  )
}



