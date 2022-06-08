import axios from "axios";

let insertValue = (value) => {
    try {
        axios.post(`/api/test/insert?value=${value}`)        
    } catch (error) {
        console.error(error)
    }
}

let readValue = (value) => {
    try {
        axios.get(`/api/test`)
    } catch (error) {
        console.error(error)
    }
}

let modifyValue = (value) => {
    try {
        axios.post(`/api/test/modify?value=${value}`)
    } catch (error) {
        console.error(error)
    }
}

let deleteValue = () => {
    try {
        axios.post(`/api/test/delete}`)
    } catch (error) {
        console.error(error)
    }
}
