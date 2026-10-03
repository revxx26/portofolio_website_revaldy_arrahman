import {ImageResponse} from 'next/og.js';
import React from 'react';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const h=React.createElement;
const photo='data:image/png;base64,'+readFileSync('public/images/profile/revaldy-arrahman-transparent.png').toString('base64');
const brand='data:image/png;base64,'+readFileSync('public/images/brand/revaldy-character-head.png').toString('base64');
const image=new ImageResponse(h('div',{style:{display:'flex',width:'100%',height:'100%',background:'#fafaf8',color:'#202724',padding:'60px',position:'relative'}},
  h('div',{style:{display:'flex',flexDirection:'column',width:700}},
    h('div',{style:{display:'flex',alignItems:'center',gap:16,fontSize:22,color:'#254b3f'}},h('img',{src:brand,width:54,height:54}),h('span',null,'REVALDY ARRAHMAN')),
    h('div',{style:{display:'flex',flexDirection:'column',marginTop:52,fontSize:76,lineHeight:1.03,fontWeight:700,letterSpacing:-3}},h('span',null,'Making sense'),h('span',{style:{color:'#254b3f'}},'of data.')),
    h('div',{style:{display:'flex',marginTop:28,fontSize:26,color:'#5e6660'}},'Data Analytics & Engineering'),
    h('div',{style:{display:'flex',gap:12,marginTop:44}},...['SQL','Python','Tableau'].map(tool=>h('span',{key:tool,style:{display:'flex',padding:'10px 20px',border:'1px solid #bdc8b6',borderRadius:8,fontSize:20}},tool)))),
  h('div',{style:{position:'absolute',right:0,bottom:0,width:400,height:570,display:'flex',background:'#edf0e9',borderTopLeftRadius:160}},h('img',{src:photo,width:400,height:570,style:{objectFit:'cover',objectPosition:'top'}}))
),{width:1200,height:630});
mkdirSync('public/images/social',{recursive:true});
writeFileSync('public/images/social/portfolio-preview.png',Buffer.from(await image.arrayBuffer()));
console.log('Generated 1200 × 630 social preview.');
