import axios from 'axios'
import React from 'react'
import { setGlobalState, useGlobalState } from '../state'
import LocationIcon from "../../assets/location_icon.svg"
import EditIcon from "../../assets/edit_icon.svg"
import StoreMore from "../../assets/store_more.svg"
import StoreDmart from "../../assets/store_dmart.svg"
import StoreRatnadeep from "../../assets/store_ratnadeep.svg"
import StoreRating from "../../assets/store_rating.svg"
import "../../styles/storeslist.css"
import { NavLink } from 'react-router-dom'
import { SCAN_PAGE_LINK } from '../constants/Global'

const StoresList = (props) => {
    const [latitude] = useGlobalState("latitude")
    const [longitude] = useGlobalState("longitude")
    const [locationInfo] = useGlobalState("locationInfo")
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (props.hasNavBar === true) {
            setGlobalState("hasNavBar", false)
        }
    }, [props.hasNavBar])

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGlobalState("latitude", position.coords.latitude)
                setGlobalState("longitude", position.coords.longitude)
            })
        } else {
            console.log("error")
        }
    }, [])

    React.useEffect(() => {
        if (latitude && longitude) {
            setLoading(true)
            const options = {
                method: 'GET',
                url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
                params: {
                  lat: latitude,
                  lon: longitude,
                  'accept-language': 'en',
                  polygon_threshold: '0.0'
                },
                headers: {
                  'X-RapidAPI-Key': '6811610b1dmsh5a38698f873c377p12e3a0jsn8fe11c21f95c',
                  'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
                }
            }
            axios.request(options).then(function (response) {
                console.log(response.data);
                setLoading(false)
                const resultObj = response.data.address
                setGlobalState("locationInfo", `${resultObj.postcode}, ${resultObj.city}, ${resultObj.state}, ${resultObj.country}`)
            }).catch(function (error) {
                console.error(error);
                setLoading(false)
            });
            setLoading(false)
        }
    }, [latitude, longitude])
    
    
        
    return (
        <section style={props.sectionStyle}>
            <div className='stores_list workspace'>
                <div className='top_location_section'>
                    <div className='loction_icon'>
                        <img src={LocationIcon} alt="Loc" />
                    </div>
                    <div className='location_text'>
                    {loading ? "Loading..." : locationInfo}
                    </div>
                    <div className='location_edit_icon'>
                        <img src={EditIcon} alt="Loc" />
                    </div>
                </div>
                
                <div className='product_cards_container'>
                <div className='stores_list_title'>
                    Stores Near You
                </div>
                <NavLink  to={SCAN_PAGE_LINK}>
                    <div className='product_card'>
                        <div className='product_card_image'>
                            <img src={StoreDmart} alt="Store_Img" />
                        </div>
                        <div className='product_card_text_container'>
                            <div className='product_card_title'>
                                D-Mart
                            </div>
                            <div className='product_card_subtitle'>
                            {loading ? "Loading..." : `Popular Colony, ${locationInfo}`}
                            </div>
                            <div className='product_card_rating'>
                                <img src={StoreRating} alt="Image" />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink  to={SCAN_PAGE_LINK}>
                    <div className='product_card'>
                    <div className='product_card_image'>
                            <img src={StoreMore} alt="Image" />
                        </div>
                        <div className='product_card_text_container'>
                            <div className='product_card_title'>
                                More mega mart
                            </div>
                            <div className='product_card_subtitle'>
                            {loading ? "Loading..." : `14, Harlur, ${locationInfo}`}
                            </div>
                            <div className='product_card_rating'>
                                <img src={StoreRating} alt="Store_Img" />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink  to={SCAN_PAGE_LINK}>
                    <div className='product_card'>
                        <div className='product_card_image'>
                            <img src={StoreRatnadeep} alt="Store_Img" />
                        </div>
                        <div className='product_card_text_container'>
                            <div className='product_card_title'>
                                Ratnadeep Supermarket
                            </div>
                            <div className='product_card_subtitle'>
                                {loading ? "Loading..." : `Sarjapur Main Road, ${locationInfo}`}
                            </div>
                            <div className='product_card_rating'>
                                <img src={StoreRating} alt="Store_Img" />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default StoresList