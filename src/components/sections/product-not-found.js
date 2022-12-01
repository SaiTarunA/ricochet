import React from 'react'
import { setGlobalState } from '../state'

const ProductNotFound = (props) => {
    React.useEffect(() => {
        if (!props.hasNavBar) {
        setGlobalState("hasNavBar", true)
        }
    }, [props.hasNavBar])
  return (
    <section style={props.sectionStyle}>
        ProductNotFound
        </section>
  )
}

export default ProductNotFound