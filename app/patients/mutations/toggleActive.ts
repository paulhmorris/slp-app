import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const ToggleActive = z.object({
  id: z.number(),
  isActive: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(ToggleActive),
  resolver.authorize(),
  async ({ id, isActive }, ctx) => {
    const patient = await db.patient.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
    })

    return patient
  }
)
