import React, { useState } from 'react';
import '../../azure.css';
import { computerVision, isConfigured as ComputerVisionIsConfigured } from '../../azure-cognitiveservices-computervision';

const AnalyzeImage = ({photo}) => {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const handleQuery = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      setAnalysis(item);
      setFileSelected("");
      setProcessing(false);
    });

  };

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
  }

  const DisplayResults = () => {
    return (
      <div>
        <h2>Computer Vision Analysis</h2>
        <div><img src={analysis.URL} height="200" border="1" alt={(analysis.description && analysis.description.captions && analysis.description.captions[0].text ? analysis.description.captions[0].text : "can't find caption")} /></div>
        {PrettyPrintJson(analysis)}
      </div>
    )
  };


    const handleChange = (e) => {
       
        var file = e.target.files[0]
        var reader = new FileReader();
        reader.onloadend = function()
        {
        setFileSelected(reader.result) // this is the base64 encoded dataurl
        }
        reader.readAsDataURL(file);
        }

    

  const Analyze = () => {
    return (
    <div>
      <h1>Analyze image</h1>
     
        <div>
          <div>
            <label>URL</label>
            <input type="file" id="myImage" placeholder="Upload photo" onChange={(e) => handleChange(e)} size="50"/>
            <output id="thumbnail"/>
          </div>
          <button onClick={handleQuery}>Analyze</button>
        </div>
        {fileSelected && <img src={fileSelected}/>}
        {analysis && <DisplayResults/>}
      </div>

    )
  }
  
  const CantAnalyze = () => {
    return (
      <div>Key and/or endpoint not configured in ./azure-cognitiveservices-computervision.js</div>
    )
  }

  const ready = ComputerVisionIsConfigured()
  
  return (
    <div>
    {ready ? <Analyze/> : <CantAnalyze/>}
    </div>
    
  );
}

export default AnalyzeImage;
