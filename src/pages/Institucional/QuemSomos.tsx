const competencias = [
  'exercer o controle interno, em todos os n\u00EDveis, com a colabora\u00E7\u00E3o da Secretaria de Estado do Planejamento e Desenvolvimento, da Secretaria de Estado da Gest\u00E3o Estrat\u00E9gica e Administra\u00E7\u00E3o, da Secretaria de Estado da Fazenda, da Procuradoria-Geral do Estado e da Casa Civil;',
  'orientar, coordenar e articular as atividades de controle interno nos \u00D3rg\u00E3os e Entidades da Administra\u00E7\u00E3o Direta que comp\u00F5em o Sistema de Controle Interno;',
  'verificar a legalidade, efici\u00EAncia, efic\u00E1cia e efetividade dos atos da gest\u00E3o cont\u00E1bil, or\u00E7ament\u00E1ria, patrimonial, administrativa e financeira, avaliando controles, registros, demonstra\u00E7\u00F5es, apura\u00E7\u00F5es e relat\u00F3rios, al\u00E9m de outras atividades de controle interno, em todos os n\u00EDveis dos \u00D3rg\u00E3os do Poder Executivo;',
  'realizar inspe\u00E7\u00F5es junto aos \u00D3rg\u00E3os, visando \u00E0 salvaguarda dos bens, a execu\u00E7\u00E3o do or\u00E7amento, a verifica\u00E7\u00E3o, exatid\u00E3o e regularidade das contas;',
  'averiguar a regularidade da receita e despesa;',
  'avaliar os resultados alcan\u00E7ados pelos administradores e verificar a execu\u00E7\u00E3o dos contratos;',
  'examinar a regularidade dos atos que resultem em cria\u00E7\u00E3o ou extin\u00E7\u00E3o de direitos e obriga\u00E7\u00F5es, na esfera do Poder Executivo do Estado;',
  'criar condi\u00E7\u00F5es prop\u00EDcias ao desenvolvimento das atividades de auditagens e inspe\u00E7\u00F5es;',
  'baixar normas internas sobre a execu\u00E7\u00E3o das atividades de auditagem e inspe\u00E7\u00F5es;',
  'impugnar despesas e determinar a inscri\u00E7\u00E3o de responsabilidade;',
  'representar a autoridade administrativa, para aplica\u00E7\u00E3o das medidas cab\u00EDveis sobre irregularidades que verificar, no exerc\u00EDcio da fiscaliza\u00E7\u00E3o das atividades de administra\u00E7\u00E3o financeira, patrimonial, execu\u00E7\u00E3o or\u00E7ament\u00E1ria e contabilidade;',
  'prestar assessoramento, quando necess\u00E1rio, aos \u00D3rg\u00E3os auditados, visando \u00E0 efici\u00EAncia dos sistemas de controle interno, de modo a assegurar progressiva racionaliza\u00E7\u00E3o de seus programas, projetos e atividades;',
]

const atividadesAuditoria = [
  'a exatid\u00E3o dos balan\u00E7os, balancetes e outras demonstra\u00E7\u00F5es cont\u00E1beis, em face dos documentos que lhes derem origem;',
  'o exame das presta\u00E7\u00F5es e das tomadas de contas dos agentes, exatores, ordenadores de despesas, administradores e respons\u00E1veis, de direito e de fato, por bens, numer\u00E1rios e valores do Estado ou a este confiados;',
  'a exatid\u00E3o dos controles financeiros, patrimoniais, or\u00E7ament\u00E1rios e cont\u00E1beis, examinando se o registro da execu\u00E7\u00E3o dos programas obedece \u00E0s disposi\u00E7\u00F5es legais e \u00E0s normas de contabilidade estabelecidas para o Servi\u00E7o P\u00FAblico Estadual;',
]

export default function QuemSomos() {
  return (
    <div className="container page institutional-page">
      <h1>Sobre a Controladoria</h1>

      <p>
        {'\u00D3rg\u00E3o inicialmente denominado Auditoria-Geral do Estado, era subordinado diretamente \u00E0 Secretaria de Estado da Fazenda e possu\u00EDa como finalidade a realiza\u00E7\u00E3o de auditagens peri\u00F3dicas no \u00E2mbito da Administra\u00E7\u00E3o Direta e Indireta, com vistas \u00E0 supervis\u00E3o, inspe\u00E7\u00E3o, orienta\u00E7\u00E3o e controle da aplica\u00E7\u00E3o das normas administrativas, financeiras e cont\u00E1beis, conforme Decreto n\u00BA 158 de 1\u00BA de novembro de 1991.'}
      </p>

      <p>
        {'No dia 10 abril de 2001, atrav\u00E9s da Lei n\u00BA 284, a Auditoria foi institu\u00EDda como \u00D3rg\u00E3o Central do Sistema de Controle Interno do Poder Executivo Estadual, deixando de ser unidade administrativa da estrutura organizacional da Secretaria de Estado da Fazenda para fazer parte da estrutura da Governadoria, Lei n\u00BA 285 de 11 abril de 2001.'}
      </p>

      <p>
        {'Por fim, com a Lei n\u00BA 499 de 19 de julho de 2005, art. 60, a denomina\u00E7\u00E3o de Auditoria-Geral do Estado foi transformada para Controladoria-Geral do Estado, que passou a ter as seguintes compet\u00EAncias, conforme art. 24 da referida Lei:'}
      </p>

      <ol className="institutional-list">
        {competencias.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        <li>
          {'verificar, na execu\u00E7\u00E3o direta das atividades de auditoria:'}
          <ol className="institutional-sublist" type="a">
            {atividadesAuditoria.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </li>
        <li>{'exercer outras atividades correlatas.'}</li>
      </ol>
    </div>
  )
}
