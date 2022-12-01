import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CART_PAGE_LINK, NO_PRODUCT_PAGE_LINK } from '../../constants/Global';
import { setGlobalState, useGlobalState } from '../../state';
import Scanner from './Scanner'

const BarcodeScanner = () => {
    const [scanResult] = useGlobalState("scanResult")
    const [codeText] = useGlobalState("codeText")
    const [finalCode] = useGlobalState("finalCode")

    const navigate = useNavigate()

    const _onDetected = (result) => {
        setGlobalState("scanResult", [])
        setGlobalState("scanResult", scanResult.concat([result]))
      };

      const handleInputChange = (e) => {
        console.log(e.target.value)
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
            axios.request({
                method: 'GET',
                url: 'https://barcodes1.p.rapidapi.com/',
                params: {query: finalCode},
                headers: {
                  'X-RapidAPI-Key': '6811610b1dmsh5a38698f873c377p12e3a0jsn8fe11c21f95c',
                  'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
                }
              }).then(function (response) {
                console.log(response.data)
                localStorage.removeItem("scannedProductData")
                localStorage.setItem('scannedProductData', JSON.stringify(response.data));
                if ("product" in response.data) {
                    navigate(CART_PAGE_LINK)
                } else {
                    navigate(NO_PRODUCT_PAGE_LINK)
                }
              }).catch(function (error) {
                console.log(error)
                navigate(NO_PRODUCT_PAGE_LINK)
              })
        } catch (error) {
            console.log(error.response)
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
    <div>
        <span>Barcode Scanner</span>
        <input
        value={scanResult[0] && scanResult[0].codeResult
            ? scanResult[0].codeResult.code
            : codeText}
        onChange={(e) => {handleInputChange(e)}}
        />
        <button onClick={handleRetryClick}>Retry</button>
        <button onClick={handleSearchClick}>Search</button>
        <Scanner onDetected={_onDetected} />
    </div>
  )
}

export default BarcodeScanner