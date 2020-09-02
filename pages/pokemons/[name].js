import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { catchPokemon, showAlert } from "../../store";
import CropFreeIcon from '@material-ui/icons/CropFree';
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { getPokemonDetail, postCatchPokemon, getPokemonImage } from "../../lib/api";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  media: {
    height: `50%  `,
    width: `50% `,
    margin: `0 auto`,
    padding: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  table: {
    minWidth: 650,
  },
  listItem: {
    textTransform: `capitalize`
  }
}));

function PokemonDetail(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const { pokemon, cartId, dispatchShowAlert, dispatchCatchPokemon, user } = props;
  const [expanded, setExpanded] = useState(false);

  function handleChange(panel) {
    return (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  }

  async function handleCatchPokemon() {
    setLoading(true);
    const data = await postCatchPokemon({
      userId: user.id,
      cartId: cartId,
      productId: pokemon.id,
      total: 1,
      price: parseFloat(pokemon.price_in_usd),
    });
    setLoading(false);
    if (data.success) {
      dispatchShowAlert({
        message: data.message,
        severity: "success",
      });
      dispatchCatchPokemon(data.data);
    } else {
      const mainMessage = data.message;
      const message = Object.keys(data.data).map((err) => {
        return (
          <>
            {data.data[err].map((e) => {
              return <li>{e}</li>;
            })}
          </>
        );
      });
      dispatchShowAlert({
        message: (
          <>
            <p>{mainMessage}</p>
            <ul>{message}</ul>
          </>
        ),
        severity: "error",
      });
    }
  }

  return (
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
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>Moves</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List component="nav" className={classes.root} aria-label="contacts">
                    {pokemon.moves.map(move => {
                      return <ListItem button key={move.move.name}>
                        <ListItemIcon>
                          <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary={move.move.name} className={classes.listItem} />
                      </ListItem>
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className={classes.heading}>Types</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List component="nav" className={classes.root} aria-label="contacts">
                    {pokemon.types.map(type => {
                      return <ListItem button key={type.slot}>
                        <ListItemIcon>
                          <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary={type.type.name} className={classes.listItem} />
                      </ListItem>
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
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
                color="primary"
                size="large"
                startIcon={
                  loading ? <HourglassEmptyIcon /> : <CropFreeIcon />
                }
                onClick={handleCatchPokemon}
              >
                {loading ? `Catching ${pokemon.name}...` : "Catch!"}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardActionArea>
    </Card>
  );
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

function mapStateToProps(state) {
  const { cartId, user } = state;
  return { cartId, user };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ dispatchCatchPokemon: catchPokemon, dispatchShowAlert: showAlert }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
