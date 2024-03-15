import axios from "axios"

const BASE_URL = "https://www.cbr-xml-daily.ru/daily_json.js";

export const getInfo = async () => {
    try {
        const result = await axios({
            url:`${BASE_URL}`,
            method:"GET"
        })
        return result.data 
    } catch (error) {
        console.log(error)
    }
}