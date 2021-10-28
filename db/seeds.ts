import faker from 'faker'
import db from './index'

const seed = async () => {
  // Create session types
  await db.sessionType.createMany({
    data: [{ name: 'Speech' }, { name: 'Occupational' }, { name: 'Physical' }],
  })

  // Create session statuses
  await db.sessionStatus.createMany({
    data: [{ name: 'New' }, { name: 'In Progress' }, { name: 'Complete' }, { name: 'Canceled' }],
  })

  // Create goal statuses
  const goalTypes = await db.goalStatus.createMany({
    data: [{ name: 'In Progress' }, { name: 'Discontinued' }, { name: 'Met' }, { name: 'On Hold' }],
  })

  // Create Intervention Areas
  await db.goalCategory.createMany({
    data: [
      { name: 'Expressive Language' },
      { name: 'Receptive Language' },
      { name: 'Pragmatics/Social Skills' },
      { name: 'Articulation/Phonology' },
      { name: 'Feeding' },
      { name: 'Fluency' },
    ],
  })

  // Create one patient with 10 sessions
  const patient = await db.patient.create({
    data: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.past(10, new Date()),
    },
  })

  // Create 4 long term goals
  for (let i = 0; i < 4; i++) {
    await db.goal.createMany({
      data: [
        {
          title: faker.lorem.sentence(),
          patientId: patient.id,
          sessionTypeId: 1,
          goalStatusId: 1,
          goalCategoryId: faker.random.number({ min: 1, max: 6 }),
        },
      ],
    })
  }

  // Create a session
  const session = await db.patientSession.create({
    data: {
      sessionTypeId: 1,
      patientId: patient.id,
      sessionStatusId: faker.random.number({ min: 1, max: 4 }),
    },
  })

  const user = await db.user.create({
    data: {
      name: 'Leslie Knope',
      email: 'admin@blitz.com',
      hashedPassword: 'password1',
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
        dateOfBirth: faker.date.past(10, new Date()),
        isActive: Math.random() > 0.1,
      },
    })
    // Create sessions
    await db.patientSession.create({
      data: {
        sessionTypeId: 1,
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
        title: faker.lorem.sentence(),
        goalStatusId: 1,
        sessionTypeId: 1,
        goalCategoryId: faker.random.number({ min: 1, max: 6 }),
        parentGoalId: faker.random.number({ min: 1, max: 4 }),
      },
    })
  }
  // Create scores
  for (let i = 0; i < 10; i++) {
    await db.score.create({
      data: {
        createdBy: user.id,
        value: faker.random.number({ min: 25, max: 95 }),
        goalId: faker.random.number({ min: 1, max: 10 }),
      },
    })
  }
}

export default seed
