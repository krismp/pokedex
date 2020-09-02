import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    margin: `1rem auto`,
    textTransform: `capitalize`,
    textDecoration: `none`
  },
  productInfo: {
    textAlign: `center`,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PokemonCard({ name }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        title={name}
      />
    </Card>
  );
}
