import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Users = React.lazy(() => import('./views/main_records/users/Users'));
const UserRoles = React.lazy(() => import('./views/main_records/user_roles/UserRoles'));
const Branches = React.lazy(() => import('./views/main_records/branches/Branches'));
const Corporates = React.lazy(() => import('./views/main_records/corporates/Corporates'));
const Doctors = React.lazy(() => import('./views/main_records/doctors/Doctors'));
const Patients = React.lazy(() => import('./views/main_records/patients/Patients'));
const Items = React.lazy(() => import('./views/main_records/items/Items'));
const Packages = React.lazy(() => import('./views/main_records/packages/Packages'));
const Referrals = React.lazy(() => import('./views/main_records/referrals/Referrals'));
const ReferenceLaboratory = React.lazy(() => import('./views/main_records/reference_laboratory/ReferenceLaboratory'));

const Logout = React.lazy(() => import('./views/authentication/Logout'));
const Page404 = React.lazy(() => import('./views/pages/Page404'));
const Page500 = React.lazy(() => import('./views/pages/Page500'));

const NewSale = React.lazy(() => import('./views/sales/pos/NewTransaction'));
const UpdateSale = React.lazy(() => import('./views/sales/pos/ModifyTransaction'));
const TransactionList = React.lazy(() => import('./views/sales/transactions/TransactionList'));
const Refund = React.lazy(() => import('./views/sales/refund/Refund'));
const EndOfDay = React.lazy(() => import('./views/sales/eod/EndOfDay'));

const SOA = React.lazy(() => import('./views/sales/soa/SOA'));
const SOP = React.lazy(() => import('./views/finance/sop/SOP'));
const Report = React.lazy(() => import('./views/finance/moireport/moiReport'));

const TransactionServices = React.lazy(() => import('./views/transactions/TransactionServices'));

const Nurse = React.lazy(() => import('./views/nurse/Nurse'));

const PhysicalExam = React.lazy(() => import('./views/physicalexam/PhysicalExam'));
const MedicalCertificate = React.lazy(() => import('./views/physicalexam/medical_certificate/MedicalCertificate'));

const XRay = React.lazy(() => import('./views/imaging/xray/XRay'));
const ECG = React.lazy(() => import('./views/imaging/ecg/ECG'));
const Echo2D = React.lazy(() => import('./views/imaging/echo2d/Echo2D'));
const Ultrasound = React.lazy(() => import('./views/imaging/ultrasound/Ultrasound'));

const ClinicalMicroscopy = React.lazy(() => import('./views/laboratory/clinical_microscopy/ClinicalMicroscopy'));
const Hematology = React.lazy(() => import('./views/laboratory/hematology/Hematology'));
const Chemistry = React.lazy(() => import('./views/laboratory/chemistry/Chemistry'));
const Serology = React.lazy(() => import('./views/laboratory/serology/Serology'));
const Toxicology = React.lazy(() => import('./views/laboratory/toxicology/Toxicology'));
const Bacteriology = React.lazy(() => import('./views/laboratory/bacteriology/Bacteriology'));
const Microbiology = React.lazy(() => import('./views/laboratory/microbiology/microbiology'));

const Industrial = React.lazy(() => import('./views/laboratory/industrial/Industrial'));

const DoctorConsultation = React.lazy(() => import('./views/consultation/DrConsultation'));
const DoctorModule = React.lazy(() => import('./views/consultation/modules/DrModules'));
const DoctorSecretary = React.lazy(() => import('./views/consultation/DrConsultation'));
const PatientsRegistration = React.lazy(() => import('./views/patient/patientRegistration'));
const PatientTxnRecords = React.lazy(() => import('./views/patient/patientRecordsTransaction'));
const Queuing = React.lazy(() => import('./views/Queing/queing'));
const Pending = React.lazy(() => import('./views/pending/Pending'));



