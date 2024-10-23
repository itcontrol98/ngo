
interface HeadingProps{
    title:string,
    center?:boolean
}

const Heading:React.FC<HeadingProps> = ({title,center}) => {
    return ( 
        <div className={center?'text-center':'text-start'}>
            <h1 className="fw-bold text-black fs-4 my-4">{title}</h1>
        </div>
     );
}
 
export default Heading;