import React from "react";
import Link from 'next/link'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PokemonCard from "../components/PokemonCard";
import { getPokemons } from "../lib/api";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: `none`,
  },
}));

function Index({ pokemons }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={5}
    >
      {(pokemons.length) > 0 && pokemons.map(pokemon => (
        <Grid item xs={12} lg={6} key={pokemon.name}>
          <Link href={`/pokemons/[name]`} as={`/pokemons/${pokemon.name}`}>
            <a className={classes.link}>
              <PokemonCard name={pokemon.name}/>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export async function getServerSideProps() {
  const json = await getPokemons();

  return {
    props: {
      pokemons: json.results
    }
  }
}

export default Index;