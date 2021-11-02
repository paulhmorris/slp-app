import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatient = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetPatient), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const patient = await db.patient.findFirst({ where: { id }, include: { address: true } })

  if (!patient) throw new NotFoundError()

  return patient
})
