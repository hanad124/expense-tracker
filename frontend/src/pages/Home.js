import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Table, message, Select, DatePicker } from 'antd'
import AddEditTransactionModal from '../components/AddEditTransactionModal'
import { deleteTransaction, getAllTransactionsOfUser } from '../apicalls/transactions'
import moment from 'moment';
import { Container,Row, Col } from 'react-bootstrap'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Analytics from '../components/Analytics'

const { RangePicker } = DatePicker;

function Home() {
  const [showAddTransactionModal, setShowAddTransactionModel] = useState(false)
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange,setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [showEditTransactionObject, setShowEditTransactionObject] = useState(null);
  const getTransactionsData = async() => {
    message.loading("Fetching all your transactions...",0.5)
    try{ 
         const response = await getAllTransactionsOfUser({
          frequency: frequency,
          ...(frequency==="custom" && {selectedRange}),
          type,
         });
         if(response.success){
          setTimeout(()=>{
             setTransactionsData(response.data);
             message.success(response.message);
          },500)
         }
         else{
          setTimeout(()=>{
            message.info(response.message);
          },500)
         }
    }
    catch(error){
      setTimeout(()=>{
        message.error(error.message);
      },500)
    }
  }
  const deleteSelectedTransaction = async(payload) => {
    message.loading("Deleting the selected transaction...",0.5)
    try{ 
         const response = await deleteTransaction(payload)
         if(response.success){
          setTimeout(()=>{
             message.success(response.message);
             getTransactionsData();
          },500)
         }
         else{
          setTimeout(()=>{
            message.info(response.message);
          },500)
         }
    }
    catch(error){
      setTimeout(()=>{
        message.error(error.message);
      },500)
    }
  }
  useEffect(()=>{
      getTransactionsData()
  },[frequency,selectedRange,type])
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text,record) => {
        return moment(record.date).format("DD/MM/YYYY")
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text,record) => {
        return record.type
      }
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text,record) => {
        return record.category
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text,record) => {
          if(record.type==="expense"){
            return (
              <div style={{color: "red"}}>
                - &#8377; {record.amount}
              </div>
            )
          }
          else{
            return (
              <div style={{color: "green"}}>
                + &#8377; {record.amount}
              </div>
            )
          }
       }
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text,record) => {
        return record.reference
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text,record) => {
        return record.description
      }
    },
    {
      title: "Actions",
      render: (text,record) => {
       return  <div className='d-flex gap-2'>
       <EditOutlined onClick={()=>{
        setShowEditTransactionObject(record);
        setShowAddTransactionModel(true);
       }}/>
       <DeleteOutlined onClick={()=>{
        deleteSelectedTransaction(record)
       }} />
     </div>
      }
    }
  ]
  return (
    <DefaultLayout>
        <Row className='filter d-flex align-items-center px-2 py-3 gap-3'>
            <Col className='d-flex gap-3'>
               <Col className='d-flex flex-column'>
                 <h5>Select Frequency</h5>
                 <Select onChange={(value)=>setFrequency(value)} value={frequency}>
                  <Select.Option value="7">Last 1 Week</Select.Option>
                  <Select.Option value="30">Last 1 Month</Select.Option>
                  <Select.Option value="365">Last 1 Year</Select.Option>
                  <Select.Option value="custom">Custom Range</Select.Option>
                 </Select>
                 {frequency==="custom"&&(
                  <div className='mt-2'>
                    <RangePicker
                      value={selectedRange}
                      onChange={(values)=>setSelectedRange(values)}
                    />
                  </div>
                 )}
               </Col>
               <Col className='d-flex flex-column'>
                 <h5>Select Type</h5>
                 <Select onChange={(value)=>setType(value)} value={type}>
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                 </Select>
               </Col>
            </Col>
            <Col className='d-flex justify-content-end gap-2'>
              <div className='d-flex gap-3 border border-dark-subtle rounded mx-2 p-2'>
                <UnorderedListOutlined className={`pointer ${viewType==="table"? 'active-table-icon' : 'table-icon'}`} onClick={()=>setViewType("table")}/>
                <AreaChartOutlined className={`pointer ${viewType==="analytics"? 'active-analytics-icon' : 'analytics-icon'}`} onClick={()=>setViewType("analytics")}/>
              </div>
              <button className='btn btn-success' onClick={()=>setShowAddTransactionModel(true)}>Add New</button>
            </Col>
        </Row>
        <div className='table-analytics mb-2'>

        </div>
        {viewType==="table"?<Table dataSource={transactionsData} columns={columns} scroll={{ x: 992 }}/>:<Analytics transactions={transactionsData}/>}
        {showAddTransactionModal && <AddEditTransactionModal showAddTransactionModal={showAddTransactionModal} setShowAddTransactionModel={setShowAddTransactionModel} getTransactionsData={getTransactionsData} showEditTransactionObject={showEditTransactionObject} setShowEditTransactionObject={setShowEditTransactionObject}/>}
    </DefaultLayout>
  )
}

export default Home