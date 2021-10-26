import { Transition } from '@headlessui/react'
import { useMutation, usePaginatedQuery, useSession } from 'blitz'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import { Prisma } from 'db'
import { useState } from 'react'
import createNote from '../mutations/createNote'
import getNotes from '../queries/getNotes'
import { NoteForm } from './NoteForm'
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

const ITEMS_TO_RENDER = 3

export const SessionNotes = ({ patientSessionId }: Prisma.NoteWhereInput) => {
  const session = useSession()
  const [createNoteMutation] = useMutation(createNote)
  const [page, setPage] = useState(1)
  const loadMoreNotes = () => {
    setPage(page + 1)
  }

  const [{ notes, hasMore }, { refetch }] = usePaginatedQuery(getNotes, {
    where: { patientSessionId },
    take: ITEMS_TO_RENDER * page,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <NoteForm
        initialValues={{ body: '' }}
        onSubmit={async (values) => {
          try {
            await createNoteMutation({
              patientSessionId,
              userId: session.userId,
              ...values,
            })
            refetch()
          } catch (error) {
            alert('Error creating note')
          }
        }}
        submitText="Add Note"
        className="mb-4"
      />
      <Transition show={true} appear={true}>
        <ul role="list" className="space-y-2 sm:space-y-4">
          {notes.map((note, noteIdx) => (
            <NoteItem
              key={noteIdx}
              id={note.id}
              author={note.author.name}
              createdAt={note.createdAt}
              body={note.body}
            />
          ))}
        </ul>
      </Transition>

      <button
        className="btn-secondary ml-auto sm:mt-4 w-full sm:w-auto"
        disabled={!hasMore}
        onClick={loadMoreNotes}
      >
        Load More
      </button>
    </>
  )
}

const NoteItem = (props) => {
  const [showTime, setShowTime] = useState(false)

  return (
    <Transition.Child
      as="li"
      className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6"
      enter="transition ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      id={props.id}
    >
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <h3 className="text-base font-medium">
          {/* TODO: setup User page and link this up */}
          <span className="text-sm text-gray-600 hover:text-indigo-700 hover:cursor-pointer hover:underline">
            {props.author}
          </span>{' '}
          <span className="text-gray-400 text-sm font-normal">wrote</span>
        </h3>
        <div
          onMouseEnter={() => setShowTime(true)}
          onMouseLeave={() => {
            setShowTime(false)
          }}
          className="mt-1 text-sm text-gray-500 whitespace-nowrap sm:mt-0 sm:ml-3 relative cursor-pointer hover:text-indigo-700 hover:underline"
        >
          <time dateTime={props.createdAt.toISOString()}>{dayjs(props.createdAt).fromNow()}</time>
          <Transition
            as="div"
            show={showTime}
            enter="transition-opacity ease-in duration-100 delay-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute top-0 z-10 w-auto py-2 px-3 -mt-1 text-xs leading-tight text-white transform -translate-y-full -translate-x-6 bg-gray-700 rounded-lg shadow-lg"
          >
            {dayjs(props.createdAt).format('M/D/YY h:mma z')}
            <svg
              className="absolute z-10 w-6 h-6 transform translate-x-9 delay fill-current stroke-current text-gray-700"
              width="8"
              height="8"
            >
              <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
            </svg>
          </Transition>
        </div>
      </div>
      <div
        className="mt-4 space-y-6 text-sm text-gray-800"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
    </Transition.Child>
  )
}
