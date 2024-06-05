import React from 'react'
import DynamicTable from '../../../sharedComponents/Table'
import styles from "./styles.module.css"
import { PRODUCERTABLEHEADER } from '../constants';
  
  const data = [
    { id: 1, userName: 'John', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 2, userName: 'Jane', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 3, userName: 'Alex', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 4, userName: 'John', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 5, userName: 'Jane', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 6, userName: 'Alex', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 7, userName: 'John', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 8, userName: 'Jane', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 9, userName: 'Alex', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 10, userName: 'John', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 11, userName: 'Jane', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
    { id: 12, userName: 'Alex', mobileNumber: 9456509722, emailId: 'pushpender.singh@tataaig.com', active: true },
  ];

const ProducerTable = () => {
  return (
    <div className={styles.tableContainer}>
        <DynamicTable columns={PRODUCERTABLEHEADER} data={data} switchType="action"/>
    </div>
  )
}

export default ProducerTable