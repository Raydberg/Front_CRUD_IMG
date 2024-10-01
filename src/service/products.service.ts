import axios from "axios"


export const findAllProducts = async()=>{
    const {data} = await axios.get("");
    return data;
}