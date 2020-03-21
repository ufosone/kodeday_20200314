import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './lib/api';
import api from "./lib/api";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActivo    : false,
            personajes     : [],
            personajeSelect: {},
        }
    }

    componentDidMount() {
        api.getAllCharacters()
            .then(results => {
                this.setState({
                    personajes: results
                })
            })
            .catch(e => console.error(e))
    }

    activarModal(id) {
        api.getCharacterById(id)
            .then(personaje => {
                this.setState({
                    modalActivo    : true,
                    personajeSelect: personaje,
                })
            })
    }

    desactivarModal() {
        this.setState({
            modalActivo: false
        })
    }

    renderCards(p) {
        return (
            <div key={p.id} className="Card" onClick={e => this.activarModal(p.id)}>
                <div className="Card-imagen">
                    <figure>
                        <img alt={p.name} src={p.image}/>
                    </figure>
                </div>
                <div className="Card-descripcion">
                    <div className="Card-nombre">
                        <h3>{p.name}</h3>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {modalActivo, personajes, personajeSelect} = this.state;
        // const fakeData = [0, 1, 2, 3, 4, 5, 6, 7];
        const cards = personajes.map(personaje => this.renderCards(personaje));

        return (
            <div className="App">
                <div className="App-contenedor">
                    <h1>Rick and Morty</h1>
                    <div className="Cards-contenedor">
                        {cards}
                    </div>
                    {modalActivo ? (
                        <div className='Modal' onClick={e => this.desactivarModal()}>
                            <div className='Card-detalle'>
                                <div className="Card-imagen">
                                    <figure>
                                        <img alt={personajeSelect.nanme} src={personajeSelect.image}/>
                                    </figure>
                                </div>
                                <div className='Card-detalle-descripcion'>
                                    <div className='descripcion'>
                                        <h3>{personajeSelect.name}</h3>
                                        <div className='caracteristicas'>
                                            <p>Staus</p>
                                            <p className='caracteristica-valor'>{personajeSelect.status}</p>
                                        </div>
                                        <div className='caracteristicas'>
                                            <p>Especie</p>
                                            <p className='caracteristica-valor'>{personajeSelect.species}</p>
                                        </div>
                                        <div className='caracteristicas'>
                                            <p>Genero</p>
                                            <p className='caracteristica-valor'>{personajeSelect.gender}</p>
                                        </div>
                                        <div className='caracteristicas'>
                                            <p>Origen</p>
                                            <p className='caracteristica-valor'>{personajeSelect.origin.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
