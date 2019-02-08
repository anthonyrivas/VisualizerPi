import React from "react"
import Script from "react-load-script"
import { connect } from "react-redux"
import { deviceStateListener, updateProgress } from "../actions"

export default connect(null, {deviceStateListener, updateProgress})(

    class SpotifyScript extends React.Component {
        handleScriptLoad = () => {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                name: "Visualizer",
                getOAuthToken: cb => { cb(this.props.token); }
                });
        
                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });
        
                // Playback status updates
                player.addListener('player_state_changed', state => { 
                    if(state) {
                        console.log(state)
                        this.props.deviceStateListener(state)
                        // this.props.updateProgress(state.position)
                    } else {
                        this.props.deviceStateListener({})
                    }
                });
        
                // Ready
                player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                });
        
                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                });
        
                // Connect to the player!
                player.connect();
            };
        }

        render() {
            return (
                <Script
                    url="https://sdk.scdn.co/spotify-player.js"
                    onLoad={this.handleScriptLoad}
                />
            )
        }
    }
)