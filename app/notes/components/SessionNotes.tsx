import { Transition } from '@headlessui/react'
import EmptyState from 'app/core/components/EmptyState'
import { Toast } from 'app/core/components/Toast'
import { Tooltip } from 'app/core/components/Tooltip'
import { invalidateQuery, useMutation, usePaginatedQuery, useSession } from 'blitz'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import { useState } from 'react'
import toast from 'react-hot-toast'
import createNote from '../mutations/createNote'
import getNotes from '../queries/getNotes'
import { NoteForm } from './NoteForm'
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

const ITEMS_TO_RENDER = 3

type SessionNotesInput = {
  goalId: number
}

export const SessionNotes = ({ goalId }: SessionNotesInput) => {
  const session = useSession()
  const [createNoteMutation] = useMutation(createNote, {
    onSuccess: async () => {
      await invalidateQuery(getNotes)
    },
    onError: () => {
      toast.custom((t) => (
        <Toast
          show={t.visible}
          type="error"
          title="Something went wrong"
          message="We couldn't add your note."
        />
      ))
    },
  })
  const [page, setPage] = useState(1)
  const loadMoreNotes = () => {
    setPage(page + 1)
  }
  const [{ notes, hasMore }] = usePaginatedQuery(getNotes, {
    where: { goalId },
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
              goalId,
              userId: session.userId,
              ...values,
            })
          } catch (error) {
            console.error('Error: ', error)
          }
        }}
        submitText="Add Note"
        className="mb-4"
      />
      {notes.length ? (
        <>
          <Transition show={true} appear={true}>
            <ul role="list" className="space-y-2 sm:space-y-4">
              {notes.map((note, noteIdx) => (
                <NoteItem
                  key={noteIdx}
                  id={note.id}
                  author={note.author}
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
      ) : (
        <EmptyState message="No notes for this goal" />
      )}
    </>
  )
}

const NoteItem = ({ id, author, createdAt, body }) => {
  return (
    <Transition.Child
      as="li"
      className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6"
      enter="transition ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      id={id}
    >
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <h3 className="text-base font-medium">
          {/* TODO: setup User page and link this up */}
          <span className="text-sm text-gray-600 hover:text-indigo-700 hover:cursor-pointer hover:underline">
            {author.firstName} {author.lastName}
          </span>{' '}
          <span className="text-gray-400 text-sm font-normal">wrote (Id: {id})</span>
        </h3>
        <Tooltip content={dayjs(createdAt).format('M/D/YY h:mma z')}>
          <div className="mt-1 text-sm text-gray-500 whitespace-nowrap sm:mt-0 sm:ml-3 cursor-pointer hover:text-indigo-700 hover:underline">
            <time dateTime={createdAt.toISOString()}>{dayjs(createdAt).fromNow()}</time>
          </div>
        </Tooltip>
      </div>
      <div
        className="mt-4 space-y-6 text-sm text-gray-800"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </Transition.Child>
  )
}
