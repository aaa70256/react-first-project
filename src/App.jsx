import { useState, useCallback, useMemo } from "react"
import CP_memo from "./components/CP_Memo";
import CP_UseRef from "./components/CP_UseRef";
import CP_UseReducer from "./components/CP_UseReducer";
import APP_UseContext from "./components/useContext_demo/APP";

//useMemo
const expemsiveFC = (number) => {
  for (let i = 0; i < 10000000000000; i++) {
    return number * 10
  }
}

function App() {
  const [value, setValue] = useState('');
  console.log('App Render...');

  //每次app rander時，我們fc都會重新跑，會導致下面props的問題，如果我們希望它可以在更新時不重run的話，可以用
  //useCallback function來鎖住它，可以傳參數到[]內，等指定參數有變動時在rander
  const sayHello = useCallback(() => {
    console.log('Hello');
  }, []);


  //處理複雜運算時，會將資料暫存，提升效率，但不建議常使用，因為它暫存也需要空間,可以傳參數到[]內，等指定參數有變動時在rander
  const expemsiveValue = useMemo(() => {
    console.log('useMemo rander...');
    return expemsiveFC(10)
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p>{value}</p>
        {/* * 為什麼傳入sayHello後 明明傳入的內容一樣但卻會一直被rerander,
        * 是因為fc本身不等於fc([]、{ }也一樣),所以當我們App每次被重新
        * render之後,我上一次的fc就不等於這一次的fc了 */}
        <CP_memo value={123} sayHello={sayHello} />

        <p>expemsiveValue：{expemsiveValue}</p>

        <CP_UseRef value={value} />

        <CP_UseReducer />

        <APP_UseContext />
      </div>
    </>
  )
}

export default App
