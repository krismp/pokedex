import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function MyAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Alert(props) {
  return (
    <Snackbar open={props.isOpen} autoHideDuration={props.autoHideDuration} onClose={props.onClose}>
      <MyAlert severity={props.severity} onClose={props.onClose}>
        {props.message}
      </MyAlert>
    </Snackbar>
  );
}
