import {useMemo,useState} from 'react';
import {BookOpen,Brain,CheckCircle2,ClipboardCheck,LayoutDashboard,Target,Trophy,Users} from 'lucide-react';

const modules=[
 {name:'Legislação e normas HU Brasil',topics:['Norma SEI nº 2/2022/DGP-EBSERH','Norma SEI nº 5/2025/DGP-EBSERH','POP.DGP.084 — seleção e nomeação de chefias','Administração Pública aplicada à HU Brasil']},
 {name:'Orçamento e Finanças Públicas',topics:['PPA, LDO e LOA','Créditos orçamentários','Empenho, liquidação e pagamento','Restos a Pagar','Execução orçamentária e financeira','Conformidade e controles']},
 {name:'Rotina técnica do SGOF',topics:['SIAFI e Tesouro Gerencial','Disponibilidade orçamentária','Nota de Empenho','Liquidação e pagamento','Retenções tributárias','Suprimento, GRU e regularidade fiscal']},
 {name:'Gestão e Liderança',topics:['Gestão de pessoas','Negociação e conflitos','Tomada de decisão','Resiliência e flexibilidade','Articulação entre áreas','Comunicação e síntese']},
 {name:'HU Brasil — Estratégia',topics:['Propósito e visão','Valores','Direcionadores','Objetivos estratégicos','Governança e visão sistêmica']}
];
const questions=[
 ['Qual é a pontuação máxima da 1ª fase?',['20','22','25','30'],'B','O edital fixa 22 pontos para a análise curricular.'],
 ['Na 3ª fase, qual é o aproveitamento mínimo exigido?',['60%','70%','75%','80%'],'D','A 3ª fase exige no mínimo 80% do total de pontos.'],
 ['Qual critério vale até 40 pontos na 2ª fase?',['Formação acadêmica','Negociação, conflitos, decisão, visão sistêmica e articulação','Tempo de HU-UFCAT','Cursos de liderança'],'B','Esse bloco de competências comportamentais e gerenciais vale até 40 pontos.'],
 ['Quanto vale domínio da legislação/literatura da área na 3ª fase?',['10','20','30','40'],'D','É o item de maior peso da 3ª fase: até 40 pontos.'],
 ['Qual o tempo máximo de resposta por questão na entrevista da 2ª fase?',['2 min','3 min','5 min','10 min'],'C','O edital limita cada resposta a cinco minutos.'],
 ['Para Chefia de Setor, qual alternativa atende um dos critérios adicionais?',['6 meses de experiência','2 anos de experiência correlata','Ensino médio','20h de liderança'],'B','Um dos caminhos é possuir pelo menos dois anos de experiência profissional correlata.'],
 ['Qual carga mínima acumulada de gestão de pessoas/liderança é exigida?',['20h','30h','40h','60h'],'C','São 40 horas acumuladas, comprováveis até o exercício da função se selecionado.'],
 ['Na 3ª fase, Mapa Estratégico vale até quantos pontos?',['10','15','20','30'],'C','Direcionadores, propósito, visão, valores e objetivos estratégicos valem até 20 pontos.']
];
const cases=[
 'Um fornecedor essencial está com pendência de regularidade e a área demandante pressiona pelo pagamento. Como você conduz a situação?',
 'Há conflito entre Contabilidade e SGOF sobre o procedimento correto para liquidação. Como você decide e articula as áreas?',
 'No fechamento do exercício há grande volume de empenhos e risco de perda de prazo. Como você organiza a equipe?',
 'A Diretoria questiona uma execução orçamentária abaixo do planejado. Como você diagnostica e apresenta um plano de ação?',
 'Um membro experiente da equipe resiste a um novo procedimento de controle. Como você gerencia a mudança?'
];
const interview=[
 ['Conte sua trajetória e explique por que está preparado para chefiar o SGOF.','Estruture em: experiência → domínio técnico → liderança → contribuição ao HU-UFCAT.'],
 ['Como você gerencia conflitos entre áreas?','Mostre escuta, fatos/normas, construção de solução, decisão e acompanhamento.'],
 ['Como garantir conformidade sem travar a execução?','Fale em planejamento, checklist, orientação prévia, segregação de funções, controles e gestão de risco.'],
 ['Como você lideraria a equipe do SGOF?','Metas claras, distribuição por competência, comunicação, acompanhamento, desenvolvimento e responsabilização.'],
 ['Qual sua visão sobre o papel do SGOF no hospital?','Conecte orçamento/finanças à continuidade assistencial, legalidade, eficiência e estratégia institucional.']
];

export default function App(){
 const [page,setPage]=useState('painel'),[done,setDone]=useState(()=>JSON.parse(localStorage.getItem('sgofDone')||'{}')),[qi,setQi]=useState(0),[choice,setChoice]=useState(''),[result,setResult]=useState(null),[score,setScore]=useState(()=>+localStorage.getItem('sgofScore')||0),[attempts,setAttempts]=useState(()=>+localStorage.getItem('sgofAttempts')||0),[caseI,setCaseI]=useState(0);
 const total=modules.reduce((n,m)=>n+m.topics.length,0), completed=Object.values(done).filter(Boolean).length, mastery=Math.round(completed/total*100);
 const toggle=t=>{const n={...done,[t]:!done[t]};setDone(n);localStorage.setItem('sgofDone',JSON.stringify(n))};
 const answer=()=>{if(!choice)return;const ok=choice===questions[qi][2];setResult(ok);const a=attempts+1,s=score+(ok?1:0);setAttempts(a);setScore(s);localStorage.setItem('sgofAttempts',a);localStorage.setItem('sgofScore',s)};
 const next=()=>{setQi((qi+1)%questions.length);setChoice('');setResult(null)};
 const pct=attempts?Math.round(score/attempts*100):0;
 const nav=[['painel','Painel',LayoutDashboard],['trilha','Trilha de estudo',BookOpen],['questoes','Questões',Brain],['entrevista','Entrevista',Users],['casos','Casos práticos',ClipboardCheck],['fase3','Rumo aos 80%',Target]];
 return <main className="shell"><aside><div className="brand"><b>SGOF</b><span>Preparação para Chefia</span></div><nav>{nav.map(([id,l,I])=><button className={page===id?'active':''} onClick={()=>setPage(id)}><I size={18}/>{l}</button>)}</nav><div className="progressBox"><small>Trilha concluída</small><strong>{mastery}%</strong><div><i style={{width:mastery+'%'}}/></div></div></aside><section className="content">
 {page==='painel'&&<><Header/><div className="stats"><Card icon={Trophy} label="Meta 3ª fase" value="80%"/><Card icon={CheckCircle2} label="Tópicos estudados" value={completed+'/'+total}/><Card icon={Brain} label="Questões" value={attempts}/><Card icon={Target} label="Aproveitamento" value={pct+'%'}/></div><article className="alert"><b>Prioridade máxima: 3ª fase</b><p>Domínio técnico e normativo, Administração Pública/HU Brasil, Mapa Estratégico e sistemas da rotina. Treine para ultrapassar 80% com margem.</p><button onClick={()=>setPage('fase3')}>Começar preparação prioritária</button></article><h2>Plano de ataque</h2><div className="grid"><Mini title="1ª Fase • Currículo" text="Organize comprovações de experiência, gestão e capacitações. Máximo: 22 pontos."/><Mini title="2ª Fase • Entrevista" text="Treine respostas de até 5 minutos: decisão, conflitos, liderança, articulação e técnica."/><Mini title="3ª Fase • Diretoria" text="Barreira de 80%. Foque legislação, estratégia HU Brasil e sistemas/rotinas do SGOF."/></div></>}
 {page==='trilha'&&<><Title tag="CONTEÚDO DIRECIONADO" title="Trilha de estudo SGOF" text="Marque o que já estudou. O progresso fica salvo neste navegador."/><div className="modules">{modules.map(m=><article><h3>{m.name}</h3>{m.topics.map(t=><label><input type="checkbox" checked={!!done[t]} onChange={()=>toggle(t)}/><span>{t}</span></label>)}</article>)}</div></>}
 {page==='questoes'&&<><Title tag="TREINO OBJETIVO" title="Questões do edital" text="Banco inicial baseado diretamente nos critérios do Edital 02/2026."/><Question q={questions[qi]} qi={qi} choice={choice} setChoice={setChoice} result={result} answer={answer} next={next}/></>}
 {page==='entrevista'&&<><Title tag="2ª FASE" title="Simulador de entrevista" text="Treine em voz alta. Limite sua resposta a 5 minutos e use estrutura Situação → Ação → Resultado → Aprendizado."/><div className="modules">{interview.map((x,i)=><article><small>PERGUNTA {i+1}</small><h3>{x[0]}</h3><p>{x[1]}</p><button onClick={()=>navigator.clipboard?.writeText(x[0])}>Copiar pergunta</button></article>)}</div></>}
 {page==='casos'&&<><Title tag="CHEFIA NA PRÁTICA" title="Casos situacionais" text="Responda como chefe: identifique risco, norma aplicável, decisão, comunicação e controle posterior."/><article className="case"><span>CASO {caseI+1}/{cases.length}</span><h2>{cases[caseI]}</h2><div className="framework"><b>Roteiro da resposta</b><p>1. Diagnóstico objetivo → 2. Base normativa → 3. Alternativas e riscos → 4. Decisão → 5. Comunicação → 6. Monitoramento.</p></div><button onClick={()=>setCaseI((caseI+1)%cases.length)}>Próximo caso</button></article></>}
 {page==='fase3'&&<><Title tag="3ª FASE • ELIMINATÓRIA" title="Rumo aos 80%" text="Sua preparação principal. O objetivo é chegar à entrevista técnica dominando os quatro blocos avaliados."/><div className="weights"><Mini title="40 pontos" text="Legislação e literatura aplicável à área de atuação da função."/><Mini title="30 pontos" text="Administração Pública, especialmente legislação aplicável à HU Brasil."/><Mini title="20 pontos" text="Mapa Estratégico: direcionadores, propósito, visão, valores e objetivos."/><Mini title="10 pontos" text="Habilidade técnica e sistemas relacionados à rotina da HU Brasil."/></div><article className="alert"><b>Meta de segurança: 90%</b><p>O edital elimina abaixo de 80%. Estude para uma margem superior, priorizando os blocos de 40 e 30 pontos.</p><button onClick={()=>setPage('trilha')}>Abrir trilha de estudo</button></article></>}
 </section></main>
}
function Header(){return <header className="hero"><span>EDITAL Nº 02/2026 • HU-UFCAT</span><h1>Chefia do Setor de Gestão Orçamentária e Financeira</h1><p>Treinamento direcionado para vencer as três fases do processo seletivo.</p></header>}
function Title({tag,title,text}){return <header className="hero small"><span>{tag}</span><h1>{title}</h1><p>{text}</p></header>}
function Card({icon:I,label,value}){return <article className="card"><I/><span>{label}</span><strong>{value}</strong></article>}
function Mini({title,text}){return <article className="mini"><h3>{title}</h3><p>{text}</p></article>}
function Question({q,qi,choice,setChoice,result,answer,next}){return <article className="question"><small>QUESTÃO {qi+1}</small><h2>{q[0]}</h2>{q[1].map((o,i)=>{const l=String.fromCharCode(65+i);return <button disabled={result!==null} className={choice===l?'picked':''} onClick={()=>setChoice(l)}><b>{l}</b>{o}</button>})}{result===null?<button className="primary" onClick={answer}>Corrigir</button>:<div className={result?'feedback ok':'feedback no'}><b>{result?'Resposta correta':'Resposta incorreta — gabarito '+q[2]}</b><p>{q[3]}</p><button onClick={next}>Próxima questão</button></div>}</article>}
