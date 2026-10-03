import {getCliClient} from 'sanity/cli';
const client=getCliClient({apiVersion:'2025-02-19'}).withConfig({useCdn:false});
const doc=await client.getDocument('project-customer-churn');
if(!doc) throw new Error('Customer churn document not found; no content modified.');
const demo='https://public.tableau.com/views/CustomerChurnRiskTelcoDashboard/CustomerChurnRiskDashboard';
if(doc.demo && doc.demo!==demo) throw new Error('A demo URL already exists; preserving owner edits.');
if(doc.demo!==demo) await client.patch(doc._id).ifRevisionId(doc._rev).set({demo}).commit();
console.log('Customer Churn live demo configured; existing content preserved.');
