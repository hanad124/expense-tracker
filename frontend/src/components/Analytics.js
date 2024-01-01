import { Progress } from 'antd';
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Analytics({transactions}) {
   const totalTransactions = transactions.length;
   const totalIncomeTransactions = transactions.filter(transaction=>transaction.type==="income");
   const totalExpenseTransactions = transactions.filter(transaction=>transaction.type==="expense");  
   const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length/totalTransactions)*100;
   const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length/totalTransactions)*100;
   const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
   const totalIncomeTurnover = transactions.filter(transaction=>transaction.type==="income").reduce((acc, transaction) => acc + transaction.amount, 0);
   const totalExpenseTurnover = transactions.filter(transaction=>transaction.type==="expense").reduce((acc, transaction) => acc + transaction.amount, 0);
   const totalIncomeTurnoverPercentage = (totalIncomeTurnover/totalTurnover)*100;
   const totalExpenseTurnoverPercentage = (totalExpenseTurnover/totalTurnover)*100;
   const categories = [
       'salary',
       'freelance',
       'food',
       'entertainment',
       'medical',
       'education',
       'investment',
       'travel',
       'tax',
   ]
   return (
    <Container className='mt-4' fluid={true}>
        <h1>Analytics</h1>
        <Row className='gx-5'>
           <Col md={6}>
             <div className='mb-5 border border-dark-subtle rounded p-4'>
             <div>
                <h4>Total Transactions : {totalTransactions}</h4>
                <hr/>
                <div className='d-flex justify-content-around gap-3'>
                <h5>Income : {totalIncomeTransactions.length}</h5>
                <h5>Expense : {totalExpenseTransactions.length}</h5>
                </div>
             </div>
             <div className='d-flex gap-3 justify-content-around'>
                <Progress type="circle" strokeColor={{ '0%': '#108ee9','100%': '#87d068',}} percent={totalIncomeTransactionsPercentage.toFixed(0)} />
                <Progress type="circle" strokeColor={{ '0%': '#ff6600','100%': '#ff0000',}} percent={totalExpenseTransactionsPercentage.toFixed(0)} />
             </div>
             </div>
           </Col>
           <Col md={6}>
             <div className='mb-5 border border-dark-subtle rounded p-4'>
             <div>
                <h4>Total Turnover : {totalTurnover}</h4>
                <hr/>
                <div className='d-flex justify-content-around gap-3'>
                <h5>Income : {totalIncomeTurnover}</h5>
                <h5>Expense : {totalExpenseTurnover}</h5>
                </div>
             </div>
             <div className='d-flex gap-3 justify-content-around'>
                <Progress type="circle" strokeColor={{ '0%': '#108ee9','100%': '#87d068',}} percent={totalIncomeTurnoverPercentage.toFixed(0)} />
                <Progress type="circle" strokeColor={{ '0%': '#ff6600','100%': '#ff0000',}} percent={totalExpenseTurnoverPercentage.toFixed(0)} />
             </div>
             </div>
           </Col>
        </Row>
        <Row className='gx-5'>
            <Col md={6}>
               <div className='mb-5 border border-dark-subtle rounded p-4'>
               <div>
                <h4>Income - Category Wise</h4>
                <hr/>
                {totalIncomeTransactions.length === 0 && <div className='border-dark-subtle border-bottom p-3'>
                    <h5>No Category Transactions To Display</h5>
                </div> }
                {categories.map((category)=>{
                    const amount = transactions.filter((transaction)=>transaction.type==="income"&&transaction.category===category).reduce((acc,transaction)=>acc+transaction.amount,0)
                    if(amount){
                        return <div className='border-dark-subtle border-bottom p-3'>
                    <h5>{category}</h5>
                    <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                </div> 
                    }
                })}
               </div>
               </div>
            </Col>
            <Col md={6}>
               <div className='mb-5 border border-dark-subtle rounded p-4'>
               <div>
                <h4>Expense - Category Wise</h4>
                <hr/>
                {totalExpenseTransactions.length === 0 && <div className='border-dark-subtle border-bottom p-3'>
                    <h5>No Category Transactions To Display</h5>
                </div> }
                {categories.map((category)=>{
                    const amount = transactions.filter((transaction)=>transaction.type==="expense"&&transaction.category===category).reduce((acc,transaction)=>acc+transaction.amount,0)
                    if(amount){
                        return <div className='border-dark-subtle border-bottom p-3'>
                    <h5>{category}</h5>
                    <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)} status="exception"/>
                </div> 
                    }
                })}
               </div>
               </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Analytics