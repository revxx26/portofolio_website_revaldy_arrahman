import assert from 'node:assert/strict';
import {normalizeDocuments, queryUrl, safeLink, safeAsset} from '../lib/sanity-content.mjs';
const config={projectId:'nbm85yy3',dataset:'production',apiVersion:'2025-02-19'};
const fallback={profile:{name:'Revaldy',email:'a@example.com'}};
const settings={_id:'portfolio-settings',_type:'portfolioSettings',initialized:true,name:'Revaldy',email:'a@example.com'};
const project={_id:'new-project',_type:'project',title:{en:'New project',id:'Proyek baru'},image:{asset:{url:'https://cdn.sanity.io/images/nbm85yy3/production/abc-1200x800.png',metadata:{dimensions:{width:1200,height:800}}}},order:2};
assert.equal(normalizeDocuments([],fallback,config),null,'Unseeded CMS keeps existing portfolio');
const empty=normalizeDocuments([settings],fallback,config);
assert.deepEqual(empty.data.projects,[],'Deleting all CMS projects must not resurrect fallback projects');
const result=normalizeDocuments([settings,project,{...project,_id:'archived',archived:true},{...project,_id:'drafts.draft'}],fallback,config);
assert.equal(result.data.projects.length,1,'Archived and draft content must not appear');
assert.deepEqual(result.translations[result.data.projects[0].title],{en:'New project',id:'Proyek baru'});
assert.equal(result.data.projects[0].width,1200);
const order=normalizeDocuments([settings,project,{...project,_id:'first',order:1}],fallback,config);
assert.equal(order.data.projects[0].id,'cms-first');
assert.equal(safeLink('javascript:alert(1)'), '');
assert.equal(safeLink('https://example.com'), 'https://example.com/');
assert.equal(safeAsset('https://cdn.sanity.io/images/other/production/img.png',config),'');
assert.equal(safeAsset('/images/../documents/file',config),'');
assert.equal(new URL(queryUrl(config)).searchParams.get('perspective'),'published');
assert.throws(()=>normalizeDocuments([settings,{...project,image:{}}],fallback,config));
const removed=normalizeDocuments([settings],{profile:{...fallback.profile,cv:'/documents/old.pdf',photo:'/images/old.png'}},config);
assert.equal(removed.data.profile.cv,''); assert.equal(removed.data.profile.photo,'');
const cv=normalizeDocuments([{...settings,cv:{asset:{url:'https://cdn.sanity.io/files/nbm85yy3/production/example.pdf'}}}],fallback,config);
assert.equal(new URL(cv.data.profile.cv).searchParams.get('dl'),'CV_Revaldy.pdf','Cross-origin CV must download');
console.log('CMS checks passed: initialization, empty/deleted lists, drafts, archive, ordering, bilingual copy, image sizes and safe links.');

const demo=normalizeDocuments([settings,{...project,demo:'https://public.tableau.com/views/Workbook/Dashboard'}],fallback,config);
assert.equal(demo.data.projects[0].demo,'https://public.tableau.com/views/Workbook/Dashboard');
assert.equal(normalizeDocuments([settings,{...project,demo:'javascript:alert(1)'}],fallback,config).data.projects[0].demo,'');
assert.equal(normalizeDocuments([settings,project],fallback,config).data.projects[0].demo,'');
assert.equal(normalizeDocuments([{...settings,analyticsId:'G-TEST123456'}],fallback,config).data.profile.analyticsId,'G-TEST123456');
assert.equal(normalizeDocuments([{...settings,analyticsId:'<script>'}],fallback,config).data.profile.analyticsId,'');
const volunteer={_id:'teaching',_type:'volunteer',title:{en:'Teaching'},date:'2025-05',image:project.image,gallery:[{image:project.image,caption:{en:'Practice',id:'Praktik'},alt:{en:'Students'}},{image:{localUrl:'https://evil.example/photo.png'}}]};
const galleries=normalizeDocuments([settings,volunteer],fallback,config);
assert.equal(galleries.data.volunteering[0].gallery.length,1);
assert.equal(galleries.translations[galleries.data.volunteering[0].gallery[0].caption].id,'Praktik');
console.log('Demo, optional analytics and bilingual gallery validation passed.');
