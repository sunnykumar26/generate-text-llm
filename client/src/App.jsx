// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');

//   const handleInputChange = (event) => {
//     setPrompt(event.target.value);
//   };

//   const handleChatRequest = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/chat', { prompt });
//       setResponse(response.data.text);
//     } catch (error) {
//       console.error('Error fetching chat response:', error);
//       setResponse('Failed to fetch response');
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>GENERATE TEXT USING AI (Gemini Model)</h1>
//       </header>
//       <main>
//         <div>
//           <h2>Ask anything to generate !</h2>
//           <div>
//             <input type="text" value={prompt} onChange={handleInputChange} />
//             <button onClick={handleChatRequest}>Send</button>
//           </div>
//           <div>
//             <p><strong>Response:</strong></p>
//             <div className="res-body">
//             <ReactMarkdown>{response}</ReactMarkdown>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleChatRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://generate-text-llm.onrender.com/api/chat', { prompt });
      setResponse(response.data.text);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setResponse('Failed to fetch response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GENERATE TEXT USING AI (Gemini Model)</h1>
      </header>
      <main>
        <div>
          <h2>Ask anything to generate!</h2>
          <div>
            <input type="text" value={prompt} onChange={handleInputChange} />
            <button onClick={handleChatRequest} disabled={isLoading}>Send</button>
          </div>
          <div>
            <p><strong>Response:</strong></p>
            <div className="res-body">
              {isLoading ? (
                <p>Generating, please wait...</p>
              ) : (
                <ReactMarkdown>{response}</ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
