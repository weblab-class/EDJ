import React, { Component } from "react";
import { get } from "../../utilities";
import user from "../../../../server/models/user.js";
import Info from "../modules/Game/Info.js";
import "./Profile.css";


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user : undefined,
            loading: true,
        };
    }

    componentDidMount(){
        get('/api/user', { userId: this.props.userId}).then((user)=>{
            this.setState({user: user, loading: false});
        })
    }

    render(){
     if(this.state.loading){
            return (<div>Loading</div>)
        }
    return(
        <div>
            <div className="title1"> Profile </div>
            <div className="title2">{this.state.user.name}</div>
           
           
           
        </div>
    )
    }
}
export default Profile;