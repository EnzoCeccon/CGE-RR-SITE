import { Navigate, useParams } from 'react-router-dom'

const departmentContent = {
  'transparencia-e-controle-social': {
    title: 'Transparência e Controle Social',
    description:
      'Responsável por garantir o amplo acesso às informações públicas, promovendo a transparência ativa e passiva da administração. Atua na gestão e atualização dos portais de transparência, atendimento às demandas da Lei de Acesso à Informação e no incentivo à participação cidadã no acompanhamento e fiscalização dos recursos públicos.',
  },
  'convenios-e-repasse-de-recursos': {
    title: 'Convênios e Repasse de Recursos',
    description:
      'Realiza o acompanhamento, análise e controle dos convênios firmados e das transferências voluntárias de recursos públicos. Atua na verificação da regularidade dos processos, na correta aplicação dos recursos e no cumprimento das obrigações pactuadas entre os entes envolvidos.',
  },
  'integridade-e-governanca': {
    title: 'Integridade e Governança',
    description:
      'Atua na implementação de políticas e mecanismos de integridade, ética e conformidade no âmbito da administração pública. Desenvolve ações de prevenção à corrupção, fortalecimento dos controles internos e promoção de boas práticas de governança, visando maior eficiência e confiabilidade na gestão pública.',
  },
  'contas-e-programas-de-governo': {
    title: 'Contas e Programas de Governo',
    description:
      'Responsável pela análise da prestação de contas dos gestores e pela avaliação da execução dos programas governamentais. Verifica a conformidade na aplicação dos recursos públicos, o cumprimento das metas estabelecidas e os resultados alcançados pelas políticas públicas.',
  },
  'analise-previa-e-gestao-de-riscos': {
    title: 'Análise Prévia e Gestão de Riscos',
    description:
      'Executa análises preventivas em processos, projetos e contratações, identificando riscos potenciais e propondo medidas de mitigação. Atua de forma estratégica para evitar irregularidades, aumentar a eficiência e fortalecer a tomada de decisão na administração pública.',
  },
  'auditorias-programadas': {
    title: 'Auditorias Programadas',
    description:
      'Planeja e realiza auditorias periódicas nos órgãos e entidades públicas, com foco na verificação da legalidade, economicidade, eficiência e transparência dos atos administrativos. Produz relatórios técnicos com recomendações para o aprimoramento da gestão pública.',
  },
} as const

export default function DepartamentoDetalhe() {
  const { slug } = useParams()
  const department = slug ? departmentContent[slug as keyof typeof departmentContent] : null

  if (!department) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container page institutional-page">
      <span className="structure-kicker">Departamentos</span>
      <h1>{department.title}</h1>
      <p>{department.description}</p>
    </div>
  )
}
