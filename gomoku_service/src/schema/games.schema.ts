import { object, string, number, array, TypeOf, any } from 'zod';

const payload = {
    body: object ({

        gameId: number({
            required_error: "gameId is required",
        }),
        boardsize: number({
            required_error: "boardsize is required",
        }),
        result: string({
            required_error: "Result is required",
        }),
        whiteMoves: array(
            number({
            required_error: "White player moves are required",
            }),
        ),
        blackMoves: array(
            number({
            required_error: "Black player moves are required",
            }),
        ),
        status: array(
            any({
                required_error: "Status is required",
        }),
        ),
        date: string({
            required_error: "Date is required",
        })
    })
}

const getParams = {
  params: object({
    userId: string({
      required_error: 'User id is required',
    }),
  }),
}


export const getGamesSchema = object ({
    ...payload,
})

export const getGamesByIdSchema = object({
    ...getParams,
})
export const createGamesSchema = object({
    ...payload,
})

export const updateGamesSchema = object({
    ...payload,
})


export type getGamesByIdInput = TypeOf<typeof getGamesByIdSchema>
export type CreateGamesInput = TypeOf<typeof createGamesSchema>
export type UpdateGamesInput = TypeOf<typeof updateGamesSchema>
export type GetGamesInput = TypeOf<typeof getGamesSchema>



