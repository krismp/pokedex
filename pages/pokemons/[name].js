import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showAlert } from "../../store";
import CropFreeIcon from '@material-ui/icons/CropFree';
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { getPokemonDetail, postCatchPokemon, getPokemonImage } from "../../lib/api";
import PokemonInfo from "../../components/PokemonInfo";

const useStyles = makeStyles((theme) => ({
  media: {
    height: `50%  `,
    width: `50% `,
    margin: `0 auto`,
    padding: '10px'
  },
}));

function PokemonDetail(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const { pokemon, dispatchShowAlert } = props;

  async function handleCatchPokemon(pokemon) {
    setLoading(true);
    await setTimeout(async () => { 
      const data = await postCatchPokemon({ 
        pokemonId: pokemon.id,
        name: pokemon.name
      });
      if (data) {
        dispatchShowAlert({
          message: `${pokemon.name} has been successfully catched!`,
          severity: "success",
        });
      } else {
        dispatchShowAlert({
          message: `${pokemon.name} got away! Try again, don't give up!`,
          severity: "warning",
        });
      }
      setLoading(false);
    }, 3000);
  }

  return (<Grid
    container
    direction="column"
    justify="space-between"
    alignItems="center"
    spacing={3}
  >
    <Grid item>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={pokemon.name}
            image={getPokemonImage(pokemon.id)}
            title={pokemon.name}
            className={classes.media}
            height="50%"
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
                  {pokemon.name.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item>
                <PokemonInfo pokemon={pokemon} />
              </Grid>
            </Grid>
            <Typography variant="body2" color="textSecondary" component="p">
              {pokemon.detail}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth={true}
        startIcon={
          loading ? <HourglassEmptyIcon /> : <CropFreeIcon />
        }
        onClick={() => handleCatchPokemon(pokemon)}
        disabled={loading}
      >
        {loading ? `Catching ${pokemon.name}...` : "Catch!"}
      </Button>
    </Grid>
  </Grid>);
}

export async function getServerSideProps(appContext) {
  const { name } = appContext.query;
  const json = await getPokemonDetail(name);

  return {
    props: {
      pokemon: json,
    },
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ dispatchShowAlert: showAlert }, dispatch);

export default connect(null, mapDispatchToProps)(PokemonDetail);
