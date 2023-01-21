import { Box } from "@mui/material";
import { HOST_ADDRESS } from "../consts/apiRoute";

function UserImage({ image, size = "60px" }) {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`${HOST_ADDRESS}/${image}`}
            />
        </Box>
    )
}

export default UserImage