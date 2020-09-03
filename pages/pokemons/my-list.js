import React, { useState, useEffect } from "react";
import Router from 'next/router';
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMyPokemonList, getPokemonImage, releasePokemon } from "../../lib/api";
import { showAlert } from "../../store";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  link: {
    textDecoration: 'none',
    textTransform: "capitalize"
  }
});

function MyList(props) {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { pokemons, dispatchShowAlert } = props;

  async function releasePokemonHandler(pokemon) {
    setLoading(true);
    await releasePokemon(pokemon.id);
    dispatchShowAlert({
      message: `${pokemon.name} has been successfully released!`,
      severity: "success",
    });
    setLoading(false);
    Router.push('/pokemons/my-list')
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={5}
    >
      {pokemons.length > 0 && (
        pokemons.map((pokemon) => (
          <Grid item xs={12} lg={4} key={pokemon.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={pokemon.name}
                    image={getPokemonImage(pokemon.pokemon_id)}
                    title={pokemon.name}
                    className={classes.media}
                    height="20%"
                  />
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                          <Link href={`/pokemons/[name]`} as={`/pokemons/${pokemon.name}`}>
                            {pokemon.name.toUpperCase()}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {pokemon.detail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.button}
                          startIcon={<DirectionsRunIcon />}
                          onClick={() => releasePokemonHandler(pokemon)}
                          disabled={loading}
                        >
                          { loading ? `Releasing ${pokemon.name} ...` : `Release this pokemon`}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </CardActionArea>
              </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export async function getServerSideProps() {
  const json = await getMyPokemonList();

  return {
    props: {
      pokemons: json
    }
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ dispatchShowAlert: showAlert }, dispatch);

export default connect(null, mapDispatchToProps)(MyList);
