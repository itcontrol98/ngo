
interface NullDataProps{
    title:string
}

const NullData:React.FC<NullDataProps> = ({title}) => {
    return ( <div className="d-flex justify-content-center align-items-center">
        <p className="my-5 fs-3 fw-semibold" style={{color:"red"}}>{title}</p>
    </div> );
}
 
export default NullData;