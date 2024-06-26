import './Pokemon.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Pokemon({endpoint}) {
    const [pokemon, setPokemon] = useState([])
    const [error, toggleError] = useState(false)
    const [loading, toggleLoading] = useState(false)

    useEffect(() => {


        async function fetchData() {
            toggleError(false)
            toggleLoading(true)

            try {
                const response = await axios.get(endpoint)
                setPokemon(response.data)
            } catch (e) {
                console.error('Fout bij ophalen')
            }
        }


    }, []);

    return (

        <article className='pokemon-card'>
            {Object.keys(pokemon).length > 0 &&
                <>
                    <p>{pokemon.name}</p>
                    <img src={pokemon.sprites.front_default} alt='afbeelding'/>
                    <p><strong>Moves: </strong>{pokemon.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemon.weight}</p>
                    <p><strong>Abilities: </strong></p>
                    <ul>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name} - ${pokemon.name}`}>
                                    {ability.ability.name}
                                </li>

                            )
                        })}
                    </ul>
                </>
            }
            {loading && <p>Loading...</p>}
            {Object.keys(pokemon).length === 0 && error && <p>Er ging iets mis bij het ophalen van deze Pokèmon...</p>}
        </article>


    )
}

export default Pokemon;