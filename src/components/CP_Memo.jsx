import React, { memo } from 'react'

//HOC
//memo = Shallo compare 只要上一次的值跟這一次傳進來是一樣的 它就不會去 rerander
const CP_Memo = memo(({ value }) => {
  console.log('CP_memo Render...');
  return (
    <div>
      <p>{value}</p>
    </div>
  )
})

export default CP_Memo
