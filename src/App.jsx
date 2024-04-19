import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberInclude, setNumberInclude] = useState(false);
  const [charInclude, setCharInclude] = useState(false);
  const [password, setPassword] = useState("");

  //callBack hook loads program into chache to improve performance
  const passwdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberInclude) str += "0123456789";
    if (charInclude) str += "~!@#$%^&*()_+{};";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberInclude, charInclude, setPassword]);

  //useEffect hook automatically invoked when any changes occur.
  useEffect(() => {
    passwdGenerator();
  }, [length, numberInclude, charInclude, passwdGenerator]);

  //useRef hook to take Element as a reference
  const passRef = useRef(null);

  function copyPass2Clip() {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Password copy to the Clipboard! (win + v)");
  }
  return (
    <>
      <div className="p-10 bg-[#141042]  m-auto my-2 rounded-xl text-center flex flex-wrap gap-2 text-white">
        <div>
          <h1 className="text-4xl mb-4 italic">Password Generator</h1>
          <input
            className="px-3 py-2 rounded-md w-[85%] mx-1 mb-2 outline-none text-black"
            type="text"
            value={password}
            placeholder="Password"
            ref={passRef}
            readOnly
          />
          <button
            className="p-2 px-5 border-2 bg-green-500 rounded-md text-black active:opacity-[0.8]"
            onClick={copyPass2Clip}
          >
            Copy
          </button>
        </div>
        <div className="flex">
          <div className="flex items-center gap-x-3">
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
        </div>

        <div className="flex">
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              defaultChecked={numberInclude}
              className="cursor-pointer"
              onChange={() => {
                setNumberInclude((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
        </div>

        <div className="flex ">
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              defaultChecked={charInclude}
              className="cursor-pointer"
              onChange={() => {
                setCharInclude((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
