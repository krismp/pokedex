import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    listItem: {
      textTransform: `capitalize`
    }
  }));

function PokemonInfo({ pokemon }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    function handleChange(panel) {
        return (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
    }

    return <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Moves</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" aria-label="contacts">
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
    </>
}

export default PokemonInfo;