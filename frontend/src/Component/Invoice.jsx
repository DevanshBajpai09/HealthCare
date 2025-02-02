import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
;
// import DashboredActions from "./DashboredActions";
// import prisma from "../utils/db";
// import { requireUser } from "../utils/hooks";
// import { formateCurrency } from "../utils/formateCurrency";
// import { Badge } from "@/components/ui/badge";
// import EmptyState from "./EmptyState";



const Invoice = () => {
  
  return (
    <>
   
    
    <Table>
    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Invoice ID</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    {/* <TableBody>
      {data.map((invoice)=>(
        <TableRow key={invoice.id}>
        <TableCell className="font-medium">#{invoice.invoiceNumber}</TableCell>
        <TableCell>{invoice.clientName}</TableCell>
        <TableCell>{formateCurrency({amount:invoice.total,currency:invoice.currency as any})}</TableCell>
        <TableCell><Badge>{invoice.status}</Badge></TableCell>
        <TableCell>{
          new Intl.DateTimeFormat("en-US",{
            dateStyle:"medium"
          }).format(invoice.createdAt)
          }</TableCell>
        <TableCell className="text-right"><DashboredActions status={invoice.status} id={invoice.id}/></TableCell>
      </TableRow>
      ))}
    </TableBody> */}
  </Table>
    </>
  );
};

export default Invoice;
