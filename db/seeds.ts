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
      license: {
        create: {
          type: 'SLP',
          number: '176029514',
          expiresAt: new Date('2024-01-01'),
          state: 'TX',
          organizationId: org.id,
        },
      },
    },
  })

  const password = await SecurePassword.hash('password123')
  const user = await db.user.create({
    data: {
      username: 'admin@blitz.com',
      hashedPassword: password,
      role: 'CUSTOMER',
      memberships: {
        connect: { id: membership.id },
      },
      contact: {
        create: {
          firstName: 'Harriet',
          lastName: 'Morris',
          organizationId: org.id,
          email: faker.internet.email().toLowerCase(),
        },
      },
    },
  })
  console.dir(user)

  // Create Services
  await db.service.createMany({
    data: [
      {
        description: 'A default therapy service',
        rate: faker.datatype.number({ min: 100, max: 250 }),
        defaultDuration: 50,
        isDefault: true,
        organizationId: org.id,
      },
      {
        description: 'A therapy service',
        rate: faker.datatype.number({ min: 100, max: 250 }),
        defaultDuration: 50,
        organizationId: org.id,
      },
      {
        description: 'A therapy service',
        rate: faker.datatype.number({ min: 100, max: 250 }),
        defaultDuration: 50,
        organizationId: org.id,
      },
      {
        description: 'A therapy service',
        rate: faker.datatype.number({ min: 100, max: 250 }),
        defaultDuration: 50,
        organizationId: org.id,
      },
    ],
  })

  // Create goal statuses
  await db.goalStatus.createMany({
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

  // Create primary patient
  const patient = await db.patient.create({
    data: {
      organizationId: org.id,
    },
  })

  // Create Contacts
  await db.contact.createMany({
    data: [
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        organizationId: org.id,
        dateOfBirth: faker.date.between('2012-01-01', new Date()),
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        organizationId: org.id,
        dateOfBirth: faker.date.between('1950-01-01', '2000-01-01'),
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        organizationId: org.id,
        dateOfBirth: faker.date.between('1950-01-01', '2000-01-01'),
      },
    ],
  })

  // Create Phones
  await db.phone.createMany({
    data: [
      {
        organizationId: org.id,
        allowCalls: true,
        allowTexts: true,
        number: faker.phone.phoneNumber(),
        contactId: faker.datatype.number({ min: 2, max: 4 }),
      },
      {
        organizationId: org.id,
        allowCalls: true,
        allowTexts: true,
        number: faker.phone.phoneNumber(),
        contactId: faker.datatype.number({ min: 2, max: 4 }),
      },
      {
        organizationId: org.id,
        allowCalls: true,
        allowTexts: true,
        number: faker.phone.phoneNumber(),
        contactId: faker.datatype.number({ min: 2, max: 4 }),
      },
    ],
  })

  // Create PatientRelation records
  await db.patientRelation.createMany({
    data: [
      {
        patientId: patient.id,
        contactId: 2,
        relationType: 'PATIENT',
        isMinor: true,
        organizationId: org.id,
      },
      {
        patientId: patient.id,
        contactId: 3,
        relationType: 'FAMILY_MEMBER',
        isEmergencyContact: true,
        responsibileForBilling: true,
        organizationId: org.id,
      },
      {
        patientId: patient.id,
        contactId: 4,
        relationType: 'GUARDIAN',
        organizationId: org.id,
      },
    ],
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

  // Create Appointments
  await db.appointment.createMany({
    data: [
      {
        scheduledAt: faker.date.between(new Date(), '2022-03-01'),
        patientId: patient.id,
        organizationId: org.id,
      },
      {
        scheduledAt: faker.date.between(new Date(), '2022-03-01'),
        patientId: patient.id,
        organizationId: org.id,
      },
      {
        scheduledAt: faker.date.between(new Date(), '2022-03-01'),
        patientId: patient.id,
        organizationId: org.id,
      },
      {
        scheduledAt: faker.date.between(new Date(), '2022-03-01'),
        patientId: patient.id,
        organizationId: org.id,
      },
      {
        scheduledAt: faker.date.between(new Date(), '2022-03-01'),
        patientId: patient.id,
        organizationId: org.id,
      },
      {
        scheduledAt: faker.date.between(new Date(), '2022-03-01'),
        patientId: patient.id,
        organizationId: org.id,
      },
    ],
  })

  for (let i = 0; i < 50; i++) {
    // Create Notes
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
