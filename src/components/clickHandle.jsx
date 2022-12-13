import { useRef } from 'react'

export const DoubleClick = ({
  onClick = () => {},
  onDoubleClick = () => {},
  children
}) => {
  const timer = useRef()

  const onClickHandler = event => {
    clearTimeout(timer.current)

    if (event.detail === 1) {
      timer.current = setTimeout(onClick, 200)
    } else if (event.detail === 2) {
      onDoubleClick()
    }
  }

  return <div onClick={onClickHandler}>{children}</div>
}