const routes = [
  { path: '/dashboard', group: 'DFT', name: 'Dashboard', component: Dashboard, exact: true },

  { path: '/records/users', group: 'MSTR', name: 'Users', component: Users, exact: true },
  { path: '/records/userroles', group: 'MSTR', name: 'UserRoles', component: UserRoles, exact: true },
  { path: '/records/branches', group: 'MSTR', name: 'Branches', component: Branches, exact: true },
  { path: '/records/charge', group: 'MSTR', name: 'Charge', component: Corporates, exact: true },
  { path: '/records/doctors', group: 'MSTR', name: 'Doctors', component: Doctors, exact: true },
  { path: '/records/patients', group: 'MSTR', name: 'Patients', component: Patients, exact: true },
  { path: '/records/items', group: 'MSTR', name: 'Items', component: Items, exact: true },
  { path: '/records/packages', group: 'MSTR', name: 'Packages', component: Packages, exact: true },
  { path: '/records/referrals', group: 'MSTR', name: 'Referrals', component: Referrals, exact: true },
  { path: '/records/referenceLaboratory', group: 'MSTR', name: 'ReferenceLaboratory', component: ReferenceLaboratory, exact: true },

  { path: '/finance/soa', exact: true, group: 'FINANCE', name: 'Statement of Account', component: SOA },
  { path: '/finance/sop', exact: true, group: 'FINANCE', name: 'Statement of Payable', component: SOP },
  { path: '/finance/report', exact: true, group: 'FINANCE', name: 'Moi\'s Reports', component: Report },

  { path: '/sales/eod', exact: true, group: 'SALE', name: 'End Of Day', component: EndOfDay },
  { path: '/sales/refund', exact: true, group: 'SALE', name: 'Refund', component: Refund },
  { path: '/sales/list', exact: true, group: 'SALE', name: 'Transaction List', component: TransactionList },
  { path: '/sales/new', exact: true, group: 'SALE', name: 'New Sale', component: NewSale },
  { path: '/sales/:id', exact: true, group: 'SALE', name: 'Update Sale', component: UpdateSale },

  { path: '/transactions', exact: true, group: 'LABELS', name: 'Laboratory Services', component: TransactionServices },

  { path: '/nurse', exact: true, group: 'NRS', name: 'Nurse', component: Nurse },
  { path: '/pending', exact: true, group: 'NRS', name: 'Pending', component: Pending },

  { path: '/medicalServices/physicalexam', exact: true, group: 'PE', name: 'Physical Exam', component: PhysicalExam },
  { path: '/medicalServices/medical_certificate', exact: true, group: 'PE', name: 'Medical Certificate', component: MedicalCertificate},

  { path: '/imaging/xray', exact: true, group: 'IMG', name: 'X-Ray', component: XRay },
  { path: '/imaging/ecg', exact: true, group: 'IMG', name: 'ECG', component: ECG },
  { path: '/imaging/echo2d', exact: true, group: 'IMG', name: '2D Echo', component: Echo2D },
  { path: '/imaging/ultrasound', exact: true, group: 'IMG', name: 'Ultrasound', component: Ultrasound },

  { path: '/laboratory/clinical_microscopy', group: 'LAB', name: 'Clinical Microscopy', component: ClinicalMicroscopy, exact: true },
  { path: '/laboratory/hematology', group: 'LAB', name: 'Hematology', component: Hematology, exact: true },
  { path: '/laboratory/chemistry', group: 'LAB', name: 'Chemistry', component: Chemistry, exact: true },
  { path: '/laboratory/serology', group: 'LAB', name: 'Serology', component: Serology, exact: true },
  { path: '/laboratory/toxicology', group: 'LAB', name: 'Toxicology', component: Toxicology, exact: true },
  { path: '/laboratory/bacteriology', group: 'LAB', name: 'Bacteriology', component: Bacteriology, exact: true },
  { path: '/laboratory/microbiology', group: 'LAB', name: 'Microbiology', component: Microbiology, exact: true },
  { path: '/laboratory/industrial', group: 'LAB', name: 'Industrial', component: Industrial, exact: true },

  { path: '/doctorConsultation', exact: true, group: 'DRC', name: 'Consultation', component: DoctorConsultation, exact: true },
  { path: '/consultation/modules', exact: true, group: 'DRC', name: 'Doctor Modules', component: DoctorModule, exact: true },
  { path: '/consultation', exact: true, group: 'DRC', name: 'Secretary', component: DoctorSecretary, exact: true },

  { path: '/patient', exact: true, group: 'USERS', name: 'Patient Registration', component: PatientsRegistration },
  { path: '/patientTxnRecords', exact: true, group: 'USERS', name: 'Patient Transaction Records', component: PatientTxnRecords  },
  { path: '/queuing', exact: true, group: 'Queuing', name: 'Queuing', component: Queuing, exact: true  },


  { path: '/logout', group: 'DFT', name: 'Logout', component: Logout, exact: true },
  { path: '/page404', group: 'DFT', name: 'Page404', component: Page404, exact: true },
  { path: '/page500', group: 'DFT', name: 'Page500', component: Page500, exact: true },
];

export default routes;
