import Typography from "@mui/material/Typography/Typography";
import {Box, Slider} from "@mui/material";

const PreferenceCard = (props) => {
    const {setSlider, name, slider} = props
    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 6,
            label: '6',
        },
        {
            value: 7,
            label: '7',
        },
        {
            value: 8,
            label: '8',
        },
        {
            value: 9,
            label: '9',
        },
        {
            value: 10,
            label: '10',
        },

    ]

    const {title} = props

    const sliderBoxStyle = {
        width: "95%",
        // border: "#dadade 1px solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    }
    return (
        <Box sx={sliderBoxStyle}>
            <Typography>{title}</Typography>
            <Box
                sx={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                <Typography sx={{fontSize: "0.9rem", textAlign: "center"}}>Least
                    Preferable</Typography>
                <Slider
                    sx={{width: "70%", color: "green"}}
                    marks={marks}
                    defaultValue={3}
                    step={0.5}
                    min={1}
                    max={10}
                    value={slider[name]}

                    valueLabelDisplay={"auto"}
                    onChange={(event, value) => {
                        setSlider((prevState) => (
                            {
                                ...prevState,
                                [name]: value
                            }
                        ))
                    }}
                />
                <Typography sx={{fontSize: "0.9rem", textAlign: "center"}}>Most
                    Preferable</Typography>
            </Box>
        </Box>
    )
}
export default PreferenceCard;