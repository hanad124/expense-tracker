import React, {useEffect} from 'react'
import { Form, Input, Modal, Select, message } from 'antd'
import { addTransaction, editTransaction } from '../apicalls/transactions';

function AddEditTransactionModal(props) {
  const { showAddTransactionModal, setShowAddTransactionModel,  getTransactionsData, showEditTransactionObject, setShowEditTransactionObject } = props;
  const onFinish = async(values) => {
    if(showEditTransactionObject){
      const transUpdateObj = {
        _id: showEditTransactionObject._id,
        user: showEditTransactionObject.user,
        amount: Number(values.amount),
        type: values.type,
        category: values.category,
        date: values.date,
        reference: values.reference,
        description: values.description
      }
      message.loading("Editing the Selected Transaction...",0.5);
      try{
        const response = await editTransaction(transUpdateObj);
        if(response.success){
           setTimeout(()=>{
            message.success(response.message);
            getTransactionsData();
           },500)
        }
      }
      catch(error){
        setTimeout(()=>{
           message.error(error.message);
        },500)
      }
    }
    else{
      message.loading("Adding New Transaction...",0.5);
      try{
        const response = await addTransaction(values);
        if(response.success){
           setTimeout(()=>{
            message.success(response.message);
            getTransactionsData();
           },500)
        }
      }
      catch(error){
        setTimeout(()=>{
           message.error(error.message);
        },500)
      }
    }
    setShowEditTransactionObject(null);
    setShowAddTransactionModel(false);
  }
  return (
    <Modal title={showEditTransactionObject ? "Edit Transaction" : "Add Transaction"} open={showAddTransactionModal} onCancel={()=>{
      setShowAddTransactionModel(false)
      if(showEditTransactionObject){
        setShowEditTransactionObject(null);
      }
    }}
         footer={false}
        >
          <Form layout="vertical" onFinish={onFinish} initialValues={showEditTransactionObject}>
            <Form.Item label="Amount (in ₹)" name="amount" rules={[{
                  required: true,
                 },
            ]}>
            <Input type="number" min={0} />
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{
                  required: true,
                 },
            ]}>
                 <Select
                  initialvalues="income"
                  options={[
                   {
                    value: 'income',
                    label: 'Income',
                   },
                   {
                    value: 'expense',
                    label: 'Expense',
                   },
                  ]}
                 />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{
                  required: true,
                 },
            ]}>
                 <Select
                  initialvalues="salary"
                  options={[
                   {
                    value: 'salary',
                    label: 'Salary',
                   },
                   {
                    value: 'freelance',
                    label: 'Freelance',
                   },
                   {
                    value: 'food',
                    label: 'Food',
                   },
                   {
                    value: 'entertainment',
                    label: 'Entertainment',
                   },
                   {
                    value: 'medical',
                    label: 'Medical',
                   },
                   {
                    value: 'education',
                    label: 'Education',
                   },
                   {
                    value: 'investment',
                    label: 'Investment',
                   },
                   {
                    value: 'travel',
                    label: 'Travel',
                   },
                   {
                    value: 'tax',
                    label: 'Tax',
                   },
                  ]}
                 />
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{
                  required: true,
                 },
            ]}>
              <Input type="date"/>
            </Form.Item>
            <Form.Item label="Reference" name="reference" rules={[{
                  required: true,
                 },
            ]}>
              <Input/>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{
                  required: true,
                 },
            ]}>
              <Input/>
            </Form.Item>
            <div className='d-flex justify-content-end gap-2 mt-3'>
            <button className='btn btn-success' type="submit">Save</button>
            <button className='btn btn-danger' onClick={()=>{
              setShowAddTransactionModel(false)
              if(showEditTransactionObject){
                setShowEditTransactionObject(null)
              }
              }}>Cancel</button>
            </div>
          </Form>
        </Modal>
  )
}

export default AddEditTransactionModal