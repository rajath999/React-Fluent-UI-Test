import { useEffect, useRef, useState } from "react";
import AntT from "../AntTree";

const AntdTree = () => {
    const [result, setResult] = useState<any>(null);
    const [worker, setWorker] = useState<any>(null);
    const [timer, setTimer] = useState(new Date());
    const [perform, setPerform] = useState<number>(0);

    const display = useRef<HTMLInputElement>()
    
    useEffect(() => {
        // Create a new web worker
        const myWorker = new Worker('worker.js');
    
        // Set up event listener for messages from the worker
        myWorker.onmessage = function (event) {
          // console.log('Received result from worker:', event.data);
          if (typeof event.data === 'object') {
            console.log("ERROR: ", event.data)
          } else {
            console.log("Result : ", event.data);
            setResult(event.data);  
          }
          
          console.log("Perform : ", performance.now() - perform);
          console.timeEnd("worker")
        };
    
        // Save the worker instance to state
        setWorker(myWorker);

    
        // Clean up the worker when the component unmounts
        return () => {
          myWorker?.terminate();
        };
      }, []); // Run this effect only once when the component mounts

      const handleWorker = () => {
        const value = display.current?.value  
        console.time("worker")      
        setPerform(performance.now())
        worker.postMessage(value)
      }
  return (
    <>
      <h1>Ant Tree</h1>
      {JSON.stringify(result)}
      <input type="number" name="display" id="display" ref={display as any}/>
      <button onClick={handleWorker}>Click</button>

      <AntT />
    </>
  );
};

export default AntdTree;
