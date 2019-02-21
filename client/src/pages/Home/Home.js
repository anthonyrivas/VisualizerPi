import React from 'react'
import requireAuth from "../../components/HOC/requireAuth"
import { connect } from "react-redux"
import { compose } from "redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback } from "../../actions"
import Search from '../../components/Search/Search'
import ResultsGrid from '../../components/Results/ResultsGrid'
import SpotifyScript from '../../components/SpotifyScript'
import history from "../../history";
import './Home.css'

const Home = (props) => (
    <div className="home">
        <SpotifyScript 
            token={props.auth.accessToken}
        />
        <Search displayResults={true} songClickHandler={(songURI)=>{
            props.playPlayback(songURI)
            history.push('/visualizer')
        }}/>
        <ResultsGrid 
        results={props.searchResults}
        playSong={(songURI)=>{
            props.playPlayback(songURI)
            history.push( '/visualizer')
        }} 
        />
    </div>
)

const mapStateToProps = (state) => ({
    auth: state.auth,
    isPlayback:state.playState.isPlayState, 
    currSongPlayback:state.currSongPlayback,
    currSongAnalysis:state.songAnalysis,
    searchResults:state.searchResults
})

const enhance = compose(requireAuth)

const EnhancedComponent = connect(mapStateToProps,
    {
        playPlayback, 
        stopPlayback,
        updateProgress,
        fetchCurrPlayback
    })(Home)

    export default enhance(EnhancedComponent)