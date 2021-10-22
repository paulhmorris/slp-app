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
    data: [{ name: 'In Progress' }, { name: 'Discontinued' }, { name: 'Met' }, { name: 'On Hold' }],
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
      sessionTypeId: faker.random.number({ min: 1, max: 3 }),
      patientId: patient.id,
      sessionStatusId: faker.random.number({ min: 1, max: 4 }),
    },
  })

  const user = await db.user.create({
    data: {
      name: 'Harriet Morris',
      email: 'paulh.morris@gmail.com',
      hashedPassword: faker.internet.password(8),
      role: 'USER',
    },
  })

  console.dir(user)

  for (let i = 0; i < 10; i++) {
    // Create patients
    await db.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isActive: Math.random() > 0.1,
      },
    })
    // Create sessions
    await db.patientSession.create({
      data: {
        sessionTypeId: faker.random.number({ min: 1, max: 3 }),
        patientId: patient.id,
        status: faker.random.arrayElement(goalTypes),
        sessionStatusId: faker.random.number({ min: 1, max: 4 }),
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
    // Create goals
    await db.goal.create({
      data: {
        patientId: patient.id,
        name: faker.lorem.sentence(),
        goalStatusId: faker.random.number({ min: 1, max: 4 }),
        sessionTypeId: faker.random.number({ min: 1, max: 3 }),
        isLongTerm: Math.random() < 0.01,
      },
    })
  }
}

export default seed
