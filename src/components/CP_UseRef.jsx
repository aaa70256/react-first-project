import { useRef } from "react"


const CP_UseRef = () => {
  console.log('useRef render...')
  const inputRef = useRef(null)
  const submitHandler = () => {
    console.log(inputRef.current.value);
  }
  return (
    <div>
      <h2>useRef</h2>
      <input type="text" ref={inputRef} />
      <button onClick={submitHandler}>確認</button>
    </div>
  )
}

export default CP_UseRef
