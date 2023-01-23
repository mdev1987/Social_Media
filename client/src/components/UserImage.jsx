import { Box } from "@mui/material";
import { HOST_ADDRESS } from "../consts/apiRoute";

function UserImage({ image, size = "60px" }) {
    let usrImg = '/assets/profile.png'
    if (image && image.trim().length > 0) {
        usrImg = `${HOST_ADDRESS}/${image}`
    }
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={usrImg}
            />
        </Box>
    )
}

export default UserImage