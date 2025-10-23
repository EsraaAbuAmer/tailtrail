import { PetReportForm } from '../components/PetReportForm/PetReportForm';
import { Box } from '@mui/material';

const ReportLostPage = () => {
  const handleSubmit = (data: any) => {
    console.log('Submitting lost pet:', data);
  };

  return (
    <Box sx={{ mt: 6 }}>
      <PetReportForm mode="lost" onSubmitForm={handleSubmit} />
    </Box>
  );
};

export default ReportLostPage;
