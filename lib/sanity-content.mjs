const types = ['portfolioSettings', 'project', 'experience', 'volunteer', 'certification', 'skill'];
const assetProjection = '{...,asset->{url,metadata{dimensions}}}';
export const portfolioQuery = `*[_type in ${JSON.stringify(types)} && !(_id in path("drafts.**"))]{...,photo${assetProjection},cv{...,asset->{url}},universityLogo${assetProjection},image${assetProjection},original${assetProjection},certificate${assetProjection},logo${assetProjection},additionalImages[]{...,image${assetProjection}},gallery[]{...,image${assetProjection}}}`;

export function queryUrl(config) {
  if (!/^[a-z0-9]+$/.test(config.projectId) || !/^[a-z0-9][a-z0-9_-]*$/.test(config.dataset)) throw new Error('Invalid Sanity configuration');
  const url = new URL(`https://${config.projectId}.apicdn.sanity.io/v${config.apiVersion}/data/query/${config.dataset}`);
  url.searchParams.set('query', portfolioQuery);
  url.searchParams.set('perspective', 'published');
  return url.toString();
}
export function safeAsset(value, config) {
  if (typeof value !== 'string') return '';
  if (/^\/(?:images|documents)\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes('..')) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && url.hostname === 'cdn.sanity.io' && !url.username && !url.password && ['/images/', '/files/'].some(prefix => url.pathname.startsWith(`${prefix}${config.projectId}/${config.dataset}/`)) ? url.href : ''; } catch {return '';}
}
export function safeLink(value) {
  try {const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';} catch {return '';}
}
const plain = value => typeof value === 'string' ? value.trim() : '';
const image = (value, config) => ({
  url: safeAsset(value?.asset?.url || value?.localUrl, config),
  width: Math.max(1, Math.min(20000, Number(value?.asset?.metadata?.dimensions?.width || value?.width) || 1200)),
  height: Math.max(1, Math.min(20000, Number(value?.asset?.metadata?.dimensions?.height || value?.height) || 800)),
});

// An initialized singleton distinguishes a deliberately empty portfolio from an unseeded dataset.
// Invalid responses never replace the last complete local snapshot.
export function normalizeDocuments(documents, fallback, config) {
  if (!Array.isArray(documents)) throw new Error('Invalid CMS response');
  const settings = documents.find(doc => doc?._type === 'portfolioSettings' && doc._id === 'portfolio-settings' && doc.initialized === true);
  if (!settings) return null;
  const translations = {};
  const localized = (value, key, defaultText = '') => {
    if (typeof value === 'string') return value;
    if (!plain(value?.en)) return defaultText;
    const token = `cms:${key}`;
    translations[token] = {en: plain(value.en), id: plain(value.id) || plain(value.en)};
    return token;
  };
  const collection = (type, mapper) => documents.filter(doc => doc?._type === type && !doc._id.startsWith('drafts.') && doc.archived !== true)
    .sort((a,b) => (Number(a.order) || 0) - (Number(b.order) || 0) || a._id.localeCompare(b._id)).map(mapper);
  const texts = (doc, names) => Object.fromEntries(names.map(name => [name, localized(doc[name], `${doc._id}:${name}`)]));
  const list = (doc, name) => (Array.isArray(doc[name]) ? doc[name] : []).map((value,index) => localized(value, `${doc._id}:${name}:${index}`)).filter(Boolean);
  const required = doc => {if (!plain(doc.title?.en || doc.title) || !plain(doc._id)) throw new Error('Incomplete published document');};
  const gallery = doc => (Array.isArray(doc.gallery) ? doc.gallery : []).slice(0,20).map((figure,index) => { const asset=image(figure.image,config); return {src:asset.url,width:asset.width,height:asset.height,alt:localized(figure.alt,`${doc._id}:gallery:${index}:alt`),caption:localized(figure.caption,`${doc._id}:gallery:${index}:caption`)}; }).filter(figure => figure.src);
  const base = doc => ({id: `cms-${doc._id}`});
  const profile = {...fallback.profile, ...texts(settings, ['greeting', 'headline', 'intro', 'opportunity', 'aboutTitle', 'aboutIntro', 'aboutBody', 'degree', 'semester', 'contactIntro'])};
  for (const key of ['name', 'linkedinLabel', 'githubLabel', 'university', 'gpa']) profile[key] = plain(settings[key]) || fallback.profile[key];
  profile.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(plain(settings.email)) ? plain(settings.email) : fallback.profile.email;
  profile.linkedin = safeLink(settings.linkedin); profile.github = safeLink(settings.github);
  profile.analyticsId = /^G-[A-Z0-9]{4,20}$/.test(plain(settings.analyticsId)) ? plain(settings.analyticsId) : '';
  profile.photo = image(settings.photo, config).url;
  profile.cv = safeAsset(settings.cv?.asset?.url || settings.cv?.localUrl, config);
  if (profile.cv.startsWith('https://cdn.sanity.io/files/')) {
    const download = new URL(profile.cv);
    download.searchParams.set('dl', `CV_${profile.name.replace(/[^a-zA-Z0-9]+/g, '_')}.pdf`);
    profile.cv = download.href;
  }
  profile.universityLogo = image(settings.universityLogo, config).url;
  // Missing optional copy uses the previous wording, but removing a photo/CV/link is respected.
  for (const key of ['greeting', 'headline', 'intro', 'opportunity', 'aboutTitle', 'aboutIntro', 'aboutBody', 'degree', 'semester', 'contactIntro']) profile[key] ||= fallback.profile[key];
  const projects = collection('project', (doc,index) => {
    required(doc); const main = image(doc.image, config); if (!main.url) throw new Error('Project image missing');
    return {...base(doc), ...texts(doc, ['title', 'category', 'description', 'contribution', 'imageAlt', 'objective', 'source', 'output', 'insight', 'limitation', 'metricLabel', 'figureLabel']), number: String(index+1).padStart(2,'0'), github: safeLink(doc.github), demo: safeLink(doc.demo), tools: [...new Set((doc.tools || []).map(plain).filter(Boolean))], image: main.url, width: main.width, height: main.height, metric: plain(doc.metric), process: list(doc, 'process'), additionalImages: (doc.additionalImages || []).map((figure,index) => {const asset=image(figure.image,config); return {src:asset.url,width:asset.width,height:asset.height,alt:localized(figure.alt,`${doc._id}:figure:${index}:alt`),caption:localized(figure.caption,`${doc._id}:figure:${index}:caption`)};}).filter(figure=>figure.src)};
  });
  const experiences = collection('experience', doc => {
    required(doc); if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(doc.start)) throw new Error('Experience start date missing');
    return {...base(doc), ...texts(doc, ['title','role','typeLabel','logoAlt','startLabel','endLabel','description','note']), logo:image(doc.logo,config).url,start:doc.start,end:plain(doc.end),workflow:list(doc,'workflow')};
  });
  const volunteering = collection('volunteer', doc => {
    required(doc); const asset=image(doc.image,config); if (!asset.url || !/^\d{4}-(0[1-9]|1[0-2])$/.test(doc.date)) throw new Error('Volunteer image/date missing');
    return {...base(doc), ...texts(doc,['title','organization','role','context','dateLabel','description','imageAlt']),date:doc.date,image:asset.url,width:asset.width,height:asset.height,original:image(doc.original,config).url || asset.url,gallery:gallery(doc)};
  });
  const certifications = collection('certification', doc => {
    required(doc); const asset=image(doc.image,config); if (!asset.url || !/^\d{4}-\d{2}-\d{2}$/.test(doc.date)) throw new Error('Certificate image/date missing');
    return {...base(doc), ...texts(doc,['title','issuer','program','type','dateLabel','dateType','description','imageAlt']),date:doc.date,image:asset.url,width:asset.width,height:asset.height,certificate:image(doc.certificate,config).url || asset.url,gallery:gallery(doc)};
  });
  const skills = collection('skill', doc => {if (!plain(doc.name)) throw new Error('Skill name missing'); return {name:plain(doc.name),logo:image(doc.logo,config).url,icon:doc.icon === 'bot' ? 'bot' : 'database'};});
  if (new Set(skills.map(skill=>skill.name)).size !== skills.length) throw new Error('Duplicate skills');
  return {data: {profile,projects,experiences,volunteering,certifications,skills},translations};
}
