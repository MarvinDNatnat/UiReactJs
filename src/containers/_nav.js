import React from 'react';

export const navigation = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <i className="mfe-4 fas fa-lg fa-tachometer-alt" />,
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Sales',
        route: '/sales',
        icon: <i className="mfe-4 fas fa-lg fa-coins" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Point-of-Sale',
                icon: <i className="mfe-2 fas fa-lg fa-cash-register" />,
                to: '/sales/new',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Transaction List',
                icon: <i className="mfe-2 fas fa-lg fas fa-file-invoice" />,
                to: '/sales/list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'End Of Day',
                icon: <i className="mfe-2 fas fa-lg fas fa-calculator" />,
                to: '/sales/eod',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Refund',
                icon: <i className="mfe-2 fas fa-lg fas fa-hand-holding-usd" />,
                to: '/sales/refund',
            },
            // {
            //     _tag: 'CSidebarNavItem',
            //     name: 'SOA',
            //     icon: <i className="mfe-2 fas fa-lg fas fa-file-invoice" />,
            //     to: '/sales/soa',
            // }
        ]
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Finance',
        route: '/finance',
        icon: <i className="mfe-4 fas fa-balance-scale" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Statement of Account',
                icon: <i className="mfe-2 fas fa-balance-scale-left"></i>,
                to: '/finance/soa',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Statement of Payable',
                icon: <i className="mfe-2 fas fa-balance-scale-right"></i>,
                to: '/finance/sop',
            },
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Moi\'s Reports',
                icon: <i className="mfe-2 fas fa-lg fas fa-file-invoice" />,
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Summarry Report',
                        icon: <i className="mfe-4 fas fa-lg fas fa-file-invoice" />,
                        to: '/finance/report',
                    }
                ]
               
            },
        ]
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Medical Records',
        route: '/records',
        icon: <i className="mfe-4 fas fa-lg fa-notes-medical" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Users',
                icon: <i className="mfe-2 fas fa-lg fa-users" />,
                to: '/records/users',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'User Roles',
                icon: <i className="mfe-2 fas fa-lg fa-users-cog" />,
                to: '/records/userroles',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Branches',
                icon: <i className="mfe-2 fas fa-lg fa-map-marked-alt" />,
                to: '/records/branches',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Patients',
                icon: <i className="mfe-2 fas fa-lg fa-hospital-user" />,
                to: '/records/patients',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Doctors',
                icon: <i className="mfe-2 fas fa-lg fa-user-md" />,
                to: '/records/doctors',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Charge',
                icon: <i className="mfe-2 fas fa-lg fa-city" />,
                to: '/records/charge',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Items/Services',
                icon: <i className="mfe-2 fas fa-lg fa-first-aid" />,
                to: '/records/items',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Packages',
                icon: <i className="mfe-2 fas fa-lg fa-hand-holding-medical" />,
                to: '/records/packages',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Referrals',
                icon: <i className="mfe-2 fas fa-lg fa-people-arrows" />,
                to: '/records/referrals',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Reference Laboratory',
                icon: <i className="mfe-2 fas fa-clinic-medical" />,
                to: '/records/referenceLaboratory',
            },
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Laboratory Sciences',
        route: '/laboratory',
        icon: <i className="mfe-4 fas fa-lg fa-atom" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Clinical Microscopy',
                icon: <i className="mfe-2 fas fa-lg fa-microscope" />,
                to: '/laboratory/clinical_microscopy',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Hematology',
                icon: <i className="mfe-2 fas fa-lg fa-syringe" />,
                to: '/laboratory/hematology',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Chemistry',
                icon: <i className="mfe-2 fas fa-lg fa-flask" />,
                to: '/laboratory/chemistry',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Serology',
                icon: <i className="mfe-2 fas fa-lg fa-vial" />,
                to: '/laboratory/serology',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Toxicology',
                icon: <i className="mfe-2 fas fa-lg fa-prescription-bottle-alt" />,
                to: '/laboratory/toxicology',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Bacteriology',
                icon: <i className="mfe-2 fas fa-lg fa-bacteria" />,
                to: '/laboratory/bacteriology',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Microbiology',
                icon: <i className="mfe-2 fas fa-lg fa-bong" />,
                to: '/laboratory/microbiology',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Industrial',
                icon: <i className="mfe-2 fas fa-lg fa-chart-line" />,
                to: '/laboratory/industrial',
            },
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Imaging',
        route: '/imaging',
        icon: <i className="mfe-4 fas fa-lg fa-chalkboard" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'X-Ray',
                icon: <i className="mfe-2 fas fa-lg fa-x-ray" />,
                to: '/imaging/xray',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '2D Echo',
                icon: <i className="mfe-2 fas fa-lg fa-file-medical-alt" />,
                to: '/imaging/echo2d',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'ECG',
                icon: <i className="mfe-2 fas fa-lg fa-heartbeat" />,
                to: '/imaging/ecg',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Ultrasound',
                icon: <i className="mfe-2 fas fa-lg fa-procedures" />,
                to: '/imaging/ultrasound',
            },
        ]
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Labels',
        to: '/transactions',
        icon: <i className="mfe-4 fas fa-lg fa-hand-holding-medical" />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Quest Quality',
        to: '/nurse',
        icon: <i className="mfe-4 fas fa-lg fa-user-nurse" />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Pending',
        to: '/pending',
        icon: <i className="mfe-4 fas fa-lg fa-clock" />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Patient Registration',
        to: '/patient',
        icon: <i className="mfe-4 fas fa-lg fa-hospital-user" />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Patient Transaction Records',
        to: '/patientTxnRecords',
        icon: <i className="mfe-4 fas fa-lg fa-hospital-user" />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Queuing',
        to: '/queuing',
        icon: <i className="mfe-4 fas fa-lg fa-users" />,
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Medical Services',
        to: '/medicalServices',
        icon: <i className="mfe-4 fas fa-lg fa-stethoscope" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Physical Examination',
                icon: <i className="mfe-2 fas fa-lg fa-microscope" />,
                to: '/medicalServices/physicalexam',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Medical Certificate',
                icon: <i className="mfe-2 fas fa-lg fa-certificate" />,
                to: '/medicalServices/medical_certificate',
            },

        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Consultation',
        to: '/doctorConsultation',
        icon: <i className="mfe-4 fas fa-lg fa-user-md" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Doctors Module',
                to: '/consultation/modules',
                icon: <i className="mfe-2 fas fa-lg fa-address-card" />
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Secretary',
                to: '/consultation',
                icon: <i className="mfe-2 fas fa-lg fa-address-card" />
            },
        ]
    },
    {
        _tag: 'CSidebarNavDivider',
        name: 'NavDivider',
        className: 'm-2'
    }
]
