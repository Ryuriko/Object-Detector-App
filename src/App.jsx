import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as cocoModel from "@tensorflow-models/coco-ssd"
import './App.css'
import { useEffect, useState } from "react"

function App() {
  const [model, setModel] = useState()
  const [objectName, setObjectName] = useState("")
  const [objectScore, setObjectScore] = useState("")
  
  async function loadModel(){
    try {
      const dataset = await cocoModel.load()
      setModel(dataset)
      console.log("dataset ready...")
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])

  async function predict() {
    const detection = await model.detect(document.getElementById("videoSource"))
    if(detection.length > 0) {
      detection.map((result, i) =>  {
        setObjectName(result.class)
        setObjectScore(result.score)
      })
    }
  }

  const videoOption = {
    width: 720,
    height: 480,
    facingMode: "environtment"
  }
  
  return (
    <div className="App">
      <h1>OBJECT DETECTOR APP</h1>
      <h2>{objectName ? objectName.toString() : "" }</h2>
      <h2>{objectScore ? objectScore.toString() : "" }</h2>
      <hr />
      <Webcam
      id="videoSource"
      audio={false}
      videoconstaints={videoOption}
      />
      <hr />
      <button onClick={() => predict()}>Detect</button>
    </div>
  );
}

export default App
