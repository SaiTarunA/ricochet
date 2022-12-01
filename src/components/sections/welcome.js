import React from 'react'
import { setGlobalState } from '../state'
import "../../styles/welcome.css"
import { NavLink } from 'react-router-dom'
import { SCAN_PAGE_LINK } from '../constants/Global'

const Welcome = (props) => {
React.useEffect(() => {
if (props.hasNavBar === true) {
    setGlobalState("hasNavBar", false)
}
}, [props.hasNavBar])

    return (
        <section style={props.sectionStyle}>
            <div>Welcome</div>
            <NavLink to={SCAN_PAGE_LINK}>
                <button>Scan Code</button>
            </NavLink>
        </section>
    )
}

export default Welcome