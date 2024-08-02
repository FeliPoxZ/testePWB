import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
//import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react';

function App() {
  const url = "http://localhost:8080/api/hello";
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  //const ipcTeste = () => ipcRenderer('request-go-server','http://localhost:8080/api/hello');
  const ipcTeste= () => window.electron.ipcRenderer.send('request-go-server', url);


  const [messageFromMain, setMessageFromMain] = useState('');


  useEffect(() => {
    window.electron.ipcRenderer.on('retorno', (event, arg) => {
      console.log(arg); // Aqui você pode lidar com a mensagem recebida
      setMessageFromMain(arg);
    });
  }, []);


  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        {messageFromMain}
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcTeste}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App

