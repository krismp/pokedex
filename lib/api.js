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

export const postCatchPokemon = async() => {
    // const res = await 
    return await "catched!";
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