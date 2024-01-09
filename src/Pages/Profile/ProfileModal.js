import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import { Avatar, Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    borderRadius: 3,
    overFlow: "scroll-y",
    p: 2,
};

export default function ProfileModal({ open, handleClose }) {
    const dispatch = useDispatch();
    // const handleSubmit=(values)=>{
    //     console.log("values",values)
    // }
    const formik = useFormik({
        initialValues: {
            fname: " ",
            lname: " "
        },
        onSubmit: (values) => {
            console.log("values ", values)
            dispatch(updateProfileAction(values))
        }
    })

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                                <p>Edit Profile</p>
                            </div>
                            <Button type="submit">Save</Button>
                        </div>
                        <div>
                            <div className="h-[15rem]">
                                <img
                                    className="w-full h-full rounded-t-md"
                                    src="https://cdn.pixabay.com/photo/2024/01/02/15/54/ai-generated-8483498_1280.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="pl-5">
                                <Avatar
                                    className="transform -translate-y-24 "
                                    sx={{ width: "10rem", height: "10rem" }}
                                    src="https://cdn.pixabay.com/photo/2024/01/02/15/57/ai-generated-8483509_1280.jpg"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <TextField fullWidth
                                id="fname"
                                name="fname"
                                label="First Name"
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                fullWidth
                                id="lname"
                                name="lname"
                                label="Last Name"
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}