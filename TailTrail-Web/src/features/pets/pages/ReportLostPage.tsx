import { PetReportForm } from '../components/PetReportForm/PetReportForm';

export default function ReportLostPage() {
  return <PetReportForm mode="lost" onSubmitForm={(d) => console.log('Lost submit', d)} />;
}