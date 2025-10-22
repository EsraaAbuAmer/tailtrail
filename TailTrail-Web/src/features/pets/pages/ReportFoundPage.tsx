import { PetReportForm } from '../components/PetReportForm/PetReportForm';

export default function ReportFoundPage() {
  return <PetReportForm mode="found" onSubmitForm={(d) => console.log('Found submit', d)} />;
}