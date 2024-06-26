import './App.css'
import logo from './assets/pokemon_logo.jpg'
import {useEffect, useState} from "react";
import Button from "./components/button/Button.jsx";
import Pokemon from "./components/pokemon/Pokemon.jsx";
import axios from "axios";

function App() {
    const [pokemon, setPokemon] = useState([])
    const [error, toggleError] = useState(false)
    const [loading, toggleLoading] = useState(false)
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/')

    useEffect(() => {
        const controller = new AbortController()

        async function fetchData() {
            toggleLoading(true)
            toggleError(false)

            try {
                const {data} = await axios.get(endpoint, {
                    signal: controller.signal
                })
                setPokemon(data);
            }
            catch (e){
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...')
                }
                else {
                    console.error(e)
                    toggleError(true)
                }
            }
            finally {
                toggleLoading(false)
            }
        }

    }, [endpoint]);

        return (
            <div className='poke-stack'>
                {pokemon &&
                    <>
                <img src={logo} alt="logo" width="400px"/>
                <section className='button-section'>
                <Button clickHandler={() => setEndpoint(pokemon.previous)} disabled={!pokemon.previous}>Vorige</Button>
                <Button clickHandler={() => setEndpoint(pokemon.next)}>Volgende</Button>
                </section>

                {pokemon.results && pokemon.results.map((pokemon) => {
                    return <Pokemon key={pokemon.name} endpoint={pokemon.url} />
                })}
                    </>
}
                {loading && <p>Loading...</p>}
                {pokemon.length === 0 && error && <p>Er ging iets mis bij het ophalen van de data...</p>}
            </div>

        )
}

export default App
