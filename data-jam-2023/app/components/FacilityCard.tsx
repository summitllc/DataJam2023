import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent/CardContent';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import CardActions from '@mui/material/CardActions'

interface FacilityCardProps {
    facilityName: string;
    address: string;
    contactInformation: string;
    onNext: () => void;
    onPrevious: () => void;
    currentIndex: number;
    totalFacilities: number;
  }

  const FacilityCard = (props: FacilityCardProps) => {
    const { facilityName, address, contactInformation, onNext, onPrevious, currentIndex, totalFacilities } = props;

    return (
        <Card sx={{ minWidth: 750, minHeight: 400 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2">
              {facilityName}
            </Typography>
            <Typography variant="body2" component="p">
              {address}
            </Typography>
            <Typography variant="body2" component="p">
              {contactInformation}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', paddingTop: '16px' }}>
            <Button onClick={onPrevious} disabled={currentIndex === 0}>
              Previous
            </Button>
            <Button onClick={onNext} disabled={currentIndex === totalFacilities - 1}>
              Next
            </Button>
          </CardActions>
        </Card>
      );
      
  };

export default FacilityCard;