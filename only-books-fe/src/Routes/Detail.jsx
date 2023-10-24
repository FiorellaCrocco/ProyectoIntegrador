import DetalleLibro from "../Components/DetalleLibro/DetalleLibro"
import { useParams } from 'react-router-dom'

const Detail = (props) => {
    const {id} = useParams();
    return (
      <div>    
        <DetalleLibro id={id}></DetalleLibro>
      </div>
      
    )
  }
  
  export default Detail