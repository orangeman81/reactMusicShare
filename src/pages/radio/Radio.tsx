import { Subscription } from 'rxjs';
import React, { Component } from 'react';
import Card from '../../components/Card/mediaCard';
import { AlbumsService } from '../../stores/appStore';


class Radio extends Component {

    state = {
        data: [
            {
                title: "",
                preview: "",
                artist: {
                    name: ""
                },
                album: {
                    cover_medium: ""
                }
            }
        ],
        query: ""
    }

    sub: Subscription = new Subscription();

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h1>Radio</h1>
                <main className="container">
                    {
                        this.state.data.map((card, i) => {
                            return <Card key={i} title={card.title} artist={card.artist.name} image={card.album.cover_medium}>
                            </Card>
                        })
                    }
                </main>
            </div>
        );
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

}

export default Radio;
