import React from 'react'
import { setGlobalState } from '../state'
import "../../styles/welcome.css"
import { NavLink } from 'react-router-dom'
import { STORES_LIST_PAGE_LINK } from '../constants/Global'
import "../../styles/welcome.css"
import {ReactComponent as Logo} from "../../assets/logo.svg"
import {ReactComponent as HomeImage} from "../../assets/home_image.svg"
import RightArrowIcon from "../../assets/right_arrow_icon.svg"

const Welcome = (props) => {
React.useEffect(() => {
if (props.hasNavBar === true) {
    setGlobalState("hasNavBar", false)
}
}, [props.hasNavBar])

    return (
        <section style={props.sectionStyle}>
            <div className='home workspace'>
                <div className="home_logo">
                    <Logo />
                </div>
                <div className="home_image">
                    <HomeImage />
                </div>
                <div className="home_text">
                    <div className="home_title">
                        Scan &#183; Save &#183; Go
                    </div>
                    {/* <div className="home_subtitle">
                    Fast, Secure, and Convenient
                    </div> */}
                </div>
                <NavLink to={STORES_LIST_PAGE_LINK} style={{width: "100%"}}>
                    <button type="primary" style={{width: "100%"}}>
                        <span>Let's Go</span>
                        <img src={RightArrowIcon} alt="->" />
                    </button>
                </NavLink>
            </div>
        </section>
    )
}

export default Welcome