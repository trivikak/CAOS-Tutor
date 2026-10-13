import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Home from './Home';
import { lessons, projects, type Lesson } from './course';
import { readProgress, storageKey, type Progress } from './storage';

function download(name: string, text: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
type Shared = { progress: Progress; update: (fn: (p: Progress) => Progress) => void };
function Practice({ lesson, progress, update }: Shared & { lesson: Lesson }) {
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  function check() {
    setChecked(true);
    if (choice === lesson.correct) update(p => ({ ...p, solved: [...new Set([...p.solved, lesson.id])] }));
  }
  return <section className="practice-box"><div className="section-head"><span className="eyebrow">KNOWLEDGE CHECK</span>{progress.solved.includes(lesson.id) && <span className="status">✓ Solved</span>}</div><h2>{lesson.question}</h2><fieldset disabled={checked}><legend className="sr-only">Choose an answer</legend>{lesson.options.map((o,i)=><label className={'answer ' + (choice === i ? 'selected' : '')} key={o}><input type="radio" name={lesson.id} value={i} checked={choice === i} onChange={()=>setChoice(i)}/><span>{o}</span></label>)}</fieldset><div className="actions"><button className="primary" disabled={choice === null || checked} onClick={check}>Check answer →</button><button onClick={()=>setHint(!hint)}>{hint ? 'Hide hint' : 'Give me a hint'}</button>{checked && <button onClick={()=>{setChecked(false);setChoice(null)}}>Try again</button>}</div>{hint && <p className="hint">↳ {lesson.hint}</p>}{checked && <div className={'feedback ' + (choice === lesson.correct ? 'correct' : '')} role="status"><strong>{choice === lesson.correct ? 'That’s right.' : 'Not quite — let’s work through it.'}</strong><p>{lesson.explanation}</p></div>}</section>;
}
function TopicHelp({ lesson }: { lesson: Lesson }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ q: string; a: string }[]>([]);
  const end = useRef<HTMLDivElement>(null);
  function ask(q: string) {
    if (!q.trim()) return;
    const lower = q.toLowerCase();
    const response = /example|walk|trace/.test(lower) ? `Work through this ${lesson.title.toLowerCase()} example:\n\n${lesson.example}\n\nExplain each step in your own words, then try the practice question.` : /quiz|test|practice/.test(lower) ? `${lesson.question}\n\nStart with this hint: ${lesson.hint}\n\nUse the Practice tab to submit your answer and get feedback.` : /hint/.test(lower) ? lesson.hint : `Here is a topic guide for ${lesson.title.toLowerCase()}:\n\n${lesson.notes}\n\nCheck your understanding: ${lesson.question}`;
    setMessages(m=>[...m,{q:q.trim(),a:response}]);setQuestion('');
    setTimeout(()=>end.current?.scrollIntoView({block:'nearest',behavior:'smooth'}),0);
  }
  return <section className="help-panel"><span className="eyebrow">STUDY COMPANION</span><h3>Reason it out.</h3><p className="muted">Offline topic guide: prepared explanations and hints for the selected lesson. Not a live AI chat.</p><div className="suggestions">{['Explain this topic','Walk through an example','Give me a hint'].map(q=><button key={q} onClick={()=>ask(q)}>{q} ↗</button>)}</div><div className="conversation" aria-live="polite">{messages.map((m,i)=><div key={i}><p className="user-message">{m.q}</p><p className="guide-message">{m.a}</p></div>)}<div ref={end}/></div><form onSubmit={e=>{e.preventDefault();ask(question)}}><label htmlFor="question">Ask for an explanation, example, or hint</label><div className="input-row"><input id="question" value={question} maxLength={500} onChange={e=>setQuestion(e.target.value)} placeholder="Help me understand this topic…"/><button className="primary" disabled={!question.trim()}>Send ↑</button></div></form></section>;
}
function Learning({ progress, update, practice = false }: Shared & { practice?: boolean }) {
  const [params, setParams] = useSearchParams();
  const lesson = lessons.find(l=>l.id === params.get('topic')) || lessons[0];
  const [search, setSearch] = useState('');
  const tab = practice ? 'practice' : params.get('tab') || 'notes';
  const filtered = lessons.filter(l=>(l.title+' '+l.summary+' '+l.group).toLowerCase().includes(search.toLowerCase()));
  const index = lessons.indexOf(lesson);
  return <div className="workspace"><aside className="outline"><span className="eyebrow">THE COURSE NOTEBOOK</span><h2>Explore CAOS</h2><label className="sr-only" htmlFor="search">Search topics</label><input id="search" placeholder="Search topics…" value={search} onChange={e=>setSearch(e.target.value)}/>{['Architecture','Programming','Operating systems'].map(group=><div key={group}><h3>{group}</h3>{filtered.filter(l=>l.group===group).map(l=><button className={'topic '+(l.id===lesson.id?'active':'')} key={l.id} onClick={()=>setParams({topic:l.id, ...(practice ? {} : {tab})})}><span>{String(lessons.indexOf(l)+1).padStart(2,'0')}</span>{l.title}<span className="topic-check">{progress.solved.includes(l.id)?'✓':progress.read.includes(l.id)?'◐':''}</span></button>)}</div>)}{!filtered.length&&<p>No topics match. Try “memory” or “C”.</p>}</aside><div className="lesson-area"><div className="lesson-heading"><span className="eyebrow">{lesson.group} / TOPIC {String(index+1).padStart(2,'0')}</span><h1>{lesson.title}</h1><p>{lesson.summary}</p></div>{!practice&&<div className="tabs" role="tablist" aria-label="Lesson view">{['notes','practice','my notes'].map(t=><button key={t} role="tab" aria-selected={tab===t} onClick={()=>setParams({topic:lesson.id,tab:t})}>{t==='notes'?'Learn':t==='practice'?'Practice':'My notes'}</button>)}</div>}<div className="lesson-columns"><div>{tab==='practice'?<Practice key={lesson.id} lesson={lesson} progress={progress} update={update}/>:tab==='my notes'?<section className="paper"><span className="eyebrow">MAKE IT YOURS</span><h2>Your scratchpad</h2><label htmlFor="notes">Notes for {lesson.title}</label><textarea id="notes" rows={14} value={progress.notes[lesson.id]||''} onChange={e=>{const value=e.target.value;update(p=>({...p,notes:{...p.notes,[lesson.id]:value}}))}} placeholder="Write a summary, trace an example, or keep a question for office hours…"/><p className="muted">Saved automatically on this device.</p></section>:<section className="paper"><span className="eyebrow">THE BIG IDEA</span><h2>Connect the concepts.</h2><p className="lesson-text">{lesson.notes}</p><h3>A worked example</h3><pre>{lesson.example}</pre><button className={progress.read.includes(lesson.id)?'completed':'primary'} onClick={()=>update(p=>({...p,read:p.read.includes(lesson.id)?p.read.filter(id=>id!==lesson.id):[...p.read,lesson.id]}))}>{progress.read.includes(lesson.id)?'✓ Read — click to undo':'Mark as read ✓'}</button><button className="text-button" onClick={()=>setParams({topic:lesson.id,tab:'practice'})}>Test your understanding →</button></section>}<div className="lesson-pager"><button disabled={index===0} onClick={()=>setParams({topic:lessons[index-1].id})}>← Previous topic</button><button disabled={index===lessons.length-1} onClick={()=>setParams({topic:lessons[index+1].id})}>Next topic →</button></div></div><TopicHelp key={lesson.id} lesson={lesson}/></div></div></div>;
}
function Projects({progress, update}:Shared) {
  return <div className="page"><span className="eyebrow">FROM CONCEPT TO CODE</span><h1>Build something that works.</h1><p className="lede">Four practice projects for your systems toolkit. These are study exercises, not official course assignments.</p><p className="notice">Download a starter and run it in your own compiler. POSIX projects need Linux, macOS, or WSL. Checklists are self-assessments; this site does not execute or grade C code.</p><div className="project-grid">{projects.map(project=><article className="paper" key={project.id}><span className="eyebrow">{project.topic}</span><h2>{project.title}</h2><p>{project.description}</p><div className="checklist">{project.steps.map((s,i)=>{const id=project.id+'-'+i;return <label key={id}><input type="checkbox" checked={progress.tasks.includes(id)} onChange={()=>update(p=>({...p,tasks:p.tasks.includes(id)?p.tasks.filter(t=>t!==id):[...p.tasks,id]}))}/>{s}</label>})}</div><button onClick={()=>download(project.id+'.c',project.starter)}>Download C starter ↓</button><span className="task-count">{project.steps.filter((_,i)=>progress.tasks.includes(project.id+'-'+i)).length}/4 checked</span></article>)}</div></div>;
}
function Dashboard({progress}:Shared) {
  return <div className="page"><span className="eyebrow">ONE STEP AT A TIME</span><h1>Your learning, in focus.</h1><p className="lede">Progress lives in this browser on this device. Export a copy of your notes and progress anytime.</p><div className="stats">{[[progress.read.length,'of 12 topics read'],[progress.solved.length,'of 12 checks solved'],[progress.tasks.length,'of 16 project steps']].map(([n,l])=><div className="paper" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div><div className="section-head"><h2>Course progress</h2><button onClick={()=>download('caos-progress.json',JSON.stringify(progress,null,2),'application/json')}>Export notes & progress ↓</button></div><div className="progress-list">{lessons.map((l,i)=><Link to={'/learning?topic='+l.id} key={l.id}><span className="number">{String(i+1).padStart(2,'0')}</span><div><strong>{l.title}</strong><small>{l.group}</small></div><span>{progress.read.includes(l.id)?'Read ✓':'Not read'}</span><span className={progress.solved.includes(l.id)?'status':''}>{progress.solved.includes(l.id)?'Solved ✓':'Practice →'}</span></Link>)}</div></div>;
}
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  const [progress,setProgress]=useState(readProgress);
  const [saveError,setSaveError]=useState(false);
  useEffect(()=>{try{localStorage.setItem(storageKey,JSON.stringify(progress));setSaveError(false)}catch{setSaveError(true)}},[progress]);
  const shared={progress,update:setProgress};
  return <><header className="site-header"><Link to="/" className="brand"><span className="brand-icon">C/</span><span>CAOS<span className="brand-light"> tutor</span><small>RENSSELAER POLYTECHNIC INSTITUTE</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/learning">Learning mode</NavLink><NavLink to="/practice">Practice</NavLink><NavLink to="/projects">Projects</NavLink><NavLink to="/progress">My progress</NavLink></nav><span className="local-badge"><i/> Local workspace</span></header>{saveError&&<div role="alert" className="notice">Browser storage is unavailable. Your current progress will be lost on reload; export it from My progress.</div>}<main><Routes><Route path="/" element={<Home/>}/><Route path="/learning" element={<Learning {...shared}/>}/><Route path="/practice" element={<Learning {...shared} practice/>}/><Route path="/projects" element={<Projects {...shared}/>}/><Route path="/progress" element={<Dashboard {...shared}/>}/><Route path="*" element={<div className="page"><h1>Page not found</h1><Link to="/">Return home →</Link></div>}/></Routes></main></>;
}
