

const data = async function () {
    try {
        const res = await fetch('./data.json');
        const jsonData = await res.json()
        return jsonData
    } catch (error) {
        console.log(error)
    }


}

export default data