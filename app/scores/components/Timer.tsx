import { useStopwatch } from 'react-timer-hook'

export const Timer = () => {
  const { seconds, minutes, hours, start, pause, reset, isRunning } = useStopwatch({
    autoStart: false,
  })

  return (
    <div>
      <div className="flex text-md tracking-wider justify-between">
        <Digit value={hours} title="Hours" />
        <span className="mx-3 h-auto mt-4">:</span>
        <Digit value={minutes} title="Minutes" />
        <span className="mx-3 h-auto mt-4">:</span>
        <Digit value={seconds} title="Seconds" />
      </div>
      <div className="flex justify-center space-x-2 mt-4 w-64">
        {/* @ts-ignore */}
        <button type="button" className="btn-white" onClick={reset}>
          Reset
        </button>
        <button type="button" className="btn-white" onClick={pause}>
          Pause
        </button>
        {!isRunning ? (
          <button type="button" className="btn-secondary" onClick={start}>
            Start
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={start}>
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

const Digit = ({ value, title }) => {
  const leftDigit = value >= 10 ? value.toString()[0] : '0'
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString()
  return (
    <div className="flex flex-col items-center w-14">
      <p className="text-xs tracking-normal">{title}</p>
      <div>
        <span>{leftDigit}</span>
        <span>{rightDigit}</span>
      </div>
    </div>
  )
}
