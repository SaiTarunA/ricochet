import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CART_PAGE_LINK, NO_PRODUCT_PAGE_LINK } from '../../constants/Global';
import { setGlobalState, useGlobalState } from '../../state';
import Scanner from './Scanner';
import RetryIcon from "../../../assets/retry_icon.svg";
import SearchIcon from "../../../assets/search_icon.svg";
import LoadingGif from "../../../assets/loading.gif";
import {pick} from "../ObjectHelper";
import { useRef } from 'react';


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDataInRequiredFormat = (data) => {
  console.log("check_data", data);
  let dummyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQez_a9klxE3ZZGZTqtgVpLt0qk2NXshDGZ3tX8SuvgjmVs9boY6-98LvRT4vBF-yG3qBY&usqp=CAU";
  let newData = pick(data["product"], ["title", "images", "description"]);
  newData["name"] = newData["title"];
  newData["src"] =
    newData["images"] && newData["images"].length > 0
      ? newData["images"][0]
      : dummyImage;
  newData["price"] = getRndInteger(50, 200);
  newData["quantity"] = 1;
  newData["inCart"] = false;
  return newData;
};
export const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const BarcodeScanner = () => {
    const [scanResult] = useGlobalState("scanResult")
    const [codeText] = useGlobalState("codeText")
    const [finalCode] = useGlobalState("finalCode")
    const [loading, setLoading] = React.useState(false)
    const [inputRef, setInputFocus] = useFocus()

    const navigate = useNavigate()

    const _onDetected = (result) => {
        setGlobalState("scanResult", [])
        setGlobalState("scanResult", scanResult.concat([result]))
        setInputFocus()
      };

      const handleInputChange = (e) => {
        let localScanResult = [...scanResult]
        if (localScanResult[0] && localScanResult[0].codeResult) {
            localScanResult[0].codeResult.code = e.target.value
        }
        setGlobalState("codeText", e.target.value)
        setGlobalState("scanResult", localScanResult)
      }

      const handleRetryClick = () => {
        setGlobalState("scanResult", []);
        setGlobalState("codeText", "");
      };
      const fetchData = async (url) => {
        try {
            setLoading(true)
            axios.request({
                method: 'GET',
                url: 'https://barcodes1.p.rapidapi.com/',
                params: {query: finalCode},
                headers: {
                  'X-RapidAPI-Key': '6811610b1dmsh5a38698f873c377p12e3a0jsn8fe11c21f95c',
                  'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
                }
              }).then(function (response) {
                setLoading(false)
                localStorage.removeItem("scannedProductData")
                localStorage.setItem('scannedProductData', JSON.stringify(getDataInRequiredFormat(response.data)));
                if ("product" in response.data) {
                    navigate(CART_PAGE_LINK)
                } else {
                    // navigate(NO_PRODUCT_PAGE_LINK)
                    localStorage.removeItem("scannedProductData")
                    navigate(CART_PAGE_LINK)
                }
              }).catch(function (error) {
                setLoading(false)
                console.log(error)
                // navigate(NO_PRODUCT_PAGE_LINK)
                localStorage.removeItem("scannedProductData")
                navigate(CART_PAGE_LINK)
              })
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            // navigate(NO_PRODUCT_PAGE_LINK)
        }
      }
      const handleSearchClick = () => {
        if (finalCode.replace(/\s/g,"") !== "") {
            fetchData(finalCode)
        }
      }

      React.useEffect(() => {
        setGlobalState("finalCode", scanResult[0] && scanResult[0].codeResult
        ? scanResult[0].codeResult.code
        : codeText)
      }, [scanResult, codeText])
      
  return (
    <div className='barcode_scanner'>
        {loading && 
        <div className='loading_bg'>
            <img src={LoadingGif} alt="Loading..."/>
        </div>}
        <div className='barcode_overlay_section_bg'>
            <div className='barcode_overlay_section workspace'>
        <input
        ref={inputRef}
        placeholder='Enter Code'
        value={scanResult[0] && scanResult[0].codeResult
            ? scanResult[0].codeResult.code
            : codeText}
        onChange={(e) => {handleInputChange(e)}}
        />
        <button onClick={handleSearchClick} type="primary"><img src={SearchIcon} alt="Search" /></button>
        <button onClick={handleRetryClick}><img src={RetryIcon} alt="Retry" /></button>
        </div>
        </div>
        <Scanner onDetected={_onDetected} />
    </div>
  )
}

export default BarcodeScanner