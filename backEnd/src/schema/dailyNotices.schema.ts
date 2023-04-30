import { object, string, number, array, TypeOf, any } from 'zod';

const payload = {
    body: object ({

        message: string({
            required_error: "Message is required",
        }),
        author: string({
            required_error: "Author is required",
        }),
        start_date: string({
            required_error: "Start date is required",
        }),
        expiry_date: string({
            required_error: "Expiry date is required",
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


export const getDailyNoticesSchema = object ({
    ...payload,
})

export const getDailyNoticesByIdSchema = object({
    ...getParams,
})
export const createDailyNoticesSchema = object({
    ...payload,
})

export const updateDailyNoticesSchema = object({
    ...payload,
})


export type getGamesByIdInput = TypeOf<typeof getDailyNoticesByIdSchema>
export type CreateGamesInput = TypeOf<typeof createDailyNoticesSchema>
export type UpdateGamesInput = TypeOf<typeof updateDailyNoticesSchema>
export type GetGamesInput = TypeOf<typeof getDailyNoticesSchema>



