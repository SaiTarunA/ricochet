import React from 'react'
import { setGlobalState } from '../state'
import "../../styles/scanner.css"
import BarcodeScanner from '../helpers/scanner/BarcodeScanner'
import { NavLink } from 'react-router-dom'
import { MAIN_PAGE_LINK } from '../constants/Global'

const Scanner = (props) => {

React.useEffect(() => {
    if (!props.hasNavBar) {
    setGlobalState("hasNavBar", true)
    }
}, [props.hasNavBar])

React.useEffect(() => {
  return () => {
    setGlobalState("isWebCam", true)
  }
}, [])

  return (
    <section style={props.sectionStyle}>
        <BarcodeScanner />
        <NavLink to={MAIN_PAGE_LINK}>
                <button>Go to Welcome</button>
            </NavLink>
    </section>
  )
}

export default Scanner