import React, { Component } from 'react';
import Card from '../../components/Card/mediaCard';
import { AlbumsService } from '../../stores/appStore';
import { Subscription } from 'rxjs';
import { AlbumsI } from '../../models/albums'

class Albums extends Component {

    state = {
        data: []
    };

    sub: Subscription = new Subscription();

    componentDidMount() {
        this.sub = AlbumsService.$store
            .subscribe(state => {
                if (state.albums !== []) {
                    this.setState({ data: state.albums })
                }
            });
    }

    render() {
        return (
            <div>
                <main className="container">
                    <section className="row">
                        {
                            this.state.data.map((card: AlbumsI, i) => {
                                return <Card key={i} title={card.title} artist={card.artist.name} image={card.album.cover_medium}>
                                </Card>
                            })
                        }
                    </section>
                </main>
            </div>
        );
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

}

export default Albums;
