import Tippy, { TippyProps } from '@tippyjs/react/headless'
import { animated, useSpring } from 'react-spring'

export const Tooltip = ({ children, placement = 'top', content }: TippyProps) => {
  const config = { tension: 170, friction: 26 }
  const initialStyles = { opacity: 0, transform: 'translateY(5px)' }
  const [props, setSpring] = useSpring(() => initialStyles)

  function onMount() {
    setSpring({
      opacity: 1,
      transform: 'translateY(0px)',
      onRest: () => {},
      config,
    })
  }

  function onHide() {
    setSpring({
      ...initialStyles,
      config: { ...config, clamp: true },
    })
  }

  return (
    <Tippy
      placement={placement}
      onMount={onMount}
      onHide={onHide}
      render={(attrs) => (
        <animated.div
          style={props}
          {...attrs}
          className="bg-gray-700 text-white text-xs leading-tight rounded-lg shadow-lg whitespace-nowrap w-auto py-2 px-3 after:"
        >
          {content}
        </animated.div>
      )}
    >
      {children}
    </Tippy>
  )
}
