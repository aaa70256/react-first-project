# React + Vite

* 使用vite創建react好處是，可以加快執行的速度，傳統CRA(create-react-app)的方式，需要透過webpack打包編譯後  
才能執行，而透過vite創建則可以利用Rollup 協助進行生產環境的打包，幫助我開發時能有更好的體驗(瀏覽器執行效率更好)。

### install react using vite
如果沒有打這段的話 ``-- --template react`` 創建時會讓你選擇要安裝的模板跟語言 *自定義*
```
npm create vite@latest vite-react-project -- --template react
```

#### 進入專案並install相關依賴後啟動react
```
  cd vite-react-project
  npm install
  npm run dev
```

## Notes

### memo - 
  
  memo本身是HOC,是一個function,透過Shallo compare(淺比較),判斷兩個值是否相等,主要都用來判斷props有沒有相等,來決定components要不要rerender.  

ex：  
```
import React, { memo } from 'react'

const CP_Memo = memo(({ value }) => {
  console.log('CP_memo Render...');
  return (
    <div>
      <p>{value}</p>
    </div>
  )
})
```
### useMemo - 
  
  useMemo功能跟Memo類似，但不同的是它是react hook,應用的場景也不同,memo主要判斷props來決定 **components** 要不要rerender,但useMemo通常會應用在較複雜的邏輯 **function** 運算,同時也可以給它一個 `參數`,用這個`參數`來判斷是否要讓function rerender.  
    
  ex：  
  ```
import {  useMemo } from "react"  
  
  const expemsiveFC = (number) => {
  for (let i = 0; i < 10000000000000; i++) {
    return number * 10
  }
}  
  
  function App() {
    const expemsiveValue = useMemo(() => {
      console.log('useMemo rander...');
      return expemsiveFC(10)
  }, []);
  }
```
  
### useCallback - 
  
  當我們app每次重新render時,function也會重複render,假設我們function有props資料到components,該components也會重新render到,這樣效能會大打折扣.  

  雖然我們可以在components用memo來防止重複render,但如果今天我們props的是function、陣列、物件，這種type的資料,當這些資料在app rerender的時候,他們也會重新rerender,這時這一次的資料就部會等於上一次的資料了*即使props過去的資料跟上一次一模一樣,涉及到fc不等於fc的概念*,所以我們需要用useCallback來鎖住該資料,讓它不要app rerender時也跟著rerender,此外我們也可以透過傳 ``參數`` 的方式來決定什麼資料改動時它一起rerender.  
    
  ex：  
  ```
import {  useCallback } from "react"  
  
   const sayHello = useCallback(() => {
    console.log('Hello');
  }, []);
  ```

  ### useRef - 
    
useRef是react hook,最常用來綁定在DOM元素上,以便取得DOM元素的各屬性，以及利用它不會跟著組件重新渲染的特性，來儲存可變值.  
  
  ex：
  ```
import { useRef } from "react"  
  
  const CP_UseRef = () => {
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
```
```
//儲存可變值  
import React, { useRef, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0); // 使用 useRef 存储 renderCount

  renderCount.current += 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Rendered: {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

### useReducer - 
useReducer是useState的替代方案,也是一個react hook,用於管理資料狀態.  
  
*通常較複雜的狀態管理會使用到useReducer.*

useReducer可以傳入三個參數,下面直接做使用說明.  
    
step 1  

首先,我們會先定義一個reducer,並且傳入兩個參數,第一個參數是useReducer初始化定義的資料,第二個參數為使用者丟進來的資料.
```
//App.jsx

import { useReducer } from "react"  //引入userReducer  

//定義你希望這個reducer做什麼事情
const reducer = (todos, action) => {
  console.log(todos, action)
  const { value } = action.payload
  switch (action.type) {
    case "ADD":
      return [...todos, newTodo(value)];
    case "toggle":
      return todos.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, complete: !item.complete }
        }
        return item
      })
    case 'delete':
      return todos.filter(item => {
        return item.id !== action.payload.id
      })
    default:
      return todos;
  }
}
const newTodo = (todoContent) => {
  return { id: Math.floor(Math.random() * 100000), todoContent, complete: false }
}

```
step 2  
在fuction內呼叫useReducer.  

useReducer可以傳入兩個參數,第一個是剛剛上面宣告的reducer,第二個是希望它資料是什麼型態的參數.  
  
解構出來的第一個參數就是你現在所有正在useReducer管理狀態內的資料,第二個參數為function,主要用來呼叫上面定義的reducer動作,dispatch必須傳入你要帶入的資料,好讓reducer可以正確進行資料的處理.
```
//App.jsx

const App = ()=>{
  const [todos, dispatch] = useReducer(reducer, [])
}
```
  
step 3  
  
以這次範例我們需要將資料丟到components內進行渲染,所以我們必須將todos的資料丟到components內.  

然然後也要將call reducer的 `dispatch` 帶過去,這樣後續我們在做資料處理時才能夠啟動reducer來幫我們做動作,將 `dispatch` 理解為啟動器,用來啟動reducer這樣會比較好理解.
```
//App.jsx

return (
    <div>
      <h2>useReducer</h2>
      <form onSubmit={submitHandler}>
        <input
          value={value}
          type="text"
          onChange={(e) => { setValue(e.target.value) }} />
      </form>

      //******************* 看這一段 *********************
      {
        todos.map(item => {
          return <ReducerList todo={item} dispatch={dispatch} key={item.id} />
        })
      }
      //*****************************************************
      
    </div>
  )
```
step 4  
  
將資料帶進來component後我們要渲染的資料就放在todo裡面,而當我們資料須進行處理的時候,我們就只需要call dispatch,並把要處理的資料帶進去就可以了.
```
//ReducerList.jsx

import React from 'react'
import '../style/all.scss'

const ReducerList = ({ todo, dispatch }) => {
  return (
    <div className='ReducerList'>
      <span style={{ textDecoration: todo.complete ? 'line-through' : null }}>{todo.todoContent}</span>
      <button className='complete_btn' onClick={() => {
        dispatch({ type: 'toggle', payload: { id: todo.id } })
      }}>
        {todo.complete ? 'Cancel' : 'Complete'}
      </button>
      <button className='delete_btn' onClick={() => {
        dispatch({ type: 'delete', payload: { id: todo.id } })
      }}>Delete</button>
    </div>
  )
}

export default ReducerList
```

### useContext