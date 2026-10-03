import {createReadStream} from 'node:fs';
import {resolve, extname} from 'node:path';
import {getCliClient} from 'sanity/cli';
import {fallbackContent} from '../../content/fallback';
import {indonesian} from '../../content/translations';

const client = getCliClient({apiVersion: '2025-02-19'}).withConfig({useCdn: false});
const publicRoot = resolve(import.meta.dirname, '../../public');
const translated = (value: string) => ({_type: 'localizedText', en: value, id: indonesian[value.trim()] || value});
const translateFields = (value: Record<string, unknown>, fields: string[]) => Object.fromEntries(fields.filter(field => typeof value[field] === 'string' && (value[field] as string).trim()).map(field => [field, translated(value[field] as string)]));
const uploaded = new Map<string, {_type: string; asset: {_type: string; _ref: string}}>();
async function upload(url: string, kind: 'image' | 'file' = 'image') {
  if (!url) return undefined;
  if (uploaded.has(url)) return uploaded.get(url);
  const file = resolve(publicRoot, '.' + url);
  if (!file.startsWith(publicRoot + '\\') && !file.startsWith(publicRoot + '/')) throw new Error('Asset must be inside public/');
  const asset = await client.assets.upload(kind, createReadStream(file), {filename: url.split('/').at(-1), contentType: extname(file) === '.svg' ? 'image/svg+xml' : undefined});
  const value = {_type: kind === 'image' ? 'portfolioImage' : 'portfolioFile', asset: {_type: 'reference', _ref: asset._id}};
  uploaded.set(url, value); return value;
}
const ids = [
  'portfolio-settings', ...fallbackContent.projects.map(item => `project-${item.id}`),
  ...fallbackContent.experiences.map(item => `experience-${item.id}`), ...fallbackContent.volunteering.map(item => `volunteer-${item.id}`),
  ...fallbackContent.certifications.map(item => `certification-${item.id}`), ...fallbackContent.skills.map((_,index) => `skill-${index+1}`),
];
const existing = new Set((await client.getDocuments(ids)).filter(Boolean).map(doc => doc!._id));
const documents: Record<string, unknown>[] = [];
if (!existing.has('portfolio-settings')) {
  const profile = fallbackContent.profile;
  documents.push({_id:'portfolio-settings',_type:'portfolioSettings',initialized:true,
    ...Object.fromEntries(['name','email','linkedin','linkedinLabel','github','githubLabel','university','gpa'].map(key => [key, profile[key as keyof typeof profile]])),
    ...translateFields(profile,['greeting','headline','intro','opportunity','aboutTitle','aboutIntro','aboutBody','degree','semester','contactIntro']),
    photo: await upload(profile.photo), cv: await upload(profile.cv,'file'), universityLogo: await upload(profile.universityLogo),
  });
}
for (const [index,item] of fallbackContent.projects.entries()) {
  const id=`project-${item.id}`; if (existing.has(id)) continue;
  documents.push({_id:id,_type:'project',order:index+1,archived:false,
    ...translateFields(item,['title','category','description','contribution','imageAlt','objective','source','output','insight','limitation','metricLabel','figureLabel']),
    github:item.github,demo:item.demo,tools:item.tools,metric:item.metric,process:item.process.map((step,index)=>({...translated(step),_key:`step-${index}`})),image:await upload(item.image),
    additionalImages: await Promise.all(item.additionalImages.map(async(figure,index)=>({_type:'projectFigure',_key:`figure-${index}`,image:await upload(figure.src),alt:translated(figure.alt),caption:translated(figure.caption)}))),
  });
}
for (const [index,item] of fallbackContent.experiences.entries()) {
  const id=`experience-${item.id}`; if(existing.has(id)) continue;
  documents.push({_id:id,_type:'experience',order:index+1,archived:false,
    ...translateFields(item,['title','role','typeLabel','logoAlt','startLabel','endLabel','description','note']),start:item.start,end:item.end,logo:await upload(item.logo),
    workflow:item.workflow.map((step,index)=>({...translated(step),_key:`step-${index}`})),
  });
}
for (const [index,item] of fallbackContent.volunteering.entries()) {
  const id=`volunteer-${item.id}`; if(existing.has(id)) continue;
  documents.push({_id:id,_type:'volunteer',order:index+1,archived:false,...translateFields(item,['title','organization','role','context','dateLabel','description','imageAlt']),date:item.date,image:await upload(item.image),original:await upload(item.original)});
}
for (const [index,item] of fallbackContent.certifications.entries()) {
  const id=`certification-${item.id}`; if(existing.has(id)) continue;
  documents.push({_id:id,_type:'certification',order:index+1,archived:false,...translateFields(item,['title','issuer','program','type','dateLabel','dateType','description','imageAlt']),date:item.date,image:await upload(item.image),certificate:await upload(item.certificate)});
}
for (const [index,item] of fallbackContent.skills.entries()) {
  const id=`skill-${index+1}`; if(existing.has(id)) continue;
  documents.push({_id:id,_type:'skill',order:index+1,archived:false,name:item.name,icon:item.icon || 'database',logo:item.logo ? await upload(item.logo) : undefined});
}
if (documents.length) {
  let transaction=client.transaction();
  for (const doc of documents) transaction=transaction.createIfNotExists(doc as {_id:string;_type:string});
  await transaction.commit();
}
// Older versions of the seed represented an optional empty contribution as a
// localized object. Remove that empty value only, preserving any owner edits.
const churn = await client.getDocument('project-customer-churn');
if (churn?.contribution && !churn.contribution.en?.trim()) await client.patch(churn._id).ifRevisionId(churn._rev).unset(['contribution']).commit();
console.log(`Seed complete: ${documents.length} new documents; existing content was preserved.`);
