import React from 'react';
import { connect } from 'react-redux';
import './Song_Page.css';
import NoResults from './NoResults';
import {
  SongHeader,
  Song,
  SideNav,
  Search,
  Player,
  Loader,
  requireAuth,
} from '../../common';

class Selection extends React.Component {
  renderTracks() {
    if (Object.values(this.props.tracks).length > 0) {
      return this.props.tracks.items.map(a => (
        <Song
          key={a.id}
          songId={a.id}
          uri={a.uri}
          song={a.name}
          artist={a.artists[0].name}
          album={a.album.name}
          timestamp={(a.duration_ms / 60000).toFixed(2)}
        />
      ));
    }
  }

  renderSearchResults() {
    if (Object.values(this.props.tracks).length > 0) {
      if (this.props.tracks.items.length > 0) {
        return (
          <div className="song_page_wrapper">
            <div className="song_featured_pic_wrapper">
              <div
                className="song_image"
                style={{
                  backgroundImage: `url("${
                    this.props.tracks.items[0].album.images[0].url
                  }")`,
                }}
              />
              <div className="song_featured">
                <h1>Featured</h1>
                <h1>{this.props.tracks.items[0].name}</h1>
                <h2>{this.props.tracks.items[0].artists[0].name}</h2>
              </div>
            </div>

            <div className="song_wrapper">
              <SongHeader />
              {this.renderTracks()}
            </div>
          </div>
        );
      }
      return <NoResults userInput={this.props.userSearch} />;
    }
    return <NoResults userInput={this.props.userSearch} />;
  }

  render() {
    document.title = this.props.userSearch;
    return (
      <div className="push_content song_page">
        {this.props.isLoading ? <Loader /> : ''}
        <SideNav />
        <Search />
        {this.renderSearchResults()}
        <Player />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let tracks = {};
  if (Object.values(state.searchResults).length > 0) {
    tracks = state.searchResults.tracks;
  }
  return {
    tracks,
    userSearch: state.searchText.chars,
    isLoading: state.isLoading,
  };
};

export default requireAuth(
  connect(
    mapStateToProps,
    {}
  )(Selection)
);
