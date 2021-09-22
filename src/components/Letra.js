import React, { Fragment } from 'react';

const Letra = ({ letra }) => {

    if(letra === '') return null;

    return (
        <Fragment>
            <h2>Letra de la Canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
    );
}

export default Letra;