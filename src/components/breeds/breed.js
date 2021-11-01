import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const Breed = (props) => {
  const [expanded, setExpanded] = React.useState(false)
  console.log(props.reportData)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.breed[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.breed}
      />
      {/* <CardMedia
        component="img"
        height="194"
        // image="/static/images/cards/paella.jpg"
        alt={props.breed_group + " Group"}
      /> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          
        <Typography variant="body2" color="text.secondary">
          {props.temperament}
        </Typography>
      </CardContent>
        <CardContent>
          <Typography paragraph>Statistics:</Typography>
          {props.reportData ? <Typography paragraph>There have been {props.reportData.length} reports of this breed.</Typography> : null}

          <Typography paragraph>Size:</Typography>
          <Typography paragraph>
            Height: {props.height} inches
          </Typography>
          <Typography paragraph>
            Weight: {props.weight} lbs
          </Typography>
          <Typography paragraph>
            Probably a wiki snippet
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Breed