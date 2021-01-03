import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import {connect} from "react-redux";
import {getAllScreams} from "../redux/actions/dataActions";

const Home = (props) => {
    const [listScreams, setListScreams] = useState([])
    const [screams, setScreams] = useState([])

    useEffect(() => {
        async function fetchData() {
            props.getAllScreams()
        }

        fetchData()
    }, [])

    useEffect(() => {
        setListScreams(!props.data.loading ? (
            props.data.screams.map(scream => <Scream key={scream.screamId}
                                                     scream={scream}/>)
        ) : (<p>Loading...</p>))
        setScreams(props.data.screams)
    }, [props.data.loading, props.data.screams, screams])

    return (
        <Grid container>
            <Grid item sm={8} xs={12}>
                <div className="posts__list">
                    {listScreams}
                </div>
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, {getAllScreams})(Home)