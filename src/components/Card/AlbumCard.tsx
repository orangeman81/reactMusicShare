import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardActions, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ArtistCard: React.FC<{ title: string, artist: string, image: string, id: number }> = ({ title, artist, image, id }) => {
    const useStyles = makeStyles({
        card: {
            width: "100%"
        },
        media: {
            minHeight: "8vh",
            objectFit: "cover"
        },
    });
    const classes = useStyles();

    return (
        <div className="col s6 d-flex">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {artist}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={'/' + id}>
                        Link
                    </Link>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default ArtistCard;