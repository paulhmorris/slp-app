import { classNames } from 'app/core/lib/helpers'

interface ScoreButtonProps {
  color: 'green' | 'red' | 'purple' | 'indigo' | 'pink' | 'yellow' | 'blue' | 'gray'
  icon: JSX.Element
  callback?: () => any
}

/** Returns a square-ish button with a centered icon */
export default function ScoreButton({ color, icon, callback }: ScoreButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500`,
        'inline-flex justify-center items-center p-2 mb-9 border border-transparent rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
      onClick={callback}
    >
      {icon}
    </button>
  )
}
