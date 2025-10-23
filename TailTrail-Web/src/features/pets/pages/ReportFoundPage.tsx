import { PetReportForm } from '../components/PetReportForm/PetReportForm';
import { Box } from '@mui/material';

const ReportFoundPage = () => {
  const handleSubmit = (data: any) => {
    console.log('Submitting found pet:', data);
  };

  return (
    <Box sx={{ mt: 6 }}>
      <PetReportForm mode="found" onSubmitForm={handleSubmit} />
    </Box>
  );
};

export default ReportFoundPage;
