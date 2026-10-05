import { useMemo, useState } from 'react'
import { BookOpen, Brain, CheckCircle2, ChevronDown, FileUp, Gauge, LayoutDashboard, Search, Target, Trophy } from 'lucide-react'

const syllabus = [
  { name: 'Direito Tributário', topics: ['Sistema Tributário Nacional', 'Limitações ao poder de tributar', 'Obrigação tributária', 'Crédito tributário', 'Administração tributária'] },
  { name: 'Legislação Tributária do Tocantins', topics: ['ICMS — fundamentos', 'Fato gerador e incidência', 'Contribuintes e responsáveis', 'Créditos do ICMS', 'Substituição tributária'] },
  { name: 'Contabilidade Geral e Avançada', topics: ['Patrimônio e variações', 'Demonstrações contábeis', 'Ativos e passivos', 'Receitas e despesas', 'Análise das demonstrações'] },
  { name: 'Contabilidade de Custos', topics: ['Terminologia de custos', 'Custeio por absorção', 'Custeio variável', 'Margem de contribuição'] },
  { name: 'Auditoria', topics: ['Normas de auditoria', 'Planejamento', 'Riscos', 'Evidências e procedimentos'] },
  { name: 'Direito Constitucional', topics: ['Princípios fundamentais', 'Direitos e garantias', 'Administração Pública', 'Controle de constitucionalidade'] },
  { name: 'Direito Administrativo', topics: ['Atos administrativos', 'Poderes administrativos', 'Licitações e contratos', 'Responsabilidade do Estado'] },
  { name: 'Tecnologia da Informação', topics: ['Banco de dados', 'Segurança da informação', 'Redes', 'Análise de dados'] },
]

const actions = [
  { title: 'Continuar estudo', description: 'Retome exatamente do ponto em que parou.', icon: BookOpen, target: 'edital' },
  { title: 'Treinar questões', description: 'Resolva questões por disciplina, assunto e dificuldade.', icon: Brain, target: 'questoes' },
  { title: 'Gerar questões de PDF', description: 'Envie seu material e crie questões no estilo FGV.', icon: FileUp, target: 'materiais' },
  { title: 'Simulado inteligente', description: 'Treine com foco nas matérias com maior impacto na sua nota.', icon: Target, target: 'simulados' },
]

function App() {
  const [page, setPage] = useState('painel')
  const [progress, setProgress] = useState({})
  const [query, setQuery] = useState('')
  const [openSubject, setOpenSubject] = useState(0)

  const allTopics = syllabus.flatMap(s => s.topics.map(topic => ({ subject: s.name, topic })))
  const completed = Object.values(progress).filter(Boolean).length
  const mastery = allTopics.length ? Math.round((completed / allTopics.length) * 100) : 0
  const filtered = useMemo(() => syllabus.map(subject => ({
    ...subject,
    topics: subject.topics.filter(topic => (subject.name + topic).toLowerCase().includes(query.toLowerCase()))
  })).filter(subject => subject.topics.length), [query])

  const navigate = target => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    ['painel', 'Meu Painel', LayoutDashboard],
    ['edital', 'Edital verticalizado', BookOpen],
    ['questoes', 'Questões', Brain],
    ['simulados', 'Simulados', Target],
    ['erros', 'Caderno de erros', CheckCircle2],
    ['materiais', 'Materiais / PDF', FileUp],
  ]

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">ST</div><div><strong>SEFAZ-TO</strong><span>Central de Aprovação</span></div></div>
        <nav>
          {navItems.map(([id, label, Icon]) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}><Icon size={17}/>{label}</button>
          ))}
        </nav>
        <div className="sidebar-foot"><span>Progresso do edital</span><strong>{mastery}%</strong><div className="progress"><i style={{width: mastery + '%'}}/></div></div>
      </aside>

      <section className="content">
        {page === 'painel' && <Dashboard mastery={mastery} completed={completed} navigate={navigate} />}
        {page === 'edital' && (
          <>
            <PageHeader eyebrow="PLANO DE ESTUDOS" title="Edital verticalizado" text="Transforme o conteúdo programático em tarefas mensuráveis e acompanhe seu domínio tópico a tópico." />
            <div className="toolbar"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar disciplina ou assunto..." /></div>
            <div className="syllabus">
              {filtered.map((subject, index) => {
                const realIndex = syllabus.findIndex(s => s.name === subject.name)
                const done = subject.topics.filter(t => progress[subject.name + t]).length
                return <article className="subject-card" key={subject.name}>
                  <button className="subject-head" onClick={() => setOpenSubject(openSubject === realIndex ? -1 : realIndex)}>
                    <div><span>{done}/{subject.topics.length} tópicos</span><h3>{subject.name}</h3></div><ChevronDown className={openSubject === realIndex ? 'rotate' : ''}/>
                  </button>
                  {openSubject === realIndex && <div className="topics">
                    {subject.topics.map(topic => {
                      const key = subject.name + topic
                      return <label className={progress[key] ? 'topic done' : 'topic'} key={topic}>
                        <input type="checkbox" checked={!!progress[key]} onChange={() => setProgress(p => ({...p, [key]: !p[key]}))}/>
                        <span>{topic}</span><small>{progress[key] ? 'Estudado' : 'Não estudado'}</small>
                      </label>
                    })}
                  </div>}
                </article>
              })}
            </div>
          </>
        )}
        {['questoes','simulados','erros','materiais'].includes(page) && <ComingSoon page={page} navigate={navigate}/>}
      </section>
    </main>
  )
}

