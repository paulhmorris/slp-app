import { Switch } from '@headlessui/react'
import { classNames } from 'app/core/lib/helpers'

interface IToggleSwitch {
  checked: boolean
  onChange: () => any
  label?: string
  description?: string
  activeText?: string
  inactiveText?: string
}

export const ToggleSwitch = ({
  checked,
  onChange,
  label,
  description,
  activeText,
  inactiveText,
}: IToggleSwitch) => {
  return (
    <Switch.Group
      as="div"
      className={(label || description) && 'flex flex-col space-y-3 justify-between'}
    >
      <Switch
        checked={checked}
        onChange={onChange}
        className={classNames(
          checked ? 'bg-green-600 focus:ring-green-600' : 'bg-red-600 focus:ring-red-600',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        >
          <span
            className={classNames(
              checked ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 12 12">
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={classNames(
              checked ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
      <span className="flex-grow flex flex-col">
        {label && (
          <Switch.Label as="span" className="text-sm font-medium text-gray-500" passive>
            {label}
            <span className={checked ? 'text-green-700' : 'text-red-700'}>
              : {checked ? activeText : inactiveText}
            </span>
          </Switch.Label>
        )}
      </span>
      <span className="flex-grow flex flex-col">
        {description && (
          <Switch.Description as="span" className="text-sm text-gray-500">
            {description}
          </Switch.Description>
        )}
      </span>
    </Switch.Group>
  )
}
