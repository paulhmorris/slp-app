import faker from 'faker'
import db from './index'

const seed = async () => {
  // Create session type
  const sessionType = await db.sessionType.create({
    data: {
      name: 'Speech',
    },
  })

  // Create one patient with 10 sessions
  const patient = await db.patient.create({
    data: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    },
  })

  // Create one session with 10 notes
  const session = await db.patientSession.create({
    data: {
      sessionTypeId: sessionType.id,
      patientId: patient.id,
    },
  })

  for (let i = 0; i < 10; i++) {
    // Create patients
    await db.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isActive: Math.random() < 0.25,
      },
    })
    // Create sessions
    await db.patientSession.create({
      data: {
        sessionTypeId: sessionType.id,
        patientId: patient.id,
        status: faker.random.arrayElement(['New', 'In Progress', 'Complete']),
      },
    })
    // Create notes
    await db.note.create({
      data: {
        userId: 1,
        createdAt: faker.date.between('2021-01-01', new Date()),
        patientSessionId: session.id,
        body: faker.lorem.sentences(),
      },
    })
  }
}

export default seed