function Dashboard({ mastery, completed, navigate }) {
  const stats = [['Domínio do edital', mastery + '%', Gauge], ['Tópicos concluídos', completed, CheckCircle2], ['Taxa de acerto', '—', Target], ['Questões resolvidas', '0', Trophy]]
  return <>
    <header className="hero"><div><span className="eyebrow">PREPARAÇÃO PARA AUDITOR FISCAL</span><h1>Sua rota para aprovação na SEFAZ-TO</h1><p>Conteúdo, questões, revisão e análise de desempenho em um único lugar.</p></div><button onClick={() => navigate('edital')}>Começar agora</button></header>
    <section className="stats-grid">{stats.map(([label,value,Icon]) => <article className="stat-card" key={label}><Icon size={22}/><span>{label}</span><strong>{value}</strong></article>)}</section>
    <section className="priority-card"><div><span className="eyebrow">PRIMEIRO PASSO</span><h2>Mapeie o que você já estudou</h2><p>Marque os tópicos concluídos no edital verticalizado. Esse diagnóstico será usado para definir revisões e treinos.</p></div><button className="secondary" onClick={() => navigate('edital')}>Abrir edital</button></section>
    <section><div className="section-title"><div><span className="eyebrow">CENTRAL DE TREINO</span><h2>Escolha como estudar</h2></div></div><div className="actions-grid">{actions.map(({title,description,icon:Icon,target}) => <article className="action-card" key={title}><div className="icon-box"><Icon size={24}/></div><h3>{title}</h3><p>{description}</p><button onClick={() => navigate(target)}>Abrir módulo</button></article>)}</div></section>
  </>
}

function PageHeader({eyebrow,title,text}) { return <header className="page-header"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header> }

function ComingSoon({page,navigate}) {
  const labels={questoes:'Banco de questões',simulados:'Simulados inteligentes',erros:'Caderno de erros',materiais:'Materiais e geração por PDF'}
  return <div className="empty-state"><Brain size={42}/><span className="eyebrow">PRÓXIMO MÓDULO</span><h1>{labels[page]}</h1><p>A estrutura já está conectada à navegação. Este módulo será ativado na próxima etapa com persistência no banco e inteligência adaptativa.</p><button onClick={() => navigate('edital')}>Ir para o edital</button></div>
}

export default App
