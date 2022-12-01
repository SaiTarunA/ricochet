import React from 'react'
import { setGlobalState } from '../state'
import "../../styles/scanner.css"
import BarcodeScanner from '../helpers/scanner/BarcodeScanner'
import { useNavigate } from 'react-router-dom/dist'
import GoBackIcon from "../../assets/right_arrow_icon.svg"

const Scanner = (props) => {

    let navigate = useNavigate()

React.useEffect(() => {
    if (!props.hasNavBar) {
    setGlobalState("hasNavBar", true)
    }
}, [props.hasNavBar])

React.useEffect(() => {
    const navbarText = <div className='navbar_main_bg' style={{background: "linear-gradient(180deg, black, transparent)"}}><div className='navbar_main workspace'>
        <div onClick={() => navigate(-1)} className="go_back_icon">
            <img src={GoBackIcon} alt="Back"/>
        </div>
        <div className="navbar_scan_title">Scan Barcode</div>
    </div></div>
    setGlobalState("navBarInnerComp", navbarText)
  return () => {
    setGlobalState("isWebCam", true)
    setGlobalState("navBarInnerComp", null)
  }
}, [])

  return (
    <section style={props.sectionStyle} className="scanner_section">
        <BarcodeScanner />
    </section>
  )
}

export default Scanner