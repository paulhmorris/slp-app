import faker from 'faker'
import db from './index'

const seed = async () => {
  // Create session types
  const sessionTypes = await db.sessionType.createMany({
    data: [{ name: 'Speech' }, { name: 'Occupational' }, { name: 'Physical' }],
  })

  // Create session statuses
  const sessionStatuses = await db.sessionStatus.createMany({
    data: [{ name: 'New' }, { name: 'In Progress' }, { name: 'Complete' }, { name: 'Canceled' }],
  })

  // Create goal statuses
  const goalTypes = await db.goalStatus.createMany({
    data: [{ name: 'Met' }, { name: 'Discontinued' }, { name: 'In Progress' }, { name: 'On Hold' }],
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
      sessionTypeId: 1,
      patientId: patient.id,
      sessionStatusId: 1,
    },
  })

  for (let i = 0; i < 10; i++) {
    // Create patients
    await db.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isActive: Math.random() < 0.1,
      },
    })
    // Create sessions
    await db.patientSession.create({
      data: {
        sessionTypeId: 1,
        patientId: patient.id,
        status: faker.random.arrayElement(goalTypes),
        sessionStatusId: 1,
      },
    })
    // Create notes
    await db.note.create({
      data: {
        userId: 1,
        createdAt: faker.date.between('2021-10-01', new Date()),
        patientSessionId: session.id,
        body: faker.lorem.sentences(),
      },
    })
  }
}

export default seed
