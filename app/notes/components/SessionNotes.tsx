import { Transition } from '@headlessui/react'
import { usePaginatedQuery } from 'blitz'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Prisma } from 'db'
import { useState } from 'react'
import getNotes from '../queries/getNotes'
dayjs.extend(relativeTime)

let itemsToRender = 3

export const SessionNotes = (patientSessionId: Prisma.NoteWhereInput) => {
  const [page, setPage] = useState(1)
  const [loadMore, setLoadMore] = useState(false)

  const loadMoreNotes = () => {
    setPage(page + 1)
  }

  const [{ notes, hasMore }] = usePaginatedQuery(getNotes, {
    where: patientSessionId,
    take: itemsToRender * page,
    orderBy: { createdAt: 'desc' },
  })

  console.log(notes)

  return (
    <div className="flex flex-col max-w-5xl py-4 sm:px-6 lg:px-8">
      <Transition show={true}>
        <ul role="list" className="space-y-2 sm:space-y-4">
          {notes.map((note) => (
            <NoteItem key={note.id} note={{ note }} />
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
    </div>
  )
}

const NoteItem = ({ note }) => {
  return (
    <Transition.Child
      as="li"
      className="group bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6"
      enter="transition ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <h3 className="text-base font-medium">
          {/* TODO: setup User page and link this up */}
          <span className="text-sm text-gray-600 hover:text-indigo-700 hover:cursor-pointer">
            {note.author.name}
          </span>{' '}
          <span className="text-gray-400 text-sm font-normal">wrote</span>
        </h3>
        <p className="mt-1 text-sm text-gray-500 whitespace-nowrap sm:mt-0 sm:ml-3 relative">
          <time dateTime={note.createdAt.toISOString()}>{dayjs(note.createdAt).fromNow()}</time>
          <span>{dayjs(note.createdAt)}</span>
        </p>
      </div>
      <div
        className="mt-4 space-y-6 text-sm text-gray-800"
        dangerouslySetInnerHTML={{ __html: note.body }}
      />
    </Transition.Child>
  )
}
