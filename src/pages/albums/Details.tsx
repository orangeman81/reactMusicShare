import React, { Component } from 'react';
import Card from '../../components/Card/mediaCard';
import { AlbumsService } from '../../stores/appStore';
import { Subscription } from 'rxjs';
import { AlbumsI } from '../../models/albums'

class Details extends Component {
    paramsId: number = Number((this.props as any).match.params['id']);

    state = {
        data: {
            id: 0,
            title: "",
            artist: {
                name: ""
            },
            album: {
                cover_medium: "some"
            }
        }
    };

    sub: Subscription = new Subscription();

    componentDidMount() {
        this.sub = AlbumsService.$store
            .subscribe(state => {
                if (state.albums !== []) {
                    const details: AlbumsI | undefined = state.albums.find(album => album.id === this.paramsId);
                    this.setState({ data: details });
                }
            });
    }

    render() {
        return (
            <div>
                <main className="container">
                    <section className="row">
                        <Card title={this.state.data.title} artist={this.state.data.artist.name} image={this.state.data.album.cover_medium}>
                        </Card>
                    </section>
                </main>
            </div>
        );
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

}

export default Details;