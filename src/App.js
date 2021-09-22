import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Letra from './components/Letra';
import Info from './components/Info';

function App() {

  const [buscarLetra, setBuscarLetra] = useState({});
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  useEffect(() => {
    if (Object.keys(buscarLetra).length === 0) return;
    const { artista, cancion } = buscarLetra;

    const consultarApi = async () => {
      const url_cancion = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const [res_letra, res_informacion] = await Promise.all([
        fetch(url_cancion),
        fetch(url_info)
      ]);
      const [letra, informacion] = await Promise.all([
        res_letra.json(),
        res_informacion.json()
      ]);
      if (res_letra.status === 404) {
        setError(true);
        setMensaje('No se encontraron resultados')
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }
      setLetra(letra.lyrics);
      setInfo(informacion.artists[0]);
    }
    consultarApi();
  }, [buscarLetra]);


  return (
    <Fragment>
      <Formulario
        setBuscarLetra={setBuscarLetra}
        error={error}
        setError={setError}
        setMensaje={setMensaje}
        mensaje={mensaje}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Letra
              letra={letra}
            />
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
