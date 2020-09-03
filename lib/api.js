import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

const { publicRuntimeConfig } = getConfig();

export const postLogin = async({ email, password }) => {
    const res = await fetch(`${publicRuntimeConfig.API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        }),
    });

    const data = await res.json();

    return data;
}

export const postRegister = async({ name, email, password, confirmPassword }) => {
    const res = await fetch(`${publicRuntimeConfig.API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
            c_password: confirmPassword,
        }),
    });

    const data = await res.json();

    return data;
}

const randomize = () => {
    var probabilities = [
        'Catched!',
        'Runaway!'
    ];

    return probabilities[Math.floor(Math.random() * probabilities.length)];

}

export const postCatchPokemon = async({ name, pokemonId }) => {
    const res = randomize();
    if (res === 'Catched!') {
        const res = await fetch(`${publicRuntimeConfig.BACKEND_API}/pokemons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                pokemon_id: pokemonId
            }),
        });

        const data = await res.json();

        return data;
    }

    return null;
}

export const getMyPokemonList = async() => {
    const res = await fetch(`${publicRuntimeConfig.BACKEND_API}/pokemons?_sort=id&_order=desc`);
    const json = await res.json();

    return json;
}

export const getPokemons = async() => {
    const res = await fetch(`${publicRuntimeConfig.API_BASE_URL}/pokemon?limit=100&offset=0`);
    const json = await res.json();

    return json;
}

export const getPokemonDetail = async(name) => {
    const res = await fetch(`${publicRuntimeConfig.API_BASE_URL}/pokemon/${name}`);
    const data = await res.json();

    return data;
}

export const getPokemonImage = (pokemonId) => {
    return `${publicRuntimeConfig.IMAGE_SRC}/${pokemonId}.png`;
}

export const releasePokemon = async(pokemonId) => {
    const res = await fetch(`${publicRuntimeConfig.BACKEND_API}/pokemons/${pokemonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await res.json();

    return data;
}