import { useStopwatch } from 'react-timer-hook'

export const SessionTimer = () => {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  })

  return (
    <div>
      <div className="flex text-4xl tracking-wider">
        <Digit value={hours} title="Hours" />
        <span className="mx-3 h-auto mt-4">:</span>
        <Digit value={minutes} title="Minutes" />
        <span className="mx-3 h-auto mt-4">:</span>
        <Digit value={seconds} title="Seconds" />
      </div>
      <div className="space-x-2 mt-4">
        {/* @ts-ignore */}
        <button type="button" className="btn-white" onClick={reset}>
          Reset
        </button>
        <button type="button" className="btn-white" onClick={pause}>
          Pause
        </button>
        <button type="button" className="btn-primary" onClick={start}>
          Start
        </button>
      </div>
    </div>
  )
}

const Digit = ({ value, title }) => {
  const leftDigit = value >= 10 ? value.toString()[0] : '0'
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString()
  return (
    <div className="flex flex-col items-center">
      <p className="text-xs tracking-normal">{title}</p>
      <div>
        <span>{leftDigit}</span>
        <span>{rightDigit}</span>
      </div>
    </div>
  )
}
