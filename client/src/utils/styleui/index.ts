import Tooltip from '@material-ui/core/Tooltip'
import { withStyles, Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

export const TopTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#242424',
    color: theme.palette.common.white,
    fontSize: 15,
    textAlign: 'center',
  },
}))(Tooltip)

export const ActivityTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#242424',
    color: theme.palette.common.white,
    marginTop: 30,
    fontSize: 12,
  },
}))(Tooltip)

export const BadgesTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#242424',
    color: theme.palette.common.white,
    fontSize: 14,
  },
}))(Tooltip)

export const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    // boxShadow: '0px 0px 5px #444444'
  },
}))(Tooltip)

export const ProfileTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    color: '#DDDDDD',
    width: 220,
  },
}))(Tooltip)

export const SecretKeyTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#242424',
    color: theme.palette.common.white,
    fontSize: 15,
  },
}))(Tooltip)

export const TricksFiltersTextField = withStyles({
  root: {
    '&:hover': {
      '& .MuiInput-underline:after': {
        borderBottomColor: '#0062ca',
      },
    },

    '& label': {
      color: '#dddddd',
    },
    '& label.Mui-focused': {
      color: '#0062ca',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0062ca',
    },
  },
})(TextField)

export const DateTextField = withStyles({
  root: {
    '& label': {
      color: '#dddddd',
    },
    '& input': {
      color: '#dddddd',
    },
    '& label.Mui-focused': {
      color: '#0062ca',
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#0062ca',
    },
  },
})(TextField)

export const useStylesFilters = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',

      '& .MuiFormControl-root': {
        margin: '1px 0',
        color: 'red',
      },

      '& .MuiChip-root': {
        backgroundColor: '#999999',
        font: 'Montserrat',
        fontSize: '15px',
      },

      '& .MuiIconButton-root': {
        font: 'Montserrat',
        color: '#dddddd',
      },

      '& .MuiInput-root': {
        font: 'Montserrat',
        color: '#5fbeff',
        fontSize: '15px',
      },

      '& .MuiFormLabel-root': {
        font: 'Montserrat',
        fontSize: '17px',
        color: '#adadad',
      },
    },
    label: {
      '& .MuiTypography-root': {
        color: '#eeeeee',
        fontFamily: ['Montserrat', 'sans-serif'],
      },
    },
  })
)

/////////////////////////////////////////////
// UseStyle
/////////////////////////////////////////////

export const useStylesGroup = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '150px',

      '& .MuiSvgIcon-root': {
        display: 'none',
      },

      '& .MuiSelect-select': {
        fontSize: '1.9rem',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },

      '& .MuiFormControl-root': {
        margin: '1px 0',
      },

      '& .MuiChip-root': {
        backgroundColor: '#999999',
        font: 'Montserrat',
        fontSize: '2rem',
      },

      '& .MuiIconButton-root': {
        font: 'Montserrat',
        color: '#dddddd',
      },

      '& .MuiInput-root': {
        font: 'Montserrat',
        color: '#5fbeff',
      },

      '& .MuiFormLabel-root': {
        font: 'Montserrat',
        fontSize: '1.5rem',
        color: '#dddddd',
      },
    },
  })
)
