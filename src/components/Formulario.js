import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({ setBuscarLetra, error, setError, mensaje, setMensaje }) => {

    const [busqueda, setBusqueda] = useState({
        artista: '',
        cancion: ''
    })

    const { artista, cancion } = busqueda;
    const actualizarState = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const buscarCancion = e => {
        e.preventDefault();
        // Validar
        if (cancion.trim() === '' || artista.trim() === '') {
            setError(true);
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        // Paso la validacion
        setError(false);
        setBuscarLetra(busqueda);
    }

    return (
        <div className="bg-info">
            {error ? <Error mensaje={mensaje} /> : null}
            <div className="container">
                <div className="row">

                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarCancion}
                    >
                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones</legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>

                        </fieldset>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Formulario;