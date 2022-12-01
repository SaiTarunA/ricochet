import React from 'react'
import { setGlobalState } from '../state'

const Cart = (props) => {
    React.useEffect(() => {
        if (!props.hasNavBar) {
        setGlobalState("hasNavBar", true)
        }
    }, [props.hasNavBar])

  return (
    <section style={props.sectionStyle}>Cart</section>
  )
}

export default Cart