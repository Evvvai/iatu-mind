import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
// import Snackbar from '@material-ui/core/Snackbar'

export function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
