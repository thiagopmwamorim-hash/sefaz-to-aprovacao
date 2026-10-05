import { BookOpen, Brain, FileUp, Gauge, Target, Trophy } from 'lucide-react'

const stats = [
  ['Domínio do edital', '0%', Gauge],
  ['Questões resolvidas', '0', Brain],
  ['Taxa de acerto', '0%', Target],
  ['Horas estudadas', '0h', Trophy],
]

const actions = [
  { title: 'Continuar estudo', description: 'Retome exatamente do ponto em que parou.', icon: BookOpen },
  { title: 'Treinar questões', description: 'Resolva questões por disciplina, assunto e dificuldade.', icon: Brain },
  { title: 'Gerar questões de PDF', description: 'Envie seu material e crie questões no estilo FGV.', icon: FileUp },
  { title: 'Simulado inteligente', description: 'Treine com foco nas matérias com maior impacto na sua nota.', icon: Target },
]

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">ST</div>
          <div>
            <strong>SEFAZ-TO</strong>
            <span>Central de Aprovação</span>
          </div>
        </div>

        <nav>
          <a className="active" href="#painel">Meu Painel</a>
          <a href="#edital">Edital verticalizado</a>
          <a href="#questoes">Questões</a>
          <a href="#simulados">Simulados</a>
          <a href="#erros">Caderno de erros</a>
          <a href="#materiais">Materiais</a>
          <a href="#revisoes">Revisões</a>
          <a href="#desempenho">Desempenho</a>
        </nav>
      </aside>

      <section className="content">
        <header className="hero" id="painel">
          <div>
            <span className="eyebrow">PREPARAÇÃO PARA AUDITOR FISCAL</span>
            <h1>Sua rota para aprovação na SEFAZ-TO</h1>
            <p>Estude, pratique e revise com um plano que se adapta ao seu desempenho.</p>
          </div>
          <button>Iniciar sessão de hoje</button>
        </header>

        <section className="stats-grid">
          {stats.map(([label, value, Icon]) => (
            <article className="stat-card" key={label}>
              <Icon size={22} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <section className="priority-card">
          <div>
            <span className="eyebrow">PRIORIDADE DE HOJE</span>
            <h2>Vamos construir seu diagnóstico inicial</h2>
            <p>Assim que você começar a responder questões, o sistema vai identificar seus pontos fracos e montar a rotina diária.</p>
          </div>
          <div className="priority-meta">
            <strong>Meta inicial</strong>
            <span>30 questões diagnósticas</span>
          </div>
        </section>

        <section>
          <div className="section-title">
            <div>
              <span className="eyebrow">ATALHOS</span>
              <h2>O que você quer fazer agora?</h2>
            </div>
          </div>

          <div className="actions-grid">
            {actions.map(({ title, description, icon: Icon }) => (
              <article className="action-card" key={title}>
                <div className="icon-box"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <button>Em breve</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
