import { Image } from "react-bootstrap";
import User from '@mui/icons-material/AccountCircle';

interface AvatarProps {
    src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return (
            <Image src={src} alt="loading" style={{ borderRadius: "50%", width: '35px', height: '35px' }} />
        );
    }
    return (
        <div>
            <User className="fs-3" fontSize="large" />
        </div>
    );
}

export default Avatar;
