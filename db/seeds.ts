import { SecurePassword } from 'blitz'
import faker from 'faker'
import db from './index'

const seed = async () => {
  const org = await db.organization.create({
    data: {
      name: 'Default Organization',
    },
  })

  const membership = await db.membership.create({
    data: {
      role: 'OWNER',
      organizationId: org.id,
    },
  })

  const password = await SecurePassword.hash('password123')
  const user = await db.user.create({
    data: {
      email: 'admin@blitz.com',
      hashedPassword: password,
      role: 'CUSTOMER',
      memberships: {
        connect: { id: membership.id },
      },
    },
  })
  console.dir(user)

  // Create goal statuses
  const goalTypes = await db.goalStatus.createMany({
    data: [
      { name: 'In Progress', organizationId: org.id },
      { name: 'Discontinued', organizationId: org.id },
      { name: 'Mastered', organizationId: org.id },
      { name: 'On Hold', organizationId: org.id },
    ],
  })

  // Create Intervention Areas
  await db.goalCategory.createMany({
    data: [
      { name: 'Expressive Language', organizationId: org.id },
      { name: 'Receptive Language', organizationId: org.id },
      { name: 'Pragmatics/Social Skills', organizationId: org.id },
      { name: 'Articulation/Phonology', organizationId: org.id },
      { name: 'Feeding', organizationId: org.id },
      { name: 'Fluency', organizationId: org.id },
    ],
  })

  await db.scoreType.createMany({
    data: [
      { name: 'Percentage', organizationId: org.id },
      { name: 'Frequency', organizationId: org.id },
      { name: 'Duration', organizationId: org.id },
    ],
  })

  // Create one patient with 10 sessions
  const patient = await db.patient.create({
    data: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.past(10, new Date()),
      organizationId: org.id,
    },
  })

  // Create 4 long term goals
  for (let i = 0; i < 4; i++) {
    const goal = await db.goal.create({
      data: {
        title: faker.lorem.sentence(),
        patientId: patient.id,
        goalStatusId: 1,
        goalCategoryId: faker.datatype.number({ min: 1, max: 6 }),
        organizationId: org.id,
      },
    })
    // Create child goals
    for (let i = 0; i < 5; i++) {
      await db.goal.create({
        data: {
          patientId: patient.id,
          title: faker.lorem.sentence(),
          goalStatusId: 1,
          goalCategoryId: goal.goalCategoryId,
          parentGoalId: goal.id,
          defaultScoreTypeId: faker.datatype.number({ min: 1, max: 3 }),
          organizationId: org.id,
        },
      })
    }
  }

  // Create an appointment
  const appointment = await db.appointment.create({
    data: {
      patientId: patient.id,
      organizationId: org.id,
    },
  })

  for (let i = 0; i < 10; i++) {
    // Create patients
    await db.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.past(10, new Date()),
        isActive: Math.random() > 0.1,
        organizationId: org.id,
      },
    })
    // Create appointments
    await db.appointment.create({
      data: {
        patientId: patient.id,
        organizationId: org.id,
      },
    })
  }

  for (let i = 0; i < 100; i++) {
    // Create notes
    await db.note.create({
      data: {
        userId: 1,
        createdAt: faker.date.between('2021-10-01', new Date()),
        body: faker.lorem.sentences(),
        goalId: faker.datatype.number({ min: 1, max: 10 }),
        noteTypeId: 1,
        organizationId: org.id,
      },
    })
  }

  for (let i = 0; i < 100; i++) {
    // Create scores
    await db.score.create({
      data: {
        createdBy: user.id,
        createdAt: faker.date.between('2021-10-01', new Date()),
        value: faker.datatype.number({ min: 25, max: 95 }),
        goalId: faker.datatype.number({ min: 1, max: 10 }),
        scoreTypeId: faker.datatype.number({ min: 1, max: 3 }),
        organizationId: org.id,
      },
    })
  }
}

export default seed
