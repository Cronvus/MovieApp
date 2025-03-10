import React from 'react'
import { Alert } from 'antd'



const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.')
}

export const ErrorAlert: React.FC = () => (
  <Alert 
    message='Error'
    description='Error Description'
    type='error'
    closable
    onClose={onClose}/>
)



