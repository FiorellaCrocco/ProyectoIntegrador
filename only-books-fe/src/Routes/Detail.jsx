/* eslint-disable no-unused-vars */
import DetalleLibro from "../Components/DetalleLibro/DetalleLibro"
import { useParams } from 'react-router-dom'

const Detail = (props) => {
    const { id } = useParams();
    return (
        <DetalleLibro id={id}/>
    )
}

export default Detail